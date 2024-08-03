import { useState } from 'react'
import './App.css'
import Login from './components/login'

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false)

  const handleLogin = () => {
    setIsLogedIn(true)
  }

  return (
    <>
      {isLogedIn? (
      <h1>欢迎使用兴趣圈</h1>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
