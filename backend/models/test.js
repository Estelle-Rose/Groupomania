module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: '0'
        },
    }, {
        freezeTableName: true, // Prevent table name change to plural
    });
    return User;
};