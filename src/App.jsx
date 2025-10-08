import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
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
            <main style={{ padding: '20px' }}>
              <h1>Welcome to E-Pharmacy</h1>
              <p>Header component is working! You can test login/logout functionality.</p>
            </main>
          </>
        } />
        <Route path="/home" element={
          <>
            <Header pageType="home" />
            <main style={{ padding: '20px' }}>
              <h1>Home Page</h1>
              <p>This is the home page with green header background.</p>
            </main>
          </>
        } />
        <Route path="/medicine-store" element={
          <>
            <Header pageType="other" />
            <main style={{ padding: '20px' }}>
              <h1>Medicine Store</h1>
              <p>Browse our medicine stores.</p>
            </main>
          </>
        } />
        <Route path="/medicine" element={
          <>
            <Header pageType="other" />
            <main style={{ padding: '20px' }}>
              <h1>Medicine</h1>
              <p>Find your medicines here.</p>
            </main>
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
