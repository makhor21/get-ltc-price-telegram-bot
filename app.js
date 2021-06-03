require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const schedule = require("node-schedule");
const moment = require("moment-jalaali");
moment.loadPersian({ usePersianDigits: false, dialect: "persian-modern" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sendData = schedule.scheduleJob("0 16 * * *", async function() {
    const res = await axios.get(process.env.API_URL);
    const date = moment()
        .utcOffset(+270)
        .format("jYYYY/jM/jD - HH:mm");
    const price = Number(res.data.data.priceUsd).toFixed(2);
    const data = {
        chat_id: "1261111418",
        text: `${date}
        
        ${price} $`,
    };
    await axios.post(`${process.env.TELEGRAM_API}/sendMessage`, data);
});

app.get("/", (req, res) => {
    res.send(`there's nothing to show :D`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on localhost:${port} ...`);
});