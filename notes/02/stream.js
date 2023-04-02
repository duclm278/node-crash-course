// Streams & Buffers
const fs = require("fs");

// 0. Delete doc4.txt if it exists
if (fs.existsSync(`${__dirname}/docs/doc4.txt`)) {
  fs.unlink(`${__dirname}/docs/doc4.txt`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted doc4.txt!");
    }
  });
}

// 1. No encoding specified, so chunk will be buffer
// const readStream = fs.createReadStream(`${__dirname}/docs/doc3.txt`);
// const writeStream = fs.createWriteStream(`${__dirname}/docs/doc4.txt`);

// 1.1. Add `listener` function for event named `eventName`
// const eventName = "data";
// const listener = (chunk) => {
//   console.log("---- NEW CHUNK ----");
//   console.log(chunk); // > Buffer
//   console.log(chunk.toString()); // > String
//   writeStream.write("\nNEW CHUNK:\n");
//   writeStream.write(chunk);
// };
// readStream.on(eventName, listener);

// 1.2. More compact version of above
// readStream.on("data", (chunk) => {
//   console.log("---- NEW CHUNK ----");
//   console.log(chunk); // > Buffer
//   console.log(chunk.toString()); // > String
//   writeStream.write("\nNEW CHUNK:\n");
//   writeStream.write(chunk);
// });

// 2. Encoding specified, so chunk will be string
const readStream = fs.createReadStream(`${__dirname}/docs/doc3.txt`, {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream(`${__dirname}/docs/doc4.txt`);

readStream.on("data", (chunk) => {
  console.log("NEW CHUNK:", chunk.length, "bytes");
  writeStream.write("\nNEW CHUNK:\n");
  writeStream.write(chunk);
});

// 3. Pipe readStream to writeStream. Same as above.
// readStream.pipe(writeStream);
