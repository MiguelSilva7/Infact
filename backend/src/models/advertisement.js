module.exports = (sequelize, DataTypes) => {
  const Advertisement = sequelize.define(
    "advertisement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "company",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      long_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sought_profil: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "advertisement",
    },
  );

  Advertisement.associate = (models) => {
    Advertisement.belongsTo(models.Company, {
      foreignKey: "company_id",
      as: "company",
    });
  };

  return Advertisement;
};
