import { UserPass } from '../types';

const STORAGE_KEY = 'rural_sv_passes';

// Helper to generate a unique Silicon Valley Pass ID
// Format: SVP-YYYY-XXXX-XXXX (e.g., SVP-2024-A9D2-X1Y0)
const generatePassId = (): string => {
  const year = new Date().getFullYear();
  const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const segment2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SVP-${year}-${segment1}-${segment2}`;
};

// Get all users from local storage
export const getAllPasses = (): UserPass[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load passes", e);
    return [];
  }
};

// Create a new pass
export const mintPass = (name: string, email: string, password: string): UserPass => {
  const passes = getAllPasses();
  
  // Check if email already exists
  if (passes.find(p => p.email === email)) {
    throw new Error("该邮箱已被注册绑定");
  }

  const newPass: UserPass = {
    id: generatePassId(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
    // Random geometric avatar for the pass
    avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${name}${Date.now()}`
  };

  passes.push(newPass);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passes));
  return newPass;
};

// Verify credentials
export const verifyPass = (passId: string, password: string): UserPass | null => {
  const passes = getAllPasses();
  const user = passes.find(p => p.id === passId && p.password === password);
  return user || null;
};

// Reset Password
export const resetPassword = (passId: string, email: string, newPassword: string): boolean => {
  const passes = getAllPasses();
  const index = passes.findIndex(p => p.id === passId && p.email === email);
  
  if (index === -1) {
    return false; // ID and Email combination not found
  }

  passes[index].password = newPassword;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passes));
  return true;
};

// For demo: initialize with a dummy admin account if empty
export const initDemoData = () => {
  const passes = getAllPasses();
  if (passes.length === 0) {
    mintPass("Admin User", "admin@ruralsv.com", "admin123");
  }
};