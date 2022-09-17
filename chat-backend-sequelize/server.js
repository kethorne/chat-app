const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());

const{db, Message} = require("./db/db.js");
const {INTEGER} = require('sequelize');

// const {Client} = require("pg");
// const db = new Client({username: "karinthorne", database: "chat"});
// db.connect();
// db.query("SELECT NOW()", (err, results) => {
//     console.log(results)
// });

let messages = []; //#4, #13, #19

server.get("/", (req, res) => {
	console.log("root route hit");
	res.send("Welcome to my fancy API.");
});

//PART A
//#2, #18
server.get("/messages", async (req, res) => {
    res.send({messages: await Message.findAll()});
    // const sqlResult = await db.query(`SELECT * FROM messages;`);
    // console.log(sqlResult);
	// res.send({ messages: sqlResult.rows }); //#3, #20
});

//PART B
//#11
server.post("/message",  async (req, res) => {
    await Message.create({
        content: req.body.text,
        received: req.body.received,
        timestamp: new Date(),
    });
    res.send({messages: await Message.findAll()});
// 	await db.query(`INSERT INTO messages
// (content, timestamp, received)
// VALUES
// ('${req.body.text}', NOW(), false);`);
//     const sqlResult = await db.query(`SELECT * FROM messages;`);
//     res.send({messages: sqlResult.rows});
});

server.patch("/message/:databaseID", async(req, res) => {
   const message = await Message.findByPk(req.params.databaseID);
   message.content = req.body.newMessageText;
    await message.save();
   res.send({messages: await Message.findAll()});


    // console.log(messages);
    // messages[req.body.index].text = req.body.newMessageText;
    // console.log(messages);
    // res.send({messages});
});

server.delete("/message/:databaseID", async (req, res) => {
    await Message.destroy(message,{
        where: {
            id: message.id,
        }
    });
    res.send({messages: await Message.findAll()});
    // await db.query(`DELETE FROM messages WHERE id=${req.params.databaseID}`);
    // const sqlResult = await db.query(`SELECT * FROM messages;`);
    // res.send({messages: sqlResult.rows});
})

server.listen(3001, () => {
	console.log("API running, time to party!");
});
