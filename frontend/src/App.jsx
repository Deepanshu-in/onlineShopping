import {BrowserRouter,Route,Routes} from 'react-router-dom';
import "./App.css";
import "react-toastify/dist/ReactToastify.css"
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Home from './components/Home'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
