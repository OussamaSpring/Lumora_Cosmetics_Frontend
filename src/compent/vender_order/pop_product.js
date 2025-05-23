"use client";
import { useState, useEffect } from "react";
import "./pop_product.css";
import { CiImageOff } from "react-icons/ci";
import image from "./assest/image_forget.jpg";
const ProductItemForm = ({ onSave, onCancel, itemNumber, initialData }) => {
  const [productImage, setProductImage] = useState(null);
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
    productCode: "",
    originalPrice: "",
    stockQuantity: "",
    discountRate: "",
    expirationDate: "",
    attributes: [
      { id: 1, name: "Attribute 1", value: "" },
      { id: 2, name: "Attribute 2", value: "" },
      { id: 3, name: "Attribute 3", value: "" },
    ],
  });

  // Initialize form with data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.image) {
        setProductImage(initialData.image);
      }
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImage(e.target.result);
        setFormData((prev) => ({
          ...prev,
          image: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addAttribute = () => {
    const newId =
      formData.attributes.length > 0
        ? Math.max(...formData.attributes.map((attr) => attr.id)) + 1
        : 1;

    setFormData((prev) => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        { id: newId, name: `Attribute ${newId}`, value: "" },
      ],
    }));
  };

  const handleAttributeChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.map((attr) =>
        attr.id === id ? { ...attr, [field]: value } : attr
      ),
    }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="product-item-container">
      {/* <div className="product-item-header">
        <div className="header-pill">Product item</div>
      </div> */}

      <div className="product-item-content">
        <div className="product-details">
          <div className="form-row">
            <div className="form-group">
              <span htmlFor="length">Length</span>
              <input
                type="text"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                placeholder="Length"
              />
            </div>
            <div className="form-group">
              <span htmlFor="width">Width</span>
              <input
                type="text"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                placeholder="Width"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <span htmlFor="height">Height</span>
              <input
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Height"
              />
            </div>
            <div className="form-group">
              <span htmlFor="weight">Weight</span>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Weight"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <span htmlFor="productCode">Product code</span>
              <input
                type="text"
                id="productCode"
                name="productCode"
                value={formData.productCode}
                onChange={handleInputChange}
                placeholder="Product code"
              />
            </div>
            <div className="form-group">
              <span htmlFor="originalPrice">Original Price</span>
              <input
                type="text"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="Original Price"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <span htmlFor="stockQuantity">Stock Quantity</span>
              <input
                type="text"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                placeholder="Stock Quantity"
              />
            </div>
            <div className="form-group">
              <span htmlFor="discountRate">Discount rate</span>
              <input
                type="text"
                id="discountRate"
                name="discountRate"
                value={formData.discountRate}
                onChange={handleInputChange}
                placeholder="Discount rate"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <sapn htmlFor="expirationDate">Expiration Date</sapn>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="product-image-section">
          <h3>Image Product</h3>
          <p className="image-note">
            Note : Format photos SVG, PNG, or JPG (Max size 4mb)
          </p>

          <div className="image-upload-container">
            {productImage ? (
              <div className="product-image-preview-container">
                <img
                  src={productImage || image}
                  alt="Product"
                  className="product-image-preview"
                />
              </div>
            ) : (
              <div className="image-placeholder">
                <img
                  src={image}
                  alt="Product placeholder"
                  className="image_forget"
                />
              </div>
            )}
           
           
          </div>
          <input
              type="file"
              id="productImage"
              accept="image/svg+xml,image/png,image/jpeg"
              onChange={handleImageChange}
              className="btn_uplode"
            />

          

          <div className="attributes-section">
            {formData.attributes.map((attr) => (
              <div className="attribute-item" key={attr.id}>
                <span htmlFor={`attribute-${attr.id}`}>{attr.name}</span>
                <input
                  type="text"
                  id={`attribute-${attr.id}`}
                  placeholder={attr.name}
                  value={attr.value}
                  onChange={(e) =>
                    handleAttributeChange(attr.id, "value", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              type="button"
              className="add-attribute-btn"
              onClick={addAttribute}
            >
              Add an attribute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemForm;
