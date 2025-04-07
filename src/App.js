import Login_registre from './compent/login_register/login/Login_registre'
import Sign_up from "./compent/login_register/sign/Sign_up"
import Head from "./compent/head/Head"
import { useState, useEffect } from 'react';
import Test from './compent/login_register/test/Test';
import Product from './compent/product/Product';
import Products from './compent/product/Products';
import ProductDetails from './compent/product/ProductDetails';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Mesage_send_to_email from './compent/login_register/mesage_send_to_email/Mesage_send_to_email'
import Forget from './compent/login_register/forget/Forget';
import New_pasword_home from './compent/login_register/new_pasword/New_pasword';
import Final_conferme from './compent/login_register/final_conferme/Final_conferme';
import Main_sw from './compent/main_swiper/Main_sw';
import Man_women from './compent/man_women_child/Man_women';
import Pro_search from './compent/product/Pro_search';
import Cart from './compent/cart/Cart';

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [search, setSearch] = useState("");
  
  // This function will handle updating the search state
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Head search={search} setsearch={handleSearch} />
              
              {/* Conditional rendering based on search value */}
              {!search || search.trim() === "" ? (
                // If search is empty, show these components
                <>
                  <Main_sw />
                  <Man_women />
                  <Products />
                </>
              ) : (
                // If search has a value, show search results
                <Pro_search search={search} />
              )}
            </>
          }
        />

        <Route
          path="/login"
          element={<Login_registre token={token} setToken={setToken} />}
        />

        <Route
          path="/forget"
          element={<Forget />}
        />

        <Route
          path="/cart"
          element={
            <>
            <Head/>
            <Cart />
            </>
          }
          
        />

        <Route
          path="/sign"
          element={<Sign_up />}
        />

        <Route
          path="/mesage_send"
          element={<Mesage_send_to_email/>}
        />

        <Route
          path="/Final_conferme"
          element={<Final_conferme/>}
        /> 

        <Route
          path="/product/:productId"
          element={<ProductDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;