import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import WritingIndex from './pages/WritingIndex.jsx'
import WritingPost from './pages/WritingPost.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<WritingIndex />} />
          <Route path="/writing/:slug" element={<WritingPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
