module.exports = (sequelize, DataTypes) => {

    const Produtos = sequelize.define(
        'Produtos',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            categorias_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            areas_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nome:{
                type: DataTypes.STRING(255),
                allowNull: false
            },
            largura:{
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            profundidade:{
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            altura:{
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            preco:{
                type: DataTypes.DECIMAL(6,2),
                allowNull: false
            },
            descricao:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            peso:{
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            }
        },
        {
            tableName: "produtos",
            timestamps: true
        }
    )
        
    Produtos.associate = (models) => {
        Produtos.belongsTo(
            models.Areas,
            {as: "areas", foreignKey: "areas_id"}
        );
        Produtos.belongsTo(
            models.Categorias,
            {as: "categorias", foreignKey: "categorias_id"}
        );
        Produtos.hasMany(
            models.Imagens,
            {as: "imagens", foreignKey: "produtos_id"}
        );
        Produtos.hasMany(
            models.Visitas,
            {as: "visitas", foreignKey: "produtos_id"}
        );
    }

    return Produtos;

}