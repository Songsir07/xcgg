import React, { createContext, useContext, useEffect, useState } from 'react';
import { GuestMoment } from '../types';

// New Type for simple gallery items
export interface GalleryItem {
  id: string;
  image: string;
  timestamp: number;
}

interface ImageContextType {
  images: Record<string, string>;
  updateImage: (id: string, file: File) => Promise<void>;
  
  moments: GuestMoment[];
  addMoment: (moment: Omit<GuestMoment, 'image'>, file: File) => Promise<void>;
  
  // New: Government Gallery Data
  govGallery: GalleryItem[];
  addGovGalleryImages: (files: FileList) => Promise<void>;
  clearGovGallery: () => Promise<void>;

  isEditMode: boolean;
  toggleEditMode: () => void;
  getImage: (id: string, defaultSrc: string) => string;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// IndexedDB Configuration
const DB_NAME = 'RuralSV_Assets_DB';
const STORE_IMAGES = 'images';
const STORE_MOMENTS = 'moments';
const STORE_GOV_GALLERY = 'gov_gallery'; // New Store
// Upgrade version to force schema update
const DB_VERSION = 4; 

// --- Helper: IndexedDB Utilities ---

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      console.log(`[DB] Upgrading database to version ${DB_VERSION}...`);
      
      if (!db.objectStoreNames.contains(STORE_IMAGES)) {
        db.createObjectStore(STORE_IMAGES);
      }
      if (!db.objectStoreNames.contains(STORE_MOMENTS)) {
        db.createObjectStore(STORE_MOMENTS, { keyPath: 'id' });
      }
      // Create new store for Gov Gallery
      if (!db.objectStoreNames.contains(STORE_GOV_GALLERY)) {
        db.createObjectStore(STORE_GOV_GALLERY, { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => {
      console.error("[DB] Open Error:", event.target.error);
      reject(event.target.error);
    };
  });
};

const saveToDB = async (storeName: string, key: string | undefined, data: any) => {
  try {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = key ? store.put(data, key) : store.put(data);
      
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
    });
  } catch (error) {
    console.error(`[DB] Transaction Error (${storeName}):`, error);
    throw error;
  }
};

const clearStore = async (storeName: string) => {
  try {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
    });
  } catch (error) {
    throw error;
  }
};

const loadAllFromDB = async (storeName: string): Promise<any> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      
      if (storeName === STORE_IMAGES) {
        const request = store.openCursor();
        const result: Record<string, string> = {};
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            result[cursor.key] = cursor.value;
            cursor.continue();
          } else {
            resolve(result);
          }
        };
        request.onerror = (e) => reject(e);
      } else {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = (e) => reject(e);
      }
    });
  } catch (error) {
    console.error(`[DB] Load Error (${storeName}):`, error);
    return storeName === STORE_IMAGES ? {} : [];
  }
};

// --- Helper: Image Compression ---

const compressImage = (file: File, quality = 0.7, maxWidth = 1280): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        } else {
            reject(new Error("Canvas context failed"));
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

// --- Provider Component ---

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [moments, setMoments] = useState<GuestMoment[]>([]);
  const [govGallery, setGovGallery] = useState<GalleryItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load everything from IndexedDB on mount
  useEffect(() => {
    const initData = async () => {
        try {
          const loadedImages = await loadAllFromDB(STORE_IMAGES);
          if (Object.keys(loadedImages).length > 0) setImages(loadedImages);

          const loadedMoments = await loadAllFromDB(STORE_MOMENTS);
          if (Array.isArray(loadedMoments)) {
             setMoments(loadedMoments.sort((a: GuestMoment, b: GuestMoment) => b.timestamp - a.timestamp));
          }

          const loadedGov = await loadAllFromDB(STORE_GOV_GALLERY);
          if (Array.isArray(loadedGov)) {
             setGovGallery(loadedGov.sort((a: GalleryItem, b: GalleryItem) => b.timestamp - a.timestamp));
          }
        } catch (e) {
          console.error("Failed to initialize DB data:", e);
        }
    };
    initData();
  }, []);

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  const getImage = (id: string, defaultSrc: string) => {
    return images[id] || defaultSrc;
  };

  const updateImage = async (id: string, file: File) => {
    try {
        const compressedBase64 = await compressImage(file, 0.8, 1600);
        setImages(prev => ({ ...prev, [id]: compressedBase64 }));
        await saveToDB(STORE_IMAGES, id, compressedBase64);
    } catch (e) {
        console.error("Failed to update image", e);
        alert("图片存储失败，可能是文件过大。");
    }
  };

  const addMoment = async (momentData: Omit<GuestMoment, 'image'>, file: File) => {
      try {
          const compressedBase64 = await compressImage(file, 0.7, 1024); 
          const newMoment: GuestMoment = { ...momentData, image: compressedBase64 };
          setMoments(prev => [newMoment, ...prev]);
          await saveToDB(STORE_MOMENTS, undefined, newMoment);
      } catch (e) {
          console.error("Failed to save moment", e);
          throw new Error("保存失败");
      }
  };

  // --- New: Batch Upload for Gov Gallery ---
  const addGovGalleryImages = async (files: FileList) => {
    try {
      const newItems: GalleryItem[] = [];
      const promises = Array.from(files).map(async (file) => {
         const compressed = await compressImage(file, 0.7, 1024);
         const item: GalleryItem = {
           id: `gov-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
           image: compressed,
           timestamp: Date.now()
         };
         newItems.push(item);
         // Save individually to DB
         await saveToDB(STORE_GOV_GALLERY, undefined, item);
      });

      await Promise.all(promises);
      
      // Update state once all processed
      setGovGallery(prev => [...newItems, ...prev]);
    } catch (e) {
      console.error("Batch upload failed", e);
      throw new Error("批量上传部分或全部失败");
    }
  };

  const clearGovGallery = async () => {
    try {
      await clearStore(STORE_GOV_GALLERY);
      setGovGallery([]);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <ImageContext.Provider value={{ 
      images, updateImage, getImage,
      moments, addMoment,
      govGallery, addGovGalleryImages, clearGovGallery,
      isEditMode, toggleEditMode 
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useGlobalImages = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useGlobalImages must be used within an ImageProvider');
  }
  return context;
};