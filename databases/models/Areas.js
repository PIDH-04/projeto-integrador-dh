module.exports = (sequelize, DataTypes) => {

    const Areas = sequelize.define(
        'Areas',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            slug:{
                type: DataTypes.STRING(100),
                allowNull: false
            },
            nome:{
                type: DataTypes.STRING(45),
                allowNull: false
            }
        },
        {
            tableName: "areas",
            timestamps: true
        }
    )
        
    Areas.associate = (models) => {
        Areas.hasMany(
            models.Produtos,
            {as: "produtos", foreignKey: "areas_slug"}
        );
    }

    return Areas;

}