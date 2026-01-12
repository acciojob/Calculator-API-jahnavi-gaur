const express = require("express");

const app = express();
app.use(express.json());

const LIMIT = 1000000;

/* ---------- Helper Validation ---------- */
const validateInput = (num1, num2) => {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return { error: true, message: "Invalid data types" };
  }

  if (num1 > LIMIT || num2 > LIMIT) {
    return { error: true, message: "Overflow" };
  }

  if (num1 < -LIMIT || num2 < -LIMIT) {
    return { error: true, message: "Underflow" };
  }

  return { error: false };
};

/* ---------- Home Route ---------- */
app.get("/", (req, res) => {
  res.send("Hello World");
});

/* ---------- ADD ---------- */
app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;

  const validation = validateInput(num1, num2);
  if (validation.error) {
    return res.json({ status: "error", message: validation.message });
  }

  const sum = num1 + num2;

  if (sum > LIMIT) return res.json({ status: "error", message: "Overflow" });
  if (sum < -LIMIT) return res.json({ status: "error", message: "Underflow" });

  res.json({
    status: "success",
    message: "the sum of given two numbers",
    sum
  });
});

/* ---------- SUBTRACT ---------- */
app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;

  const validation = validateInput(num1, num2);
  if (validation.error) {
    return res.json({ status: "error", message: validation.message });
  }

  const difference = num1 - num2;

  if (difference > LIMIT) return res.json({ status: "error", message: "Overflow" });
  if (difference < -LIMIT) return res.json({ status: "error", message: "Underflow" });

  res.json({
    status: "success",
    message: "the difference of given two numbers",
    difference
  });
});

/* ---------- MULTIPLY ---------- */
app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;

  const validation = validateInput(num1, num2);
  if (validation.error) {
    return res.json({ status: "error", message: validation.message });
  }

  const result = num1 * num2;

  if (result > LIMIT) return res.json({ status: "error", message: "Overflow" });
  if (result < -LIMIT) return res.json({ status: "error", message: "Underflow" });

  res.json({
    status: "success",
    message: "The product of given numbers",
    result
  });
});

/* ---------- DIVIDE ---------- */
app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;

  const validation = validateInput(num1, num2);
  if (validation.error) {
    return res.json({ status: "error", message: validation.message });
  }

  if (num2 === 0) {
    return res.json({ status: "error", message: "Cannot divide by zero" });
  }

  const result = num1 / num2;

  if (result > LIMIT) return res.json({ status: "error", message: "Overflow" });
  if (result < -LIMIT) return res.json({ status: "error", message: "Underflow" });

  res.json({
    status: "success",
    message: "The division of given numbers",
    result
  });
});

module.exports = app;
