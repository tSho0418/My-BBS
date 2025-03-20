import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post";
import sequelize from "../../../../config/database";
import { Op } from "sequelize";
import { getServerSession } from "next-auth";

(async () => {
  await sequelize.sync();
})();

export async function GET(req: NextRequest) {
  try {
    let posts;
    const searchParams = req.nextUrl.searchParams;
    const content = searchParams.get("content");
    if (content) {
      posts = await Post.findAll({
        where: {
          content: {
            [Op.like]: `%${content}%`,
          },
        },
      });
    } else {
      posts = await Post.findAll();
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userName = session.user?.name;
    if (!userName) {
      return NextResponse.json({ error: "Name not found in session" }, { status: 400 });
    }

    const email = session.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Email not found in session" }, { status: 400 });
    }

    const body = await req.json();
    await Post.create({ content: body.content, userName: userName, email: email });
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("post error!", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const post = await Post.findByPk(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.destroy();

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("delete error!", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
