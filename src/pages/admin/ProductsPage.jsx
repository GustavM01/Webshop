import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import ProductRow from "../../components/admin/products/ProductRow";
import ProductInfo from "../../components/admin/products/ProductInfo";
import Button from "../../components/ui/Button";
import { AnimatePresence, motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mode, setMode] = useState(null);
  const [productValues, setProductValues] = useState({});

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

  const emptyProduct = {
    name: "",
    price: "",
    // stock: 0,
    description: "",
    image: "",
  };

  useEffect(() => {
    if (mode === "edit") {
      setProductValues({ ...selectedProduct });
    } else if (mode === "add") {
      setProductValues(emptyProduct);
    }
  }, [mode, selectedProduct]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (mode === "edit") {
      await updateProduct(selectedProduct.id, productValues);
    }

    setMode(null);
    setProductValues(emptyProduct);
  };

  return (
    <div className="admin-page-container">
      <div className="admin-container">
        <div style={{ marginLeft: 40 }}>
          <h2 style={{ marginBlock: 10 }}>Products</h2>
          <p style={{ margin: 0 }}>Manage all products.</p>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setProductValues(emptyProduct);
              setMode("add");
            }}
            className={"add-product-btn"}
          >
            <Plus strokeWidth={1.6} /> Add product
          </Button>
        </div>
        <div className="admin-order-list-container">
          <div className="admin-order-list">
            <div
              style={{ margin: "10px 13px" }}
              className="admin-order-row-top flex-start"
            >
              <div className="admin-search-bar">
                <label htmlFor="searchProducts">
                  <Search size={20} />
                </label>
                <input
                  placeholder="Search products..."
                  id="searchProducts"
                  type="text"
                />
              </div>
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {splitProducts[currentPage]?.map((product, index) => (
                <motion.div
                  variants={childVariants}
                  key={index}
                  className="order-row product-row"
                >
                  <ProductRow
                    editClick={() => {
                      setSelectedProduct(product);
                      setMode("edit");
                    }}
                    key={product.id}
                    product={product}
                  />
                </motion.div>
              ))}
            </motion.div>
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
          <AnimatePresence>
            {(mode === "edit" || mode === "add") && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.2 }}
                className="product-side-info"
              >
                <ProductInfo
                  setMode={setMode}
                  product={selectedProduct}
                  mode={mode}
                  productValues={productValues}
                  setProductValues={setProductValues}
                  setSelectedProduct={setSelectedProduct}
                  handleSave={handleSave}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
