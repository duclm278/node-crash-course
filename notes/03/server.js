// Clients & Servers
const http = require("http");

// Run `requestListener` function every time request is made
// const requestListener = (req, res) => {
//   console.log("Request made");
// };
// const server = http.createServer(requestListener);

// More compact version of above
const server = http.createServer((req, res) => {
  console.log("Request made");
});

// Here, localhost is default value for 2nd argument
server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});
