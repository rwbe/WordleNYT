// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Wordle from './pages/Game/Wordle'
import Lobby from './pages/Menu/Lobby'// Importe o componente Lobby
import './App.css'
import useFetchWords from './hooks/useFetchWords'

function App () {
  const { words } = useFetchWords(5)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/wordle" element={<Wordle words={words} />} />
      </Routes>
    </Router>
  )
}

export default App
