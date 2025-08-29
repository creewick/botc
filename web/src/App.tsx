import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import CharactersPage from './pages/CharactersPage'

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/characters" element={<CharactersPage />} />
     </Routes>
    </>
  )
}

export default App
