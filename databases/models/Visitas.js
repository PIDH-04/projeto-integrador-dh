module.exports = (sequelize, DataTypes) => {

    const Visitas = sequelize.define(
        'Visitas',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncremente: true,
                allowNull: false
            },
            produtos_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'visitas',
            updatedAt:false
        }
    )
    
    Visitas.associate = (models) => {
        Visitas.belongsTo(
            models.Produtos,
            {as: "produtos", foreignKey: "produtos_slug"}
        );
    }

    return Visitas;

}