import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, APP_NAME } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';
import { Page } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const { navigate, currentPage } = useRouter();
  const handleLogoClick = (e: React.MouseEvent) => {
    // If not on home, navigate home
    if (currentPage !== 'home') {
       handleNavigation(e, { href: 'home', isPage: true });
       return;
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleNavigation = (e: React.MouseEvent<HTMLElement>, item: { href: string, isPage?: boolean }) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (item.isPage) {
      navigate(item.href as Page);
    } else {
      // If we are not on home, go home first, then scroll
      if (currentPage !== 'home') {
        navigate('home');
        // Small delay to allow home to render
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer select-none" onClick={handleLogoClick}>
            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 transition-colors duration-300">
              <div className="w-6 h-6 rounded-full transition-colors duration-300 bg-black dark:bg-white"></div>
              {APP_NAME}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(e, item)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  (item.isPage && currentPage === item.href) 
                    ? 'text-black dark:text-white font-semibold' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <div className="h-4 w-px bg-gray-300 dark:bg-white/20 mx-2"></div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Auth Buttons */}
            <button 
              onClick={() => navigate('auth')}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              登录
            </button>

            <button 
              onClick={() => navigate('auth')}
              className="bg-black dark:bg-white text-white dark:text-black text-sm font-medium px-5 py-2 rounded-full hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              注册 <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleTheme}
              className="p-2 text-gray-900 dark:text-white"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/10"
        >
          <div className="px-6 py-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-lg font-medium text-gray-900 dark:text-white"
                onClick={(e) => handleNavigation(e, item)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-4">
              <button 
                onClick={() => { setIsOpen(false); navigate('auth'); }}
                className="block w-full text-left text-lg font-medium text-gray-900 dark:text-white"
              >
                登录
              </button>
              <button 
                onClick={() => { setIsOpen(false); navigate('auth'); }}
                className="w-full bg-black dark:bg-white text-white dark:text-black text-lg font-medium px-5 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                注册账户
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;