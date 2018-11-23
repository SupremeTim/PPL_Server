module.exports = (sequelize, DataTypes) => (
    sequelize.define('template', {
        tem_image: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    }, {})
);   
