module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        nick: { // 로그인 시 입력하는 아이디
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        product: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
            timestamps: true,
            paranoid: true,
        })
);
