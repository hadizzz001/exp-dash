// url: http://localhost:3000/api/posts/12345
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    const post = await prisma.deal.findUnique({
        where: {
            id
        }
    });

    if(!post) {
        return NextResponse.json(
            {message: "Post not found", err},
            {status: 404}
        )
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};

export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        const {img} = body; 
        const {id} = params;

        const updatePost = await prisma.under.update({
            where: {
                id
            },
            data: {img}
        })

        if(!updatePost) {
            return NextResponse.json(
                {message: "Post not found", err},
                {status: 404}
            )
        }

        return NextResponse.json(updatePost);

    } catch(err) {
        return NextResponse.json({message: "update Error", err}, {status: 500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
      const { id } = params;
  
      await prisma.deal.delete({
          where: {
              id
          }
      });
  
      return NextResponse.json("Post has been deleted");
    } catch (err) {
      return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
  };