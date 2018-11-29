module.exports = (sequelize, DataTypes) => (
    sequelize.define('project_experience', {
        pro_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        pro_comment: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        pro_link: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        pro_image: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        pro_facebook: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    }, {})
);
