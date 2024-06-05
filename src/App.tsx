import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductItemPage from "./pages/ProductItemPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductModifyPage from "./pages/ProductModifyPage";
import ProductPurchasePage from "./pages/ProductPurchasePage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/common/Layout";
import CartPage from "./pages/CartPage";
import Responsive from "./components/common/Responsive";

function App() {
  return (
    <Responsive>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/create" element={<ProductCreatePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductItemPage />} />
          <Route
            path="/purchase/:productId"
            element={<ProductPurchasePage />}
          />
          <Route path="/modify/:productId" element={<ProductModifyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Responsive>
  );
}

export default App;
