// Name: Jim Mark Montemayor
// Section: IV-BSIT C
// Activity: N3 - File Manager with fs and path

const fs = require("node:fs");
const path = require("node:path");

const filesDir = path.join(__dirname, "files");

function getFilePath(fileName) {
  if (!fileName || !/^[a-z0-9][a-z0-9 _.-]*\.txt$/i.test(fileName)) {
    throw new Error("Enter a .txt file name without folders, such as notes.txt.");
  }
  return path.join(filesDir, fileName);
}

function printContents(contents) {
  process.stdout.write(contents);
  if (!contents.endsWith("\n")) {
    process.stdout.write("\n");
  }
}

function listFiles() {
  const names = fs.readdirSync(filesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();

  if (names.length === 0) {
    console.log("No files yet.");
    return;
  }

  for (const name of names) {
    const filePath = path.join(filesDir, name);
    console.log(`\nFull path: ${filePath}`);
    console.log(`File name: ${path.basename(filePath)}`);
    console.log(`Extension: ${path.extname(filePath)}`);
    console.log("Contents:");
    printContents(fs.readFileSync(filePath, "utf8"));
  }
}

function requireText(command, text) {
  if (!text.trim()) {
    throw new Error(`Usage: node index.js ${command} notes.txt "Your text"`);
  }
}

function main() {
  const [command, fileName, ...words] = process.argv.slice(2);
  const text = words.join(" ");

  switch (command) {
    case "create":
      requireText(command, text);
      fs.mkdirSync(filesDir, { recursive: true });
      fs.writeFileSync(getFilePath(fileName), text + "\n", { flag: "wx" });
      console.log(`Created ${fileName}.`);
      break;
    case "read": {
      const filePath = getFilePath(fileName);
      const contents = fs.readFileSync(filePath, "utf8");
      console.log(`Contents of ${path.basename(filePath)}:`);
      printContents(contents);
      break;
    }
    case "update": {
      requireText(command, text);
      // Append to an existing file without creating one if it is missing.
      const appendOnly = fs.constants.O_WRONLY | fs.constants.O_APPEND;
      fs.appendFileSync(getFilePath(fileName), text + "\n", { flag: appendOnly });
      console.log(`Appended text to ${fileName}.`);
      break;
    }
    case "delete":
      fs.unlinkSync(getFilePath(fileName));
      console.log(`Deleted ${fileName}.`);
      break;
    case "list":
      fs.mkdirSync(filesDir, { recursive: true });
      listFiles();
      break;
    default:
      throw new Error("Choose a command: create, read, update, delete, or list.");
  }
}

try {
  main();
} catch (error) {
  const fileName = process.argv[3];
  if (error.code === "ENOENT") {
    console.error(`File not found: ${fileName}`);
  } else if (error.code === "EEXIST") {
    console.error(`File already exists: ${fileName}`);
  } else {
    console.error(`Error: ${error.message}`);
  }
  process.exitCode = 1;
}
