// import compression from "compression";
import express from "express";
import fs from "fs/promises";
import { constants } from "fs";
import { generateJson } from "./data-gen.mjs";
import protobufjs from "protobufjs";
import { gzipSync } from "zlib";

const file = "data_text.json";
const filePlain = "data_text_plain.json";
const fileNumber16 = "data_number_16.json";
const fileNumber32 = "data_number_32.json";
const fileNumber53 = "data_number_53.json";
const port = 4200;

const app = express();

// app.use(compression());

let data;
let dataPlain;
let numberData16;
let numberData32;
let numberData53;
app.get("/text", (req, res) => {
  writeResponse(res, data);
});
app.get("/text-plain", (req, res) => {
  writeResponse(res, dataPlain);
});
app.get("/number-16", (req, res) => {
  writeResponse(res, numberData16);
});
app.get("/number-32", (req, res) => {
  writeResponse(res, numberData32);
});
app.get("/number-53", (req, res) => {
  writeResponse(res, numberData53);
});

const writeResponse = (res, data) => {
  res.writeHead(200, {
    "Content-Encoding": "gzip",
  });
  res.write(gzipSync(JSON.stringify(data)));
  res.end();
};

let protobuffer;
let protobuffer16;
let protobuffer32;
let protobuffer53;
let protobufferFootgun;
app.get("/protobuf", (req, res) => {
  writePbResponse(res, protobuffer);
});
app.get("/protobuf-16", (req, res) => {
  writePbResponse(res, protobuffer16);
});
app.get("/protobuf-32", (req, res) => {
  writePbResponse(res, protobuffer32);
});
app.get("/protobuf-53", (req, res) => {
  writePbResponse(res, protobuffer53);
});
app.get("/protobuf-footgun", (req, res) => {
  writePbResponse(res, protobufferFootgun);
});

const writePbResponse = (res, pb) => {
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
  });
  res.write(gzipSync(pb));
  res.end();
};

const createNumberMessage = async (numberData, scalar = "32") => {
  const root = await protobufjs.load("test.proto").catch(console.error);
  const NumberMessage = root.lookupType(`test.Number${scalar}Message`);

  const errMsg = NumberMessage.verify(numberData);
  if (errMsg) {
    throw Error(errMsg);
  }

  const message = NumberMessage.create(numberData);

  return NumberMessage.encode(message).finish();
};

app.listen(port, async () => {
  await fs
    .access(file, constants.F_OK)
    .catch(generateJson)
    .then(async () => {
      data = JSON.parse(await fs.readFile(file, "utf-8"));
      dataPlain = JSON.parse(await fs.readFile(filePlain, "utf-8"));
      numberData16 = JSON.parse(await fs.readFile(fileNumber16, "utf-8"));
      numberData32 = JSON.parse(await fs.readFile(fileNumber32, "utf-8"));
      numberData53 = JSON.parse(await fs.readFile(fileNumber53, "utf-8"));
    });

  const root = await protobufjs.load("test.proto").catch(console.error);
  const TextMessage = root.lookupType("test.TextMessage");

  const errMsg = TextMessage.verify(data);
  if (errMsg) {
    throw Error(errMsg);
  }

  const message = TextMessage.create(data);
  protobuffer = TextMessage.encode(message).finish();
  console.log(
    "\nText JSON size as buffer",
    Buffer.byteLength(Buffer.from(JSON.stringify(data), "utf-8"))
  );
  console.log("Text Protobuf encoded size", Buffer.byteLength(protobuffer));

  protobuffer16 = await createNumberMessage(numberData16);
  protobuffer32 = await createNumberMessage(numberData32);
  protobuffer53 = await createNumberMessage(numberData53, "64");
  protobufferFootgun = await createNumberMessage(numberData53, "Footgun");
  console.log(
    "\n16-bit Number JSON size as buffer",
    Buffer.byteLength(Buffer.from(JSON.stringify(numberData16), "utf-8"))
  );
  console.log(
    "16-bit Number Protobuf encoded size",
    Buffer.byteLength(protobuffer16)
  );
  console.log(
    "32-bit Number JSON size as buffer",
    Buffer.byteLength(Buffer.from(JSON.stringify(numberData32), "utf-8"))
  );
  console.log(
    "32-bit Number Protobuf encoded size",
    Buffer.byteLength(protobuffer32)
  );
  console.log(
    "53-bit Number JSON size as buffer",
    Buffer.byteLength(Buffer.from(JSON.stringify(numberData53), "utf-8"))
  );
  console.log(
    "53-bit Number Protobuf encoded size",
    Buffer.byteLength(protobuffer53)
  );
  console.log(
    "53-bit Number Footgun Protobuf encoded size",
    Buffer.byteLength(protobufferFootgun)
  );

  console.log(`\nServer listening at http://localhost:${port}`);
});
