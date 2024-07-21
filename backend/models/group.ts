import { Model, DataTypes } from 'sequelize';
import { sequelize } from './init';

class Group extends Model {
  public id!: number;
  public name!: string;
  public parentGroupId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    parentGroupId: {
      type: new DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'groups',
    sequelize,
  }
);

export default Group;
