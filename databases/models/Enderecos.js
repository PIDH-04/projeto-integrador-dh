module.exports = (sequelize, DataTypes) => {

    const Enderecos = sequelize.define(
        'Enderecos',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            clientes_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            cidade:{
                type: DataTypes.STRING(120),
                allowNull: false
            },
            logradouro:{
                type: DataTypes.STRING(255),
                allowNull: false
            },
            numero:{
                type: DataTypes.STRING(6),
                allowNull: false
            },
            bairro:{
                type: DataTypes.STRING(45),
                allowNull: false
            },
            cep:{
                type: DataTypes.STRING(8),
                allowNull: false
            },
            complemento:{
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            tableName: "enderecos",
            timestamps: true
        }
    )
        
    Enderecos.associate = (models) => {
        Enderecos.belongsTo(
            models.Clientes,
            {as: "clientes", foreignKey: "clientes_id"}
        );
    }

    return Enderecos;

}