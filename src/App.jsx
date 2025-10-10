import { useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { refreshUserThunk } from './redux/auth/operations'
import { selectToken, selectIsRefresh } from './redux/auth/selectors'
import './App.css'

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'))
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))
const MedicineStorePage = lazy(() => import('./pages/MedicineStorePage/MedicineStorePage'))
const MedicinePage = lazy(() => import('./pages/MedicinePage/MedicinePage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage/CartPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

function App() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const isRefresh = useSelector(selectIsRefresh)

  useEffect(() => {
    // Sayfa yüklendiğinde token varsa kullanıcı bilgilerini getir
    if (token) {
      dispatch(refreshUserThunk())
    }
  }, [dispatch, token])

  if (isRefresh) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Loading...</p>
      </div>
    )
  }

  // Loading component
  const LoadingFallback = () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'var(--lightGray)'
    }}>
      <p style={{ fontSize: '18px', color: 'var(--black)' }}>Loading...</p>
    </div>
  )

  return (
    <div className="App">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={
            <>
              <Header pageType="home" />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/home" element={
            <>
              <Header pageType="home" />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/medicine-store" element={
            <>
              <Header pageType="other" />
              <MedicineStorePage />
              <Footer />
            </>
          } />
          <Route path="/medicine" element={
            <>
              <Header pageType="other" />
              <MedicinePage />
              <Footer />
            </>
          } />
          <Route path="/product" element={
            <>
              <Header pageType="other" />
              <ProductDetailPage />
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Header pageType="other" />
              <CartPage />
              <Footer />
            </>
          } />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={
            <>
              <Header pageType="other" />
              <NotFoundPage />
              <Footer />
            </>
          } />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
