import React, { useRef, useState } from 'react';
import { Camera, Loader2, Upload } from 'lucide-react';
import { useGlobalImages } from '../context/ImageContext';

interface ImageUploaderProps {
  id: string;
  className?: string; // To position the overlay
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, className = "absolute inset-0" }) => {
  const { isEditMode, updateImage } = useGlobalImages();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!isEditMode) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      await updateImage(id, file);
      setUploading(false);
    }
  };

  return (
    <div className={`${className} z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-0 hover:opacity-100 cursor-pointer border-2 border-dashed border-white/50 m-2 rounded-xl`}
         onClick={(e) => {
           e.stopPropagation();
           inputRef.current?.click();
         }}
    >
      <input 
        ref={inputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center text-white drop-shadow-md">
        {uploading ? (
          <Loader2 className="animate-spin mb-2" size={32} />
        ) : (
          <Upload className="mb-2" size={32} />
        )}
        <span className="text-xs font-bold uppercase tracking-wider">点击更换图片</span>
      </div>
    </div>
  );
};

export default ImageUploader;