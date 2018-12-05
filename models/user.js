module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        nick: { // 로그인 시 입력하는 아이디
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0,
        },
        product: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0,
        },
        career: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        univ: {
            type: DataTypes.STRING(20),
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
