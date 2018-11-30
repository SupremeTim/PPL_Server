module.exports = (sequelize, DataTypes) => (
    sequelize.define('portfolio', {
        port_url: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        port_views: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        port_name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: "",
        },
    })
);
