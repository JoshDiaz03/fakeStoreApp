
import './App.css'
import AddProduct from './components/AddProduct'
import Home from './components/Home'
import NavigationBar from './components/NavigationBar'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import EditProduct from './components/EditProduct';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  

  return (
    <>
      
      <NavigationBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/products" element={<ProductList/>}></Route>
          <Route path="/products/:id" element={<ProductDetails/>}></Route>
          <Route path="/addproduct" element={<AddProduct/>}></Route>
          <Route path="/editproduct" element={<EditProduct/>}></Route>
        </Routes>
      </Router>
     
    </>
  )
}

export default App


