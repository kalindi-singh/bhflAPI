const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "john_doe"; 
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

function isNumeric(str) {
  return /^\d+$/.test(str);
}

function alternatingCaps(str) {
  let res = "";
  let upper = true;

  for (let i = str.length - 1; i >= 0; i--) {
    if (/[a-zA-Z]/.test(str[i])) {
      res += upper ? str[i].toUpperCase() : str[i].toLowerCase();
      upper = !upper;
    }
  }
  return res;
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialCharacters = [];
    let sum = 0;

    data.forEach((item) => {
      if (isNumeric(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialCharacters.push(item);
      }
    });

    let concatString = alternatingCaps(alphabets.join(""));

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
