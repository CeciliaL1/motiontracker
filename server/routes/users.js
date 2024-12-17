const express = require('express');
const router = express.Router();
const cors = require('cors');
let cryptoJS = require('crypto-js');
require('dotenv').config();


router.use(cors());

router.post("/login", (req,res) =>{
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;


let cryptoPassWord = cryptoJS.HmacSHA256(userPassword, process.env.SALT_KEY).toString();

  connection.connect((err) =>{
    if (err) {
      console.log("err", err);
      return res.status(500).json({ error: "Error connection to server." });
    }
    
    let query = "SELECT * FROM users WHERE email = ? AND password = ?";
    let values = [userEmail, cryptoPassWord];

    connection.query(query, values, (err, result) =>{
      console.log(result)
      if (err) console.log("err", err);

      if (result.length > 0){
        result.map(user => {
          delete user.password
        })
        res.json(result);
      }else {
        res.status(401).json({ message: "Wrong email or password." });
      }
    })
  })
})


 






module.exports = router;
