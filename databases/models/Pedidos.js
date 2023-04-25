module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define(
        'Pedidos',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            clientes_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            enderecos_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            formas_de_pagamento_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            preco: {
                type: DataTypes.DECIMAL(6,2),
                allowNull: false
            }
        }, 
        {
            tableName: 'pedidos',
            timestamps: true
        }
    )
    
    Pedidos.associate = (models) => {
        Pedidos.belongsTo(
            models.Clientes,
            {as: "clientes", foreignKey: "clientes_id"}
        );
        Pedidos.belongsTo(
            models.Enderecos,
            {as:"enderecos", foreignKey: "enderecos_id"}
        );
        Pedidos.belongsTo(
            models.Formas_de_pagamento,
            {as:"formas_de_pagamento", foreignKey: "formas_de_pagamento_id"}
        );
    }

    return Pedidos;

}