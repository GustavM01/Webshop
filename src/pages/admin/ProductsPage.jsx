import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import ProductRow from "../../components/admin/products/ProductRow";

function ProductsPage() {
  const { products } = useProducts();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  const pages = Math.ceil(products.length / productsPerPage);

  const startProduct = currentPage * productsPerPage + 1;

  const endProduct = Math.min(
    (currentPage + 1) * productsPerPage,
    products.length,
  );

  const splitProducts = [];

  for (let i = 0; i < products.length; i += 8) {
    splitProducts.push(products.slice(i, i + 8));
  }
  return (
    <div className="admin-page-container">
      <div className="admin-container">
        <div style={{ marginLeft: 40 }}>
          <h2 style={{ marginBlock: 10 }}>Products</h2>
          <p style={{ margin: 0 }}>Manage all products.</p>
        </div>
        <div className="admin-order-list-container">
          <div className="admin-order-list">
            <div
              style={{ margin: 10 }}
              className="admin-order-row-top flex-start"
            >
              <input placeholder="Search products..." type="text" />
            </div>
            <div className="admin-order-row admin-order-row-header">
              <div style={{ flex: 0.1 }}>
                <input className="admin-order-checkbox" type="checkbox" />
              </div>
              <div style={{ flex: 1.3, minWidth: 240 }}>
                <p>Product</p>
              </div>
              <div style={{ flex: 0.8 }}>
                <p>Price</p>
              </div>
              <div style={{ flex: 1 }}>
                <p>Stock</p>
              </div>
              <div style={{ flex: 0.8 }}>
                <p>Status</p>
              </div>
              <div style={{ flex: 0.3, minWidth: 80 }}>
                <p>Actions</p>
              </div>
            </div>
            {splitProducts[currentPage]?.map((order, index) => (
              <div key={index} className="order-row product-row">
                <ProductRow key={order.id} product={order} />
              </div>
            ))}
            <div className="admin-order-row-footer flex-start-end">
              <p>
                Showing {startProduct}-{endProduct} out of {products.length}{" "}
                products
              </p>
              <div className="flex-row page-selector">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => (prev != 0 ? prev - 1 : prev))
                  }
                >
                  <ChevronLeft strokeWidth={1.5} />
                </button>
                <p>{currentPage + 1}</p>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < splitProducts.length - 1 ? prev + 1 : prev,
                    )
                  }
                >
                  <ChevronRight strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
