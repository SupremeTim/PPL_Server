module.exports = (sequelize, DataTypes) => (
    sequelize.define('career', {
        com_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        cmo_emp: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    }, {})
);
