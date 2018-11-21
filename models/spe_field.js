module.exports = (sequelize, DataTypes) => {
    sequelize.define('spe_field', {
        secure: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        iot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        ai: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        bigdata: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        db: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        game: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        networking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        os: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {})
};