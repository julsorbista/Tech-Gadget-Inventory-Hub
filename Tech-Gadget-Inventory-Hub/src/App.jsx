import { useState } from "react";
import "./App.css";

function App() {
  const [gadgetName, setGadgetName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [techBrand, setTechBrand] = useState("");
  const [role, setRole] = useState("");

  const [gadgetNameError, setGadgetNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [manufacturerError, setManufacturerError] = useState("");
  const [healthRatingError, setHealthRatingError] = useState("");
  const [techBrandError, setTechBrandError] = useState("");
  const [roleError, setRoleError] = useState("");

  function handleGadgetName(event) {
    const value = event.target.value;
    setGadgetName(value);
    if (value.trim() === "") {
      setGadgetNameError("Please provide a gadget name.");
    } else if (value.trim().length < 3) {
      setGadgetNameError("Enter at least 3 characters for the gadget name.");
    } else {
      setGadgetNameError("");
    }
  }

  function handleCategory(event) {
    const value = event.target.value;
    setCategory(value);
    if (value === "") {
      setCategoryError("Choose a gadget category.");
    } else {
      setCategoryError("");
    }
  }

  function handleManufacturer(event) {
    const value = event.target.value;
    setManufacturer(value);
    if (value.trim() === "") {
      setManufacturerError("Please provide the manufacturer.");
    } else {
      setManufacturerError("");
    }
  }

  function handleHealthRating(event) {
    const value = event.target.value;
    setHealthRating(value);
    if (value === "") {
      setHealthRatingError("Please enter a health rating.");
    } else if (Number(value) < 1 || Number(value) > 100) {
      setHealthRatingError("Enter a health rating from 1 to 100.");
    } else {
      setHealthRatingError("");
    }
  }

  function handleTechBrand(event) {
    const value = event.target.value;
    setTechBrand(value);
    if (value.trim() === "") {
      setTechBrandError("Please provide the tech brand.");
    } else {
      setTechBrandError("");
    }
  }

  function handleRole(event) {
    setRole(event.target.value);
    setRoleError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    let formIsValid = true;

    if (gadgetName.trim() === "") {
      setGadgetNameError("Please provide a gadget name.");
      formIsValid = false;
    } else if (gadgetName.trim().length < 3) {
      setGadgetNameError("Enter at least 3 characters for the gadget name.");
      formIsValid = false;
    }

    if (category === "") {
      setCategoryError("Choose a gadget category.");
      formIsValid = false;
    }

    if (manufacturer.trim() === "") {
      setManufacturerError("Please enter the manufacturer.");
      formIsValid = false;
    }

    if (healthRating === "") {
      setHealthRatingError("Please enter a health rating.");
      formIsValid = false;
    } else if (Number(healthRating) < 1 || Number(healthRating) > 100) {
      setHealthRatingError("Enter a health rating from 1 to 100.");
      formIsValid = false;
    }

    if (techBrand.trim() === "") {
      setTechBrandError("Please enter the tech brand.");
      formIsValid = false;
    }

    if (role === "") {
      setRoleError("Choose either Engineer or Tester.");
      formIsValid = false;
    }

    if (formIsValid === true) {
      alert("Gadget information saved successfully!");
    }
  }

  return (
    <div className="app">
      <div className="form-card">
        <h1>Tech Gadget Inventory Hub</h1>
        <p>Provide the gadget information below.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Gadget Name</label>
            <input type="text" value={gadgetName} onChange={handleGadgetName} placeholder="Type the gadget name"/>
            {gadgetNameError && <span className="error">{gadgetNameError}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={handleCategory}>
              <option value="">Choose a category</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Wearable">Wearable</option>
              <option value="Audio">Audio</option>
            </select>
            {categoryError && <span className="error">{categoryError}</span>}
          </div>

          <div className="form-group">
            <label>Manufacturer</label>
            <input type="text" value={manufacturer} onChange={handleManufacturer} placeholder="Type the manufacturer name" />
            {manufacturerError && <span className="error">{manufacturerError}</span>}
          </div>

          <div className="form-group">
            <label>Health Rating</label>
            <input type="number" value={healthRating} onChange={handleHealthRating} placeholder="Choose from 1 to 100" min="1" max="100" />
            {healthRatingError && <span className="error">{healthRatingError}</span>}
          </div>

          <div className="form-group">
            <label>Tech Brand Name</label>
            <input type="text" value={techBrand} onChange={handleTechBrand} placeholder="Type the tech brand name" />
            {techBrandError && <span className="error">{techBrandError}</span>}
          </div>

          <div className="form-group">
            <label>User Role</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="role" value="Engineer" checked={role === "Engineer"} onChange={handleRole} />
                Engineer
              </label>
              <label>
                <input type="radio" name="role" value="Tester" checked={role === "Tester"} onChange={handleRole} />
                Tester
              </label>
            </div>
            {roleError && <span className="error">{roleError}</span>}
          </div>

          <button type="submit">Save Gadget</button>
        </form>
      </div>
    </div>
  );
}

export default App;
