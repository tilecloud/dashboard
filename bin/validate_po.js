const fs = require("fs");
const path = require("path");
const assert = require("assert");

const basePath = path.resolve(__dirname, "..", "src", "lang");
const pos = fs
  .readdirSync(basePath)
  .filter(filename => filename.match(/\.po$/))
  .map(filename => `${basePath}/${filename}`);

for (const po of pos) {
  const po_content = fs.readFileSync(po, "utf-8");
  
    if (po_content.natch(/fuzzy$/)) {
      throw new Error(`[Failure] Fuzzy seems to be remaininig.\n`);
    }
}
process.stderr.write(`[Success] Everything seems to have been translated..\n`);
