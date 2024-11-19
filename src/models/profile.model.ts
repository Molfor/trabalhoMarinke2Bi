import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import sequelize from "../shared/connection";

export interface ProfileAttributes {
  id: number;
  firstname: string;
  lastname: string;
  profession: string;
  balance: number;
  type: string;
}

export interface ProfileCreationAttributes
  extends Optional<ProfileAttributes, "id"> {}

export class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public profession!: string;
  public balance!: number;
  public type!: string;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profiles",
  }
);

export default Profile;