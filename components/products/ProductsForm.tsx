"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import { Textarea } from "../ui/textarea";
import Delete from "../custom-ui/Delete";
import { Input } from "@/components/ui/input";
import ImageUpload from "../custom-ui/ImageUpload";
import MultiSelect from "../custom-ui/MultiSelect";
import { Loader } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(150).trim(),
  image: z.string(),
  category: z.array(z.string()),
  price: z.coerce.number().min(0.1).max(100),
});

interface ProductFormProps {
  initialData?: ProductType | null; // must have ? to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
      console.log("data: ", data);
    } catch (error) {
      console.log("[categories_GET_ProductForm]", error);
      // add toast
      toast.error("Something went wrong, try again");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          category: initialData.category.map((category) => category._id),
        }
      : {
          title: "",
          description: "",
          image: "",
          category: [],
          price: 0.1,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        console.log("Product created");
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (error) {
      console.log("[ProductForm_POST]", error);
      toast.error("Something went wrong! Please try again");
    }
    console.log(values);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} rows={3} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {categories.length > 0 && (
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Category"
                          categories={categories}
                          value={field.value}
                          onChange={(_id) =>
                            field.onChange([...field.value, _id])
                          }
                          onRemove={(idToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (categoryId) => categoryId !== idToRemove
                              ),
                            ])
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* <ImageUpload /> */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* image upload end  */}
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ProductForm;
