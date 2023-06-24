var express = require("express");
var jwt = require("jsonwebtoken");

var app = express();
app.use(express.json());

var fs = require("fs");
const { use } = require("./routes");

app.get("/getUsers", function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.route("/user/login").post(function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ error: "Аль нэг параметр дутуу байна" });
  }

  const user = { name: name, password: password };
  const accessToken = jwt.sign({ user }, "my_secret_key");
  res.json({ message: "Та амжилттай нэвтэрлээ", accessToken: accessToken });
});

// app.post("/user/login", function (req, res) {
//   const user = { id: 1 };
//   const accessToken = jwt.sign({ user }, "my_secret_key");
//   res.json({ accessToken: accessToken });

//   // const username = req.body.username;
//   // const user = { name: username };
//   // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   // res.json({ accessToken: accessToken });
// });

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});
