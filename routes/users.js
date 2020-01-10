const router = require("express").Router();
const moment = require("moment");
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const validator = require("validator");

let no = 0;

router.post("/", (req, res) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.age ||
    !req.body.amount ||
    !req.body.email
  )
    return res.send("Invalid data ");
  const user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    address: req.body.address,
    amount: req.body.amount,
    date: moment().format("MMMM Do YYYY, h:mm:ss a")
  };
  if (!validator.isEmail(user.email)) return res.send("invalid email");
  if (!validator.isLength(user.name, { min: 3, max: 30 }))
    return res.send("invalid name, it must be between 3-30 characters");

  if (!validator.isLength(user.address, { min: 3, max: 30 }))
    return res.send("invalid adress, it must be between 3-30 characters");

  ejs.renderFile(
    path.join(__dirname, "../views/", "index.ejs"),
    {
      content: user
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          height: "11.25in",
          width: "8.5in",
          header: {
            height: "20mm"
          },
          footer: {
            height: "20mm"
          }
        };
        pdf
          .create(data, options)
          .toFile(`./slips/slip${no++}.pdf`, function(err, data) {
            if (err) {
              res.send(err);
            } else {
              res.send("file created successfully");
            }
          });
      }
    }
  );
});

module.exports = router;
