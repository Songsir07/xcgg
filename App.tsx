import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Accommodation from './components/Accommodation';
import BentoGrid from './components/BentoGrid';
import Services from './components/Services';
import GitHubWindow from './components/GitHubWindow';
import MicroOpsBar from './components/MicroOpsBar';
import HallOfFame from './components/HallOfFame';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import NewsPage from './components/NewsPage';
import AuthPage from './components/AuthPage';
import PassVault from './components/PassVault';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ImageProvider } from './context/ImageContext';

// Separate component to use the router context
function MainContent() {
  const { currentPage } = useRouter();

  // If on Auth or Vault page, render strictly that component (no Navbar/Footer for immersion)
  if (currentPage === 'auth') {
    return <AuthPage />;
  }
  
  if (currentPage === 'vault') {
    return <PassVault />;
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Accommodation />
            <BentoGrid />
            <Impact />
            <Services />
            <MicroOpsBar />
            <GitHubWindow />
          </>
        ) : currentPage === 'hall-of-fame' ? (
          <HallOfFame />
        ) : (
          <NewsPage />
        )}
      </main>
      <AIChat />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ImageProvider>
        <RouterProvider>
          <MainContent />
        </RouterProvider>
      </ImageProvider>
    </ThemeProvider>
  );
}

export default App;