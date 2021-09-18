const express = require("express");
const fs = require("fs");
const { upload } = require("./middlewares/multer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/uploadfile", upload.single("myFile"), (req, res) => {
  const file = req.file;
  const img = fs.readFileSync(file.path);
  const encoded = img.toString("base64");
  fs.writeFile("files/out.jpg", encoded, "base64", (err) => {
    console.log(err);
  });
  if (!file) {
    // error
  } else {
    res.send();
  }
});

app.post("/uploadmultiple", upload.array("myFiles", 10), (req, res) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    // error
  } else {
    res.send({ message: "Files have been saved" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
