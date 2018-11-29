module.exports = (sequelize, DataTypes) => (
    sequelize.define('template', {
        tem_image: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {})
);   
