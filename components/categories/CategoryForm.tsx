"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom-ui/Delete";

const formSchema = z.object({
  title: z.string().min(2).max(30),
});

interface CategoryFormProps {
  initialData?: CategoryType | null; // must have ? to make it optional
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const url = initialData
        ? `/api/categories/${initialData._id}`
        : "/api/categories";

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Category ${initialData ? "updated" : "created"}`);
        console.log("Category created");
        window.location.href = "/categories";
        router.push("/categories");
      }
    } catch (error) {
      console.log("[CategoryForm_POST]", error);
      console.log("Category not created");
      toast.error("Something went wrong! Please try again");
    }
    console.log(values);
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Category</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Category</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Category title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
