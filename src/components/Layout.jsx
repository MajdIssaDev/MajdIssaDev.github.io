import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <div className="page">
      <div className="bg-halftone" aria-hidden="true" />
      <div className="bg-glow bg-glow-a" aria-hidden="true" />
      <div className="bg-glow bg-glow-b" aria-hidden="true" />

      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
