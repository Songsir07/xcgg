import React, { useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { useGlobalImages } from '../context/ImageContext';

interface ImageUploaderProps {
  id: string;
  className?: string; // To position the overlay
}

// Global kill-switch to disable uploads once assets are finalized.
const UPLOADS_LOCKED = true;

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, className = "absolute inset-0" }) => {
  const { updateImage, setImageURL } = useGlobalImages();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // When locked, hide the uploader entirely so clicks no longer open the file picker.
  if (UPLOADS_LOCKED) {
    return null;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 即时预览：先用 blob URL 立刻显示，提升交互速度
    const blobUrl = URL.createObjectURL(file);
    setImageURL(id, blobUrl);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', id);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        if (data && data.url) {
          setImageURL(id, data.url);
        } else {
          // fallback: 本地存储方案
          await updateImage(id, file);
        }
      } else {
        await updateImage(id, file);
      }
    } catch (e) {
      await updateImage(id, file);
    } finally {
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