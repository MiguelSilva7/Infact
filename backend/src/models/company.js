module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "company",
    },
  );

  Company.associate = (models) => {
    Company.hasMany(models.Advertisement, {
      foreignKey: "company_id",
      as: "advertisement",
    });
  };

  return Company;
};
