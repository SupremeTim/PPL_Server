module.exports = (sequelize, DataTypes) => (
    sequelize.define('graduated', {
        gr_univ: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        gr_grschool: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {})
);