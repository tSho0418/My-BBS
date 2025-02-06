import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import { v4 as uuidv4 } from "uuid";

class Post extends Model {
  public id!: number;
  public content!: string;
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
  },
  {
    sequelize,
    modelName: "Post",
  },
);

export default Post;
