module.exports = (sequelize, DataTypes) => {

    const Administradores = sequelize.define(
        'Administradores',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            tableName: 'administradores',
            timestamps: true,
            paranoid: true
        }
    )

    return Administradores;

}