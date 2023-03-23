const fs = require("fs");

const gcsUrl = "https://storage.googleapis.com/shop-frontend/";

fs.readFile("dist/index.html", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const result = data.replace(/\/assets\//g, `${gcsUrl}assets/`);
  fs.writeFile("dist/index.html", result, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("GCS URLs added to asset paths.");
  });
});
