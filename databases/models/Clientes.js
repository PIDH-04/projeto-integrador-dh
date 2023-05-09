module.exports = (sequelize, DataTypes) => {

    const Clientes = sequelize.define(
        'Clientes',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncremente: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING(120),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(120),
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.STRING(64),
                allowNull: false
            }
        },
        {
            tableName: 'clientes',
            timestamps: true
        }
    )
    
    Clientes.associate = (models) => {
        Clientes.hasMany(
            models.Enderecos,
            {as: "enderecos", foreignKey: "clientes_id"}
        );
    }

    return Clientes;

}