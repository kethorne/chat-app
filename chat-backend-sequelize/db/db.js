const Sequelize = require("sequelize");

const db = new Sequelize("postgres://karinthorne@localhost:5432/chat");
const Message = require("./Message") (db);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connected successfully");
        db.sync();
    } catch (error) {
        console.error(error);
        console.error(`DB connection failed. Time to panic!`);
    }
};

    connectToDB();

module.exports = {db, Message};
