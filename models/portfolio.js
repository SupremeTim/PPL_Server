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
        dev_field: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
        },
        dev_lang: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
        },
        spe_field: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '',
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('now()'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('now()'),
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);
