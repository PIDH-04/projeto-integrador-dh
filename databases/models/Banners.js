module.exports = (sequelize, DataTypes) => {

    const Banners = sequelize.define(
        'Banners',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            caminho:{
                type: DataTypes.STRING(256),
                allowNull: false
            },
            descricao:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            link:{
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            tableName: "banners",
            timestamps: true
        }
    )

    return Banners;

}