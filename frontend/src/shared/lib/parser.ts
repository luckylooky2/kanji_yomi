import fs from "fs";
import csv from "csv-parser";

const results: Array<[string, string]> = [];

fs.createReadStream("/Users/chanhyle/Desktop/N5.csv")
  .pipe(csv())
  .on("data", (row: Record<string, string>) => {
    const col5 = row[Object.keys(row)[5]]; // 5번째 열
    const col6 = row[Object.keys(row)[6]]; // 6번째 열

    results.push([col5, col6]);
  })
  .on("end", () => {
    const res = results.filter((v) => v[1]);
    res.map((v) => console.log(`["${v[1]}", "${v[0]}"], `));
  });
