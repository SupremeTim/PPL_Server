module.exports = (sequelize, DataTypes) => (
    sequelize.define('career_detail', {
        com_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        com_term: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        com_comment: {
            type: DataTypes.STRING(100),
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