import React, { createContext, useContext, useEffect, useState } from 'react';
import { GuestMoment } from '../types';
import { USE_DEFAULT_IMAGES, PLACEHOLDER_DATA_URL } from '../constants';

// New Type for simple gallery items
export interface GalleryItem {
  id: string;
  image: string;
  timestamp: number;
}

interface ImageContextType {
  images: Record<string, string>;
  updateImage: (id: string, file: File) => Promise<void>;
  setImageURL: (id: string, url: string) => void;
  
  moments: GuestMoment[];
  addMoment: (moment: Omit<GuestMoment, 'image'>, file: File) => Promise<void>;
  
  // New: Government Gallery Data
  govGallery: GalleryItem[];
  addGovGalleryImages: (files: FileList) => Promise<void>;
  clearGovGallery: () => Promise<void>;
  getImage: (id: string, defaultSrc: string) => string;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// IndexedDB Configuration
const DB_NAME = 'RuralSV_Assets_DB';
const STORE_IMAGES = 'images';
const STORE_MOMENTS = 'moments';
const STORE_GOV_GALLERY = 'gov_gallery'; // New Store
// Upgrade version to force schema update
const DB_VERSION = 5; 

// LocalStorage Keys (fallback / mirror)
const LS_IMAGES_KEY = 'ruralsv_images_v1';
const LS_MOMENTS_KEY = 'ruralsv_moments_v1';
const LS_GOV_KEY = 'ruralsv_gov_gallery_v1';
const RESET_FLAG_KEY = 'ruralsv_assets_reset_v2_done';

const loadFromLS = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const saveToLS = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota or serialization errors silently
  }
};

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

  // Build-base-aware helper to normalize public URLs
  const withBase = (u: string) => {
    const base = (import.meta as any).env?.BASE_URL || '/';
    if (!u) return u;
    if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:') || u.startsWith('blob:')) return u;
    const trimmed = u.replace(/^\//, '');
    return `${base}${trimmed}`;
  };

  // One-time purge to clear all cached assets (IndexedDB + LocalStorage)
  useEffect(() => {
    const purgeOnce = async () => {
      const done = localStorage.getItem(RESET_FLAG_KEY);
      if (done) return;
      try {
        await clearStore(STORE_IMAGES);
        await clearStore(STORE_MOMENTS);
        await clearStore(STORE_GOV_GALLERY);
      } catch (e) {
        console.error('Purge cache failed', e);
      }
      localStorage.removeItem(LS_IMAGES_KEY);
      localStorage.removeItem(LS_MOMENTS_KEY);
      localStorage.removeItem(LS_GOV_KEY);
      localStorage.setItem(RESET_FLAG_KEY, '1');
      setImages({});
      setMoments([]);
      setGovGallery([]);
    };
    purgeOnce();
  }, []);

  // Load everything from mapping + IndexedDB/LS on mount
  useEffect(() => {
    const initData = async () => {
        try {
          // 0) Load images directly from local folder 白山云 by filename -> id mapping
          try {
            const folderImgs: Record<string, string> = (import.meta as any).glob(
              '../白山云/**/*.{png,jpg,jpeg,webp}',
              { eager: true, import: 'default' }
            );
            const entries = Object.entries(folderImgs);
            if (entries.length) {
              const byId: Record<string, string> = {};
              for (const [p, url] of entries) {
                const base = p.split('/').pop() || '';
                const id = base.replace(/\.[^.]+$/, '');
                if (id) byId[id] = url as unknown as string;
              }
              if (Object.keys(byId).length) {
                setImages(prev => {
                  const next = { ...prev, ...byId };
                  saveToLS(LS_IMAGES_KEY, next);
                  return next;
                });
              }
            }
          } catch (e) {
            // ignore glob errors
          }
          // 1) Try load static mapping file generated by upload server
          try {
            const base = (import.meta as any).env?.BASE_URL || '/';
            const mapUrl = `${base}uploads/images-map.json`;
            const resp = await fetch(mapUrl, { cache: 'no-cache' });
            if (resp.ok) {
              const json = await resp.json();
              if (json && typeof json === 'object') {
                setImages(prev => {
                  const next = { ...prev, ...json } as Record<string, string>;
                  saveToLS(LS_IMAGES_KEY, next);
                  return next;
                });
              }
            }
          } catch {}

          const loadedImages = await loadAllFromDB(STORE_IMAGES);
         if (Object.keys(loadedImages).length > 0) {
          setImages(loadedImages);
          saveToLS(LS_IMAGES_KEY, loadedImages);
         } else {
          const fromLS = loadFromLS<Record<string, string>>(LS_IMAGES_KEY, {});
          if (Object.keys(fromLS).length > 0) setImages(fromLS);
         }

          const loadedMoments = await loadAllFromDB(STORE_MOMENTS);
         if (Array.isArray(loadedMoments)) {
           const sorted = loadedMoments.sort((a: GuestMoment, b: GuestMoment) => b.timestamp - a.timestamp);
           setMoments(sorted);
           if (sorted.length) saveToLS(LS_MOMENTS_KEY, sorted);
         } else {
           const fromLS = loadFromLS<GuestMoment[]>(LS_MOMENTS_KEY, []);
           if (fromLS.length) setMoments(fromLS);
         }

          const loadedGov = await loadAllFromDB(STORE_GOV_GALLERY);
         if (Array.isArray(loadedGov)) {
           const sortedGov = loadedGov.sort((a: GalleryItem, b: GalleryItem) => b.timestamp - a.timestamp);
           setGovGallery(sortedGov);
           if (sortedGov.length) saveToLS(LS_GOV_KEY, sortedGov);
         } else {
           const fromLS = loadFromLS<GalleryItem[]>(LS_GOV_KEY, []);
           if (fromLS.length) setGovGallery(fromLS);
         }
        } catch (e) {
          console.error("Failed to initialize DB data:", e);
         // Hard fallback to LocalStorage in case IndexedDB is unavailable
         const lsImages = loadFromLS<Record<string, string>>(LS_IMAGES_KEY, {});
         if (Object.keys(lsImages).length) setImages(lsImages);
         const lsMoments = loadFromLS<GuestMoment[]>(LS_MOMENTS_KEY, []);
         if (lsMoments.length) setMoments(lsMoments);
         const lsGov = loadFromLS<GalleryItem[]>(LS_GOV_KEY, []);
         if (lsGov.length) setGovGallery(lsGov);
        }
    };
    initData();
  }, []);

  const getImage = (id: string, defaultSrc: string) => {
    if (images[id]) return withBase(images[id]);
    return USE_DEFAULT_IMAGES ? defaultSrc : PLACEHOLDER_DATA_URL;
  };

  const updateImage = async (id: string, file: File) => {
    try {
        const compressedBase64 = await compressImage(file, 0.8, 1600);
        setImages(prev => {
          const next = { ...prev, [id]: compressedBase64 };
          saveToLS(LS_IMAGES_KEY, next);
          return next;
        });
        await saveToDB(STORE_IMAGES, id, compressedBase64);
    } catch (e) {
        console.error("Failed to update image", e);
        alert("图片存储失败，可能是文件过大。");
    }
  };

  const setImageURL = (id: string, url: string) => {
    setImages(prev => {
      const next = { ...prev, [id]: url };
      saveToLS(LS_IMAGES_KEY, next);
      // 不写入 IndexedDB，保留为 URL 即可
      return next;
    });
  };

  const addMoment = async (momentData: Omit<GuestMoment, 'image'>, file: File) => {
      try {
          const compressedBase64 = await compressImage(file, 0.7, 1024); 
          const newMoment: GuestMoment = { ...momentData, image: compressedBase64 };
          setMoments(prev => {
          const next = [newMoment, ...prev];
          saveToLS(LS_MOMENTS_KEY, next);
          return next;
          });
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
      setGovGallery(prev => {
        const next = [...newItems, ...prev];
        saveToLS(LS_GOV_KEY, next);
        return next;
      });
    } catch (e) {
      console.error("Batch upload failed", e);
      throw new Error("批量上传部分或全部失败");
    }
  };

  const clearGovGallery = async () => {
    try {
      await clearStore(STORE_GOV_GALLERY);
      setGovGallery([]);
      saveToLS(LS_GOV_KEY, []);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <ImageContext.Provider value={{ 
      images, updateImage, setImageURL, getImage,
      moments, addMoment,
      govGallery, addGovGalleryImages, clearGovGallery,
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