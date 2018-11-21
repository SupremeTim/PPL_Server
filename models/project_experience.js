module.exports = (sequelize, DataTypes) => {
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
            type: DataTypes.BLOB,
            allowNull: true,
        },
    }, {})
};