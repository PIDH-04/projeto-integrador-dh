module.exports = (sequelize, DataTypes) => {

    const Imagens = sequelize.define(
        'Imagens',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            caminho:{
                type: DataTypes.STRING(255),
                allowNull: false
            },
            produtos_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "imagens",
            timestamps: true
        }
    )
        
    Imagens.associate = (models) => {
        Imagens.belongsTo(
            models.Produtos,
            {as: "produtos", foreignKey: "produtos_id"}
        );
    }

    return Imagens;

}