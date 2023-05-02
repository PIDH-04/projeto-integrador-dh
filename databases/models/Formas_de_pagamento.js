module.exports = (sequelize, DataTypes) => {

    const Formas_de_pagamento = sequelize.define(
        'Formas_de_pagamento',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncremente: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            tableName: 'formas_de_pagamento',
            timestamps: false
        }
    )
    
    Formas_de_pagamento.associate = (models) => {
        Formas_de_pagamento.hasMany(
            models.Pedidos,
            {as: "pedidos", foreignKey: "formas_de_pagamento_id"}
        );
    }

    return Formas_de_pagamento;

}