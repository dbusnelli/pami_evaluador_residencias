import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRouter from './router/AppRouter'
import NavBar from './components/NavBar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <div className='container mt-2'>
      <AppRouter />
    </div>
  </StrictMode>,
)
