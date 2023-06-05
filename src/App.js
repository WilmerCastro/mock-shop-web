import './App.css';
import LoginForm from "./pages/login-form";
import Products from "./pages/products/products";
import Orders from "./pages/orders";
import {Route, Routes} from "react-router";
import Layout from "./components/common/layout";
import {BrowserRouter} from "react-router-dom";
import NoPage from "./pages/not-found";
import {RecoilRoot} from "recoil";
import ProductDetails from "./pages/details/product-details";

function App() {
  return (
      <BrowserRouter>
          <RecoilRoot>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Products />} />
                      <Route path="login" element={<LoginForm />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="product/:id" element={<ProductDetails />} />
                      <Route path="*" element={<NoPage />} />
                  </Route>
              </Routes>
          </RecoilRoot>
      </BrowserRouter>
  )
}

export default App;
