// File System
const fs = require("fs");

fs.readFile(`${__dirname}/docs/doc1.txt`, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
});

// fs.writeFile(`${__dirname}/test.txt`, "hello, Duc\n", () => {
//   console.log("File written!");
// });

// if (!fs.existsSync(`${__dirname}/assets`)) {
//   fs.mkdir(`${__dirname}/assets`, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Folder created!");
//     }
//   });
// } else {
//   fs.rmdir(`${__dirname}/assets`, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Folder deleted!");
//     }
//   });
// }

// if (fs.existsSync(`${__dirname}/test.txt`)) {
//   fs.unlink(`${__dirname}/test.txt`, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File deleted!");
//     }
//   });
// }
