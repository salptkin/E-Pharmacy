import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import LoginPage from './pages/LoginPage/LoginPage'
import MedicineStorePage from './pages/MedicineStorePage/MedicineStorePage'
import MedicinePage from './pages/MedicinePage/MedicinePage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import CartPage from './pages/CartPage/CartPage'
import { refreshUserThunk } from './redux/auth/operations'
import { selectToken, selectIsRefresh } from './redux/auth/selectors'
import './App.css'

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

  return (
    <div className="App">
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
      </Routes>
    </div>
  )
}

export default App
