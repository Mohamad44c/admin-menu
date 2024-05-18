"use client";

import { useState } from "react";
import { Button } from "./button";
import axios from "axios";
import { Upload } from "lucide-react";

const ImageUpload2 = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  //   const handleUpload = async () => {
  //     setUploading(true);
  //     try {
  //       if (!selectedFile) return;
  //       const formData = new FormData();
  //       formData.append("myImage", selectedFile);
  //       const { data } = await axios;
  //       console.log(data);
  //     } catch (error: any) {
  //       console.log(error.response?.data);
  //     }
  //     setUploading(false);
  //   };

  return (
    <div className="max-w-4xl  space-y-6">
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          {selectedImage ? (
            <img src={selectedImage} alt="" />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>
      <Button
        className="bg-blue-1 text-white"
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
      >
        <Upload className="mr-2 w-4 h-4" />
        {uploading ? "Uploading.." : "Upload"}
      </Button>
    </div>
  );
};

export default ImageUpload;
