module.exports = (sequelize, DataTypes) => {

    const Categorias = sequelize.define(
        'Categorias',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome:{
                type: DataTypes.STRING(45),
                allowNull: false
            },
            caminho:{
                type: DataTypes.STRING(256),
                allowNull: false
            },
            descricao:{
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: "categorias",
            timestamps: true
        }
    )
        
    Categorias.associate = (models) => {
        Categorias.hasMany(
            models.Produtos,
            {as: "produtos", foreignKey: "categorias_slug"}
        );
    }

    return Categorias;

}