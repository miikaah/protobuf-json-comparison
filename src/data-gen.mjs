import fs from "fs/promises";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅäöabcdefghijklmnopqrstuvwxyzåäö";

function getRandomString(length) {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateJson = async () => {
  const textOutput = { foo: [] };

  for (let i = 0; i < 10 * 400; i++) {
    textOutput.foo.push({
      barBarBar: getRandomString(10),
      bazBazBaz: getRandomString(10),
      baxBaxBax: getRandomString(10),
      bacBacBac: getRandomString(10),
      bavBavBav: getRandomString(10),
      babBabBab: getRandomString(10),
      banBanBan: getRandomString(10),
      bamBamBam: getRandomString(10),
      baaBaaBaa: getRandomString(10),
      basBasBas: getRandomString(10),
    });
  }
  await fs.writeFile("data_text.json", JSON.stringify(textOutput));

  const plainOutput = {
    foo: textOutput.foo.map((f) => {
      return Object.entries(f).reduce(
        (acc, [, value], index) => ({
          ...acc,
          [index]: value,
        }),
        {}
      );
    }),
  };
  await fs.writeFile("data_text_plain.json", JSON.stringify(plainOutput));

  const number16Output = { foo: [] };
  let max = Math.pow(2, 16);
  let min = -1 * max - 1;

  for (let i = 0; i < 10 * 400; i++) {
    number16Output.foo.push({
      barBarBar: getRandomInt(min, max),
      bazBazBaz: getRandomInt(min, max),
      baxBaxBax: getRandomInt(min, max),
      bacBacBac: getRandomInt(min, max),
      bavBavBav: getRandomInt(min, max),
      babBabBab: getRandomInt(min, max),
      banBanBan: getRandomInt(min, max),
      bamBamBam: getRandomInt(min, max),
      baaBaaBaa: getRandomInt(min, max),
      basBasBas: getRandomInt(min, max),
    });
  }
  await fs.writeFile("data_number_16.json", JSON.stringify(number16Output));

  const number32Output = { foo: [] };
  max = Math.pow(2, 32);
  min = -1 * max - 1;

  for (let i = 0; i < 10 * 400; i++) {
    number32Output.foo.push({
      barBarBar: getRandomInt(min, max),
      bazBazBaz: getRandomInt(min, max),
      baxBaxBax: getRandomInt(min, max),
      bacBacBac: getRandomInt(min, max),
      bavBavBav: getRandomInt(min, max),
      babBabBab: getRandomInt(min, max),
      banBanBan: getRandomInt(min, max),
      bamBamBam: getRandomInt(min, max),
      baaBaaBaa: getRandomInt(min, max),
      basBasBas: getRandomInt(min, max),
    });
  }
  await fs.writeFile("data_number_32.json", JSON.stringify(number32Output));

  const number53Output = { foo: [] };
  max = Number.MAX_SAFE_INTEGER;
  min = -1 * max - 1;

  for (let i = 0; i < 10 * 400; i++) {
    number53Output.foo.push({
      barBarBar: getRandomInt(min, max),
      bazBazBaz: getRandomInt(min, max),
      baxBaxBax: getRandomInt(min, max),
      bacBacBac: getRandomInt(min, max),
      bavBavBav: getRandomInt(min, max),
      babBabBab: getRandomInt(min, max),
      banBanBan: getRandomInt(min, max),
      bamBamBam: getRandomInt(min, max),
      baaBaaBaa: getRandomInt(min, max),
      basBasBas: getRandomInt(min, max),
    });
  }
  await fs.writeFile("data_number_53.json", JSON.stringify(number53Output));
};
