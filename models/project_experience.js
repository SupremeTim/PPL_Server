module.exports = (sequelize, DataTypes) => (
    sequelize.define('project_experience', {
        pro_name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        pro_comment: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        pro_link: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        pro_image: {
            type: DataTypes.STRING(200),
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
