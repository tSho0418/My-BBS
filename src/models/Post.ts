import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import { v4 as uuidv4 } from "uuid";

class Post extends Model {
  public id!: string;
  public content!: string;
  public userName!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  },
);

export default Post;
