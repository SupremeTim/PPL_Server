module.exports = (sequelize, DataTypes) => (
    sequelize.define('dev_field', {
        android: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        ios: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        web: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        server: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {})
);
