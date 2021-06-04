require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const schedule = require("node-schedule");
const moment = require("moment-jalaali");
moment.loadPersian({ usePersianDigits: false, dialect: "persian-modern" });
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TOKEN);

bot.command("price", async(ctx) => {
    const res = await axios.get(process.env.API_URL);
    const price = Number(res.data.data.priceUsd).toFixed(2);
    const date = moment()
        .utcOffset(+270)
        .format("jYYYY/jM/jD - HH:mm");
    const data = `<b>${date}</b>
        
    ${price} <i>$</i>`;
    ctx.replyWithHTML(data);
});

bot.launch();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const sendData = schedule.scheduleJob("0 21 * * *", async function() {
//     const res = await axios.get(process.env.API_URL);
//     const date = moment()
//         .utcOffset(+270)
//         .format("jYYYY/jM/jD - HH:mm");
//     const price = Number(res.data.data.priceUsd).toFixed(2);
//     const data = {
//         chat_id: "1261111418",
//         text: `${date}

//         ${price} $`,
//     };
//     await axios.post(`${process.env.TELEGRAM_API}/sendMessage`, data);
// });

app.get("/", (req, res) => {
    res.send(`<p>there's nothing to show :D</p>`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on localhost:${port} ...`);
});