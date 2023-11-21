import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

function App() {
  return (
    <>
      <Nav />
      <section className="container px-4 mx-auto mt-8">
        <Outlet />
      </section>
      <Footer />
    </>
  )
}

export default App
