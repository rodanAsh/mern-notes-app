import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/Main/MainPage'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'

// Route setup
const routes = (
  <Router>
    <Routes>
      <Route path='/' index element={<MainPage />} />
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<SignUp />} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <main>
      {routes}
    </main>
  )
}

export default App