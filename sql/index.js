import express from "express";
import axios from "axios";
import fs from "fs";
import pg from "pg";

const app = express();
const port = 2100;
app.use(express.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "one",
  password: "!@#$%^&*",
  port: 5432
});

db.connect();
  

app.get("/", (req, res) => {
  res.render("index.ejs", {
    d: null,
  });
});

app.post("/submit", async (req, res) => {
  try {
    const ans = await db.query("SELECT capital FROM cap");
   const s= ans.rows[0];
    console.log(s);
    res.render("index.ejs", {
      d: s,
    });
    

db.end();
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Running on port number ${port}`);
});
