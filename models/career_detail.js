module.exports = (sequelize, DataTypes) => (
    sequelize.define('career_detail', {
        com_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        com_term: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        com_comment: {
            type: DataTypes.STRING(100),
            allowNull: true,
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