import React, { Suspense, lazy } from 'react';
import Hero from './components/Hero';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load other components
const Navbar = lazy(() => import('./components/Navbar'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="h-32 w-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black dark:bg-black light:bg-white">
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80')] opacity-[0.03] bg-repeat mix-blend-overlay pointer-events-none" />
        <main className="relative">
          <Suspense fallback={<LoadingFallback />}>
            <Navbar />
          </Suspense>

          <Hero />

          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Portfolio />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App