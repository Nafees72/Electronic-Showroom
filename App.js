
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Route ,Routes} from 'react-router-dom';
import Products from './components/Products';
import ProductById from './components/ProductById';
import SingleProduct from './components/SingleProduct';
import Loading from './Loading';
import DisplaySearchResult from './DisplaySearchResult';
import Basket from './Basket';



function App() {
  
  return (
      <>
         <Navbar/>
         <Sidebar/> 
         <Routes>
          <Route path="/" element={<> <Loading style={{marginLeft:'100px'}} />        <Products/></>} />
          <Route path = "/products/:id" element={<ProductById/>}/>
          <Route path = "/products/:id/:cid" element={<SingleProduct/>}/>
          <Route path = "/search/:value" element={<DisplaySearchResult/>}/>
          <Route path="/uu" element={    <Loading style={{margin:'500px'}} />}/>
          <Route path = "/basket" element={<Basket/>}/>
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path = {`products?id= ${params.id}`} element={<ProductById id = {params.id}/>} ></Route> */}
        </Routes>


        {/* <Loading style={{marginLeft:'100px'}} /> */}

      </>
  );
}

export default App;
