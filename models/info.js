module.exports = (sequelize, DataTypes) => (
    sequelize.define('info', {
        profile_image: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        open_age: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        intro_comment: {
            type:DataTypes.STRING(200),
            allowNull: true,
        },
    }, {})
);
