"use client";

import { useEffect, useState } from "react";

import CategoryForm from "@/components/categories/CategoryForm";
import Loader from "@/components/custom-ui/Loader";

const CategoryDetails = ({ params }: { params: { categoryId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(
    null
  );

  const getCategoryDetails = async () => {
    try {
      const res = await fetch(`/api/categories/${params.categoryId}`, {
        method: "GET",
      });

      const data = await res.json();
      setCategoryDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[categoryID_GET] ", error);
    }
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return loading ? <Loader /> : <CategoryForm initialData={categoryDetails} />;
};

export default CategoryDetails;
