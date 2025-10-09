import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import LoginPage from './pages/LoginPage/LoginPage'
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
            <main style={{ padding: '20px', minHeight: '60vh' }}>
              <h1>Medicine Store</h1>
              <p>Browse our medicine stores.</p>
            </main>
            <Footer />
          </>
        } />
        <Route path="/medicine" element={
          <>
            <Header pageType="other" />
            <main style={{ padding: '20px', minHeight: '60vh' }}>
              <h1>Medicine</h1>
              <p>Find your medicines here.</p>
            </main>
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
