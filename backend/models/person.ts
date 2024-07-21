import { Model, DataTypes } from 'sequelize';
import { sequelize } from './init';

class Person extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public jobTitle!: string;
  public groupId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    jobTitle: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    groupId: {
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'people',
    sequelize,
  }
);

export default Person;
