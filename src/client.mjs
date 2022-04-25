import fetch from "node-fetch";
import { gunzipSync } from "zlib";
import { strict as assert } from "assert";
import protobufjs from "protobufjs";

const baseUrl = "http://localhost:4200";

async function main() {
  const jsonResponse = await fetch(`${baseUrl}/text`, {
    compress: false,
  });
  console.log("Text JSON");
  console.log("--------------------------");
  const json = await jsonResponse.arrayBuffer();
  const jsonByteLength = Buffer.byteLength(json);
  console.log("Transferred bytes ", jsonByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(json)));
  console.log("--------------------------\n");

  const jsonPlainResponse = await fetch(`${baseUrl}/text-plain`, {
    compress: false,
  });
  console.log("Text JSON with plain object keys");
  console.log("--------------------------");
  const jsonPlain = await jsonPlainResponse.arrayBuffer();
  const jsonPlainByteLength = Buffer.byteLength(jsonPlain);
  console.log("Transferred bytes ", jsonPlainByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(jsonPlain)));
  console.log("--------------------------\n");

  const protobufResponse = await fetch(`${baseUrl}/protobuf`, {
    compress: false,
  });
  console.log("Text Protobuf");
  console.log("--------------------------");
  const protobuf = await protobufResponse.arrayBuffer();
  const protobufByteLength = Buffer.byteLength(protobuf);
  console.log("Transferred bytes ", protobufByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(protobuf)));
  console.log("--------------------------\n");

  // Numbers

  //// 16-bits

  const number16Response = await fetch(`${baseUrl}/number-16`, {
    compress: false,
  });
  console.log("16-bit Number JSON");
  console.log("--------------------------");
  const number16 = await number16Response.arrayBuffer();
  const number16ByteLength = Buffer.byteLength(number16);
  console.log("Transferred bytes ", number16ByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(number16)));
  console.log("--------------------------\n");

  const protobuf16Response = await fetch(`${baseUrl}/protobuf-16`, {
    compress: false,
  });
  console.log("16-bit sint32 Protobuf");
  console.log("--------------------------");
  const buffer16 = await protobuf16Response.arrayBuffer();
  const buffer16ByteLength = Buffer.byteLength(buffer16);
  console.log("Transferred bytes ", buffer16ByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(buffer16)));
  console.log("--------------------------\n");

  //// 32-bits

  const number32Response = await fetch(`${baseUrl}/number-32`, {
    compress: false,
  });
  console.log("32-bit Number JSON");
  console.log("--------------------------");
  const number32 = await number32Response.arrayBuffer();
  const number32ByteLength = Buffer.byteLength(number32);
  console.log("Transferred bytes ", number32ByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(number32)));
  console.log("--------------------------\n");

  const protobuf32Response = await fetch(`${baseUrl}/protobuf-32`, {
    compress: false,
  });
  console.log("32-bit sint32 Protobuf");
  console.log("--------------------------");
  const buffer32 = await protobuf32Response.arrayBuffer();
  const buffer32ByteLength = Buffer.byteLength(buffer32);
  console.log("Transferred bytes ", buffer32ByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(buffer32)));
  console.log("--------------------------\n");

  //// 53-bits

  const number53Response = await fetch(`${baseUrl}/number-53`, {
    compress: false,
  });
  console.log("53-bit Number JSON");
  console.log("--------------------------");
  const number53 = await number53Response.arrayBuffer();
  const number53ByteLength = Buffer.byteLength(number53);
  console.log("Transferred bytes ", number53ByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(number53)));
  console.log("--------------------------\n");

  const protobuf53Response = await fetch(`${baseUrl}/protobuf-53`, {
    compress: false,
  });
  console.log("53-bit sint64 Protobuf");
  console.log("--------------------------");
  const buffer53 = await protobuf53Response.arrayBuffer();
  const buffer53ByteLength = Buffer.byteLength(buffer53);
  console.log("Transferred bytes ", buffer53ByteLength);
  console.log("Uncompressed bytes", Buffer.byteLength(gunzipSync(buffer53)));
  console.log("--------------------------\n");

  const protobufFootgunResponse = await fetch(`${baseUrl}/protobuf-footgun`, {
    compress: false,
  });
  console.log("53-bit int64 Footgun Protobuf");
  console.log("--------------------------");
  const bufferFootgun = await protobufFootgunResponse.arrayBuffer();
  const bufferFootgunByteLength = Buffer.byteLength(bufferFootgun);
  console.log("Transferred bytes ", bufferFootgunByteLength);
  console.log(
    "Uncompressed bytes",
    Buffer.byteLength(gunzipSync(bufferFootgun))
  );
  console.log("--------------------------\n");

  // Results

  console.log(
    `Protobuf of utf-8 text was ${(
      100 -
      (protobufByteLength / jsonByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of utf-8 text was ${(
      100 -
      (protobufByteLength / jsonPlainByteLength) * 100
    ).toFixed(2)} % smaller than JSON with plain object keys\n`
  );
  console.log(
    `Protobuf of 16-bit sint32 numbers was ${(
      100 -
      (buffer16ByteLength / number16ByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of 32-bit sint32 numbers was ${(
      100 -
      (buffer32ByteLength / number32ByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of 53-bit sint64 numbers was ${(
      100 -
      (buffer53ByteLength / number53ByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of 53-bit int64  numbers was ${(
      100 -
      (bufferFootgunByteLength / number53ByteLength) * 100
    ).toFixed(2)} % smaller than JSON\n`
  );

  // Check that data can be decoded properly
  const root = await protobufjs.load("test.proto").catch(console.error);
  const TextMessage = root.lookupType("test.TextMessage");
  const decodedPbText = TextMessage.toObject(
    TextMessage.decode(gunzipSync(protobuf))
  );

  assert.deepEqual(
    JSON.parse(gunzipSync(json).toString()).foo[0],
    decodedPbText.foo[0]
  );
  console.log("Text JSON and protobuf have the same data");
}

main();
