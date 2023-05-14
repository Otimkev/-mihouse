"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "xsxjotv0";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result);
    },
    [onChange]
  );

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [roomType, SetroomType] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image
    handleUpload(file)
    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  return (
    <div
      //onClick={() => open?.()}
      //onClick={() => {}}
      className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
    >
      <label className="rounded-md text-gray align focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer">
        <div className="flex justify-center ">
          <TbPhotoPlus size={50} />
        </div>
        <div className="font-semibold text-lg">Click to upload</div>
        <input
          type="file"
          name="image"
          id="image"
          className="sr-only block w-0 h-0"
          onChange={onFileUploadChange}
        />
      </label>

      {previewUrl && (
        <div
          className="
              absolute inset-0 w-full h-full"
        >
          <Image fill style={{ objectFit: "cover" }} src={previewUrl} alt="House" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
