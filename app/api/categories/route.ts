import { NextRequest, NextResponse } from "next/server";

import Category from "@/lib/models/Category";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const { title } = await req.json();
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const newCategory = await Category.create({
      title,
    });

    await newCategory.save();
      return NextResponse.json(newCategory, { status: 200 });
      
      
  } catch (error) {
    console.log("[category_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
