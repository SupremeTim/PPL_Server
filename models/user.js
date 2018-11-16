module.exports = (sequelize, DataTypes) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        birth: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    }, {
            timestamps: true,
            paranoid: true,
        })
};