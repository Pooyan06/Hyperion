import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import CustomCursor from './Components/CustomCursor';

// ✅ Lazy load صفحات (کد اسپلیتینگ)
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Product = lazy(() => import('./pages/Product'));

// ✅ Loader ساده و سبک
function LoadingScreen() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#000205] text-blue-50'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-400 border-t-transparent'></div>
        <p className='text-sm text-blue-100/80'>Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />

      {/* 🔹 Suspense برای کنترل نمایش لودر هنگام lazy load */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='product' element={<Product />} />
            <Route path='gallery' element={<Gallery />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
