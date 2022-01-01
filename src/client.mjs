import fetch from "node-fetch";
import { deflate } from "zlib";

const baseUrl = "http://localhost:4200";

const compress = async (input) => {
  return new Promise((resolve, reject) => {
    deflate(input, (err, buffer) => {
      if (err) {
        console.error(err);
        reject();
      }

      resolve(Buffer.byteLength(buffer));
    });
  });
};

async function main() {
  const jsonResponse = await fetch(`${baseUrl}/text`, {
    compress: false,
  });
  console.log("Text JSON");
  console.log("--------------------------");
  console.log("Transferred bytes", jsonResponse.headers.get("content-length"));
  const text = await jsonResponse.text();

  const textByteLength = await compress(text);
  console.log("Compressed bytes ", textByteLength);
  console.log("--------------------------\n");

  const jsonPlainResponse = await fetch(`${baseUrl}/text-plain`, {
    compress: false,
  });
  console.log("Text JSON with plain object keys");
  console.log("--------------------------");
  console.log(
    "Transferred bytes",
    jsonPlainResponse.headers.get("content-length")
  );
  const textPlain = await jsonPlainResponse.text();

  const textPlainByteLength = await compress(textPlain);
  console.log("Compressed bytes ", textPlainByteLength);
  console.log("--------------------------\n");

  const protobufResponse = await fetch(`${baseUrl}/protobuf`, {
    compress: false,
  });
  console.log("Text Protobuf");
  console.log("--------------------------");
  const buffer = await protobufResponse.arrayBuffer();
  console.log("Transferred bytes", Buffer.byteLength(buffer));

  const bufferByteLength = await compress(buffer);
  console.log("Compressed bytes ", bufferByteLength);
  console.log("--------------------------\n");

  // Numbers

  //// 16-bits

  const number16Response = await fetch(`${baseUrl}/number-16`, {
    compress: false,
  });
  console.log("16-bit Number JSON");
  console.log("--------------------------");
  console.log(
    "Transferred bytes",
    number16Response.headers.get("content-length")
  );
  const text16 = await number16Response.text();

  const text16ByteLength = await compress(text16);
  console.log("Compressed bytes ", text16ByteLength);
  console.log("--------------------------\n");

  const protobuf16Response = await fetch(`${baseUrl}/protobuf-16`, {
    compress: false,
  });
  console.log("16-bit Number Protobuf");
  console.log("--------------------------");
  const buffer16 = await protobuf16Response.arrayBuffer();
  console.log("Transferred bytes", Buffer.byteLength(buffer16));

  const buffer16ByteLength = await compress(buffer16);
  console.log("Compressed bytes ", buffer16ByteLength);
  console.log("--------------------------\n");

  //// 32-bits

  const number32Response = await fetch(`${baseUrl}/number-32`, {
    compress: false,
  });
  console.log("32-bit Number JSON");
  console.log("--------------------------");
  console.log(
    "Transferred bytes",
    number32Response.headers.get("content-length")
  );
  const text32 = await number32Response.text();

  const text32ByteLength = await compress(text32);
  console.log("Compressed bytes ", text32ByteLength);
  console.log("--------------------------\n");

  const protobuf32Response = await fetch(`${baseUrl}/protobuf-32`, {
    compress: false,
  });
  console.log("32-bit Number Protobuf");
  console.log("--------------------------");
  const buffer32 = await protobuf32Response.arrayBuffer();
  console.log("Transferred bytes", Buffer.byteLength(buffer32));

  const buffer32ByteLength = await compress(buffer32);
  console.log("Compressed bytes ", buffer32ByteLength);
  console.log("--------------------------\n");

  //// 53-bits

  const number53Response = await fetch(`${baseUrl}/number-53`, {
    compress: false,
  });
  console.log("53-bit Number JSON");
  console.log("--------------------------");
  console.log(
    "Transferred bytes",
    number53Response.headers.get("content-length")
  );
  const text53 = await number53Response.text();

  const text53ByteLength = await compress(text53);
  console.log("Compressed bytes ", text53ByteLength);
  console.log("--------------------------\n");

  const protobuf53Response = await fetch(`${baseUrl}/protobuf-53`, {
    compress: false,
  });
  console.log("53-bit Number Protobuf");
  console.log("--------------------------");
  const buffer53 = await protobuf53Response.arrayBuffer();
  console.log("Transferred bytes", Buffer.byteLength(buffer53));

  const buffer53ByteLength = await compress(buffer53);
  console.log("Compressed bytes ", buffer53ByteLength);
  console.log("--------------------------\n");

  const protobufFootgunResponse = await fetch(`${baseUrl}/protobuf-footgun`, {
    compress: false,
  });
  console.log("53-bit Number Footgun Protobuf");
  console.log("--------------------------");
  const bufferFootgun = await protobufFootgunResponse.arrayBuffer();
  console.log("Transferred bytes", Buffer.byteLength(bufferFootgun));

  const bufferFootgunByteLength = await compress(bufferFootgun);
  console.log("Compressed bytes ", bufferFootgunByteLength);
  console.log("--------------------------\n");

  // Results

  console.log(
    `Protobuf of utf-8 text was ${(
      100 -
      (bufferByteLength / textByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of utf-8 text was ${(
      100 -
      (bufferByteLength / textPlainByteLength) * 100
    ).toFixed(2)} % smaller than JSON with plain object keys\n`
  );
  console.log(
    `Protobuf of 16-bit sint32 numbers was ${(
      100 -
      (buffer16ByteLength / text16ByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of 32-bit sint32 numbers was ${(
      100 -
      (buffer32ByteLength / text32ByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of 53-bit sint64 numbers was ${(
      100 -
      (buffer53ByteLength / text53ByteLength) * 100
    ).toFixed(2)} % smaller than JSON`
  );
  console.log(
    `Protobuf of 53-bit int64  numbers was ${(
      100 -
      (bufferFootgunByteLength / text53ByteLength) * 100
    ).toFixed(2)} % smaller than JSON\n`
  );
}

main();
