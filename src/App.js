import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Head from "./compent/head/Head";
import Products from './compent/product/Products';
import ProductDetails from './compent/product/ProductDetails';
import Main_sw from './compent/main_swiper/Main_sw';
import Man_women from './compent/man_women_child/Man_women';
import Pro_search from './compent/product/Pro_search';
import Cart from './compent/cart/Cart';
import Profile from './compent/profile_setting/ProfilePage';
import ProfilePage from './compent/profile_setting/ProfilePage';
import SimpleFooter from './compent/fotter/SimpleFooter';
import AuthForm from './compent/login_register/Auto_form/AuthForm';
import Main_definition from './compent/Definition/Main_definition';
import useAuth from './compent/login_register/Auto_form/useAuth';
import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

function App() {
  const [search, setSearch] = useState("");
  // const { user, isAuthenticated } = useAuth();
  const [token,setToken]=useState(localStorage.getItem('accessToken') ?? null);


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
              {!search?.trim() ? (
                <>
                  <Main_sw />
                  <Man_women />
                  <Products />
                  <Main_definition/>
                  <SimpleFooter/>
                </>
              ) : (
                <Pro_search search={search} />
              )}
            </>
          }
        />
        
        <Route path="/login" element={<AuthForm active="login" token={token} setToken={setToken}/>} />
        <Route path="/sign" element={<AuthForm active="signup" token={token} setToken={setToken}/>} />
        
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Head/>
              <Cart />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/product/:productId"
          element={<ProductDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;