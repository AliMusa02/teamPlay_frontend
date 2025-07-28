import React, { useRef } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon.svg?react";
import TrashIcon from "../../../assets/icons/TrashIcon.svg?react";
import "../style.css"; // Assuming you have a CSS file for styles

function ImageUpload({
  images,
  onChange,
  coverIndex,
  onCoverChange,
  multiple = false,
}) {
  const fileInputRef = useRef(null);

  const safeImages = Array.isArray(images) ? images : images ? [images] : [];

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      const newImages = multiple ? [...safeImages, ...fileList] : [fileList[0]];
      onChange?.(newImages);

      if (!multiple) {
        onCoverChange?.(0);
      }
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (index) => {
    const newImages = safeImages.filter((_, i) => i !== index);
    onChange?.(newImages);

    if (coverIndex === index) {
      onCoverChange?.(null);
    } else if (
      coverIndex !== undefined &&
      coverIndex !== null &&
      coverIndex > index
    ) {
      onCoverChange?.(coverIndex - 1);
    }
  };

  return (
    <div className="cursor-pointer">
      <div
        onClick={handleClickUpload}
        className="bg-[#f9f7fa] border-2 border-dashed rounded-xl flex flex-col items-center py-8 cursor-pointer"
      >
        <PlusIcon />
        <p className="text-gray-500 text-xs md:text-base">
          Click to upload image
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {safeImages.length > 0 && (
        <div className="mt-4 space-y-3">
          {safeImages.map((image, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-b rounded-lg"
            >
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Preview"
                className="w-[140px] h-[68px] object-cover rounded"
              />
              <div className="flex items-center gap-4">
                <TrashIcon
                  className="trashIcon"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
