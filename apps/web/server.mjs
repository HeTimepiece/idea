import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL(".", import.meta.url).pathname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

createServer(async (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  try {
    const file = await readFile(join(root, url));
    res.writeHead(200, { "content-type": types[extname(url)] || "text/plain" });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
}).listen(3100, () => {
  console.log("Web console listening on http://localhost:3100");
});
