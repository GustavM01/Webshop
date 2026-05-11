import React, { useEffect } from "react";
import "./ProductInfo.css";
import { Upload, X } from "lucide-react";
import Button from "../../ui/Button";
import { useProducts } from "../../../context/ProductContext";

function ProductInfo({
  product,
  mode,
  setMode,
  productValues,
  setProductValues,
  setSelectedProduct,
  handleSave,
}) {
  const { loading } = useProducts();
  return (
    <div className="product-info-container">
      <div className="flex-start-end">
        {mode === "edit" ? (
          <h3 style={{ margin: 10 }}>Editing {product?.name}</h3>
        ) : (
          <h3 style={{ margin: 10 }}>Adding new product</h3>
        )}
        <X
          className="product-info-close-btn"
          onClick={() => {
            setMode(null);
            setSelectedProduct(null);
          }}
        />
      </div>

      <form onSubmit={handleSave} className="product-info-form">
        <label
          className={product?.image ? "image-uploader-edit" : "image-uploader"}
          htmlFor="image-input"
        >
          <input
            required={mode === "add"}
            name="productImage"
            accept="image/png, .png, image/jpg, .jpg, image/webp, .webp"
            // accept="image/png"
            className="image-input"
            type="file"
            id="image-input"
          ></input>
          {product?.image ? (
            <>
              <img alt="Product image" src={productValues.image} />
            </>
          ) : (
            <>
              <Upload />
              <p>Upload image</p>
              <p className="label">PNG, JPG or WEBP</p>
            </>
          )}
        </label>
        <label className="header" htmlFor="productName">
          Name
        </label>
        <input
          name="productName"
          required
          className="form-input"
          type="text"
          placeholder="Product name"
          value={productValues.name}
          onChange={(e) =>
            setProductValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <label htmlFor="price" className="header">
          Price (SEK)
        </label>
        <input
          required
          className="form-input"
          name="productPrice"
          id="price"
          value={productValues.price}
          placeholder="0.00"
          min={0}
          onChange={(e) =>
            setProductValues((prev) => ({ ...prev, price: e.target.value }))
          }
          type="number"
        />

        <label htmlFor="description" className="header">
          Description
        </label>
        <textarea
          required
          className="form-input"
          name="productDescription"
          id="description"
          rows={4}
          value={productValues.description}
          onChange={(e) =>
            setProductValues((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Product description"
        ></textarea>
        <div style={{ gap: 10 }} className="flex-end">
          <Button
            style={{
              width: "50%",
              borderRadius: "8px",
            }}
            className="btn-light"
            onClick={() => {
              setMode(null);
              setSelectedProduct(null);
            }}
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            type="submit"
            style={{ width: "50%", borderRadius: "8px" }}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductInfo;
