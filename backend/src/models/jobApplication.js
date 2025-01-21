module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define(
    "job_application",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      advertisement_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "advertisement",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("applied", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "applied",
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "person",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      tableName: "job_application",
    },
  );

  JobApplication.associate = (models) => {
    JobApplication.belongsTo(models.Advertisement, {
      foreignKey: "advertisement_id",
      as: "advertisement",
    });

    JobApplication.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    JobApplication.belongsTo(models.Person, {
      foreignKey: "person_id",
      as: "person",
    });
  };

  return JobApplication;
};
