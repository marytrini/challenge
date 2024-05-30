const {DataTypes} = require('sequelize');
const { all } = require('../routes');

module.exports = (sequelize) => {
    sequelize.define(
        "Note",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            archive:{
                type: DataTypes.BOOLEAN,
            },
            active: {
                type: DataTypes.BOOLEAN,
            }
        },
        {
            timestamps: true,
        }
    )
}