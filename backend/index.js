const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const TransactionItem = require("./models/transaction"); 
require("dotenv").config();

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

connectToDB();

app.post("/transactions", async (req, res) => {
  const { title, amount, category } = req.body;

  const errorMessages = [];

  if (!title) {
    errorMessages.push("title");
  }
  if (!amount) {
    errorMessages.push("amount");
  }
  if (!category) {
    errorMessages.push("category");
  }

  if (errorMessages.length > 0) {
    return res.status(400).send({
      status: false,
      message: `${errorMessages.join(", ")} cannot be empty`,
    });
  }

  try {
    const newTransactionItem = new TransactionItem({
      title,
      amount,
      category,
    });

    const savedItem = await newTransactionItem.save();

    res.status(201).send({
      status: true,
      message: "Data saved successfully",
      data: savedItem,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Failed to save data",
      error: error.message,
    });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactionItems = await TransactionItem.find();
    res.status(200).send({
      message: "Data fetched successfully",
      data: transactionItems,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch data",
      error: error.message,
    });
  }
});


app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, category } = req.body;

  const errorMessages = [];

  if (!title) {
    errorMessages.push("title");
  }
  if (!amount) {
    errorMessages.push("amount");
  }
  if (!category) {
    errorMessages.push("category");
  }

  if (errorMessages.length > 0) {
    return res.status(400).send({
      status: false,
      message: `${errorMessages.join(", ")} cannot be empty`,
    });
  }

  try {
    const updatedTransactionItem = await TransactionItem.findByIdAndUpdate(
      id,
      { title, amount, category }
    );

    if (!updatedTransactionItem) {
      return res.status(404).send({
        status: false,
        message: "Transaction item not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Data updated successfully",
      data: updatedTransactionItem,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Failed to update data",
      error: error.message,
    });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TransactionItem.findByIdAndDelete(id);
    res.status(200).send({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete item",
      error: error.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}📦`);
});
