module.exports = (sequelize, DataTypes) => {
    const Pedidos_has_produtos = sequelize.define(
        'Pedidos_has_produtos',
        {
            pedidos_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            produtos_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, 
        {
            tableName: 'pedidos_has_produtos',
            timestamps: false
        }
    )
    
    Pedidos_has_produtos.associate = (models) => {
        Pedidos_has_produtos.belongsTo(
            models.Pedidos,
            {as: "pedidos", foreignKey: "pedidos_id"}
        );
        Pedidos_has_produtos.belongsTo(
            models.Produtos,
            {as:"produtos", foreignKey: "produtos_id"}
        );
    }

    return Pedidos_has_produtos;

}