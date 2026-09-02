import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    gadgetName: "",
    category: "",
    manufacturer: "",
    healthRating: "",
    techBrand: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let message = "";

    if (name === "gadgetName") {
      if (!value.trim()) {
        message = "Gadget name is required.";
      } else if (value.length < 3) {
        message = "Gadget name must be at least 3 characters.";
      }
    }

    if (name === "category" && !value) {
      message = "Please select a category.";
    }

    if (name === "manufacturer" && !value.trim()) {
      message = "Manufacturer is required.";
    }

    if (name === "healthRating") {
      if (!value) {
        message = "Health rating is required.";
      } else if (Number(value) < 1 || Number(value) > 100) {
        message = "Health rating must be between 1 and 100.";
      }
    }

    if (name === "techBrand" && !value.trim()) {
      message = "Tech brand name is required.";
    }

    if (name === "role" && !value) {
      message = "Please select a user role.";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.gadgetName.trim()) {
      newErrors.gadgetName = "Gadget name is required.";
    } else if (formData.gadgetName.length < 3) {
      newErrors.gadgetName =
        "Gadget name must be at least 3 characters.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = "Manufacturer is required.";
    }

    if (!formData.healthRating) {
      newErrors.healthRating = "Health rating is required.";
    } else if (
      Number(formData.healthRating) < 1 ||
      Number(formData.healthRating) > 100
    ) {
      newErrors.healthRating =
        "Health rating must be between 1 and 100.";
    }

    if (!formData.techBrand.trim()) {
      newErrors.techBrand = "Tech brand name is required.";
    }

    if (!formData.role) {
      newErrors.role = "Please select a user role.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Submitted:", formData);
    alert("Gadget added successfully!");
  };

  return (
    <div className="app">
      <div className="form-card">
        <h1>Tech Gadget Inventory Hub</h1>
        <p>Add a new gadget to the inventory.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Gadget Name</label>
            <input
              type="text"
              name="gadgetName"
              value={formData.gadgetName}
              onChange={handleChange}
              placeholder="Enter gadget name"
            />
            {errors.gadgetName && (
              <span className="error">{errors.gadgetName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Wearable">Wearable</option>
              <option value="Audio">Audio</option>
            </select>
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label>Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Enter manufacturer"
            />
            {errors.manufacturer && (
              <span className="error">{errors.manufacturer}</span>
            )}
          </div>

          <div className="form-group">
            <label>Health Rating</label>
            <input
              type="number"
              name="healthRating"
              value={formData.healthRating}
              onChange={handleChange}
              placeholder="1 - 100"
            />
            {errors.healthRating && (
              <span className="error">{errors.healthRating}</span>
            )}
          </div>

          <div className="form-group">
            <label>Tech Brand Name</label>
            <input
              type="text"
              name="techBrand"
              value={formData.techBrand}
              onChange={handleChange}
              placeholder="Enter tech brand"
            />
            {errors.techBrand && (
              <span className="error">{errors.techBrand}</span>
            )}
          </div>

          <div className="form-group">
            <label>User Role</label>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Engineer"
                  checked={formData.role === "Engineer"}
                  onChange={handleChange}
                />
                Engineer
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="Tester"
                  checked={formData.role === "Tester"}
                  onChange={handleChange}
                />
                Tester
              </label>
            </div>

            {errors.role && (
              <span className="error">{errors.role}</span>
            )}
          </div>

          <button type="submit">Add Gadget</button>
        </form>
      </div>
    </div>
  );
}

export default App;