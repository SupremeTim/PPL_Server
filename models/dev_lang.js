module.exports = (sequelize, DataTypes) => (
    sequelize.define('dev_lang', {
        c: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cpp: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        csharp: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        java: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        python: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {})
);
