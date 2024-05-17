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

const formSchema = z.object({
  title: z.string().min(2).max(30),
});

const CategoryForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success("Category created");
        router.push("/categories");
      }
    } catch (error) {
      console.log("[CategoryForm_POST]", error);
      toast.error("Something went wrong! Please try again");
    }
    console.log(values);
  };

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Category</p>
      <Separator className="bg-grey-1 mt-4 mb-7" />
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
    </div>
  );
};

export default CategoryForm;
