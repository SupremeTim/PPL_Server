module.exports = (sequelize, DataTypes) => (
    sequelize.define('template', {
        tem_image: {
            type: DataTypes.STRING(200),
            allowNull: false,
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
