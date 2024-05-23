import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/main";
import { PrimeReactProvider } from "primereact/api";
import addProduct from "./pages/store/addProduct";
import BuyPage from "./pages/store/BuyPage";
import NotFound from "./pages/error/main";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import detailProduct from "./pages/store/detailProduct";
import Cart from "./pages/user/cart";
import BuyAccount from "./pages/store/BuyAccount";
import OrderPage from "./pages/store/orderPage";
import OrderProduct from "./pages/store/orderProduct";
import MenuAdmin from "./pages/dashboard/menu";
import EditProduct from "./pages/dashboard/editProduct";
import OrderList from "./pages/dashboard/orderList";
import DetailShow from "./pages/store/detailShow";
import SellPage from "./pages/store/sellProduct";

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: false }}>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Buy" Component={BuyPage} />
        <Route path="/Add" Component={addProduct} />
        <Route path="/detail/:id" Component={detailProduct} />
        <Route path="/detailShow/:id" Component={DetailShow} />
        <Route path="*" Component={NotFound} />
        <Route path="/cart" Component={Cart} />
        <Route path="/Buy/:id" Component={BuyAccount} />
        <Route path="/order/:id" Component={OrderProduct} />
        <Route path="/order/" Component={OrderPage} />
        <Route path="/dashboard" Component={MenuAdmin} />
        <Route path="/edit/:idAc" Component={EditProduct} />
        <Route path="/order-list" Component={OrderList} />
        <Route path="/sell" Component={SellPage} />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
