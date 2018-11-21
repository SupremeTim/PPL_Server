module.exports = (sequelize, DataTypes) => {
    sequelize.define('portfolio', {
        port_url: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
};