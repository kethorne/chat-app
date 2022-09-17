const {DataTypes} = require("sequelize");

module.exports = (db) =>  {
    return db.define(
        "message",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: DataTypes.TEXT,
            timestamp: DataTypes.DATE,
            received: DataTypes.BOOLEAN,
        },
        {timestamps: false}
    );
};
