import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/send-telegram", async (req, res) => {
  try {
    const text = req.body.text || "Pesan kosong dari website";
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengirim pesan" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server berjalan di port 3000"));
