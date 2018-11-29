module.exports = (sequelize, DataTypes) => (
    sequelize.define('portfolio', {
        port_url: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        port_views: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        port_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    })
);
