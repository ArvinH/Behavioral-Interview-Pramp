const fs = require("fs");

try {
  const data = fs.readFileSync("./original.txt", "utf-8");
  const originalDatasets = data.split("\n");
  const datasets = originalDatasets.map((data) => ({
    question: data,
    property: "",
  }));
  console.log({ datasets });
  fs.writeFileSync(
    "./questions.json",
    JSON.stringify(datasets, null, 2),
    "utf-8"
  );
} catch (err) {
  console.error(err);
}
