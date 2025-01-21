module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "person",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "person",
    },
  );

  Person.associate = (models) => {
    Person.hasMany(models.JobApplication, {
      foreignKey: "person_id",
      as: "job_application",
    });
  };

  return Person;
};
