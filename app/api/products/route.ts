import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const { title, description, image, category, price } = await req.json();
    if (!title || !description || !category || !price) {
      return new NextResponse("All Fields are required", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      image,
      category,
      price,
    });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("[products_POST] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
