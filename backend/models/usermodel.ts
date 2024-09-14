import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the User model class
export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public role!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model with the Sequelize instance
const initUserModel = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'artist', 'enthusiast']],
      },
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true, // Automatically handle `createdAt` and `updatedAt` columns
  });

  return User;
};

export default initUserModel;
