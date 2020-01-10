const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user = require("./routes/users");
const port = 3000 || process.env.PORT;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", user);

app.listen(port, () => console.log(`running at ${port}`));
