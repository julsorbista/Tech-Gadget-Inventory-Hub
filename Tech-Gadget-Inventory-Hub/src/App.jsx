import { useEffect, useState } from "react";
import { createPaginatedRowModel, flexRender, rowPaginationFeature, tableFeatures, useTable, } from "@tanstack/react-table";
import styles from "./App.module.css";

const tableSetup = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});

const columns = [
  { accessorKey: "gadgetName", header: "Gadget Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "manufacturer", header: "Manufacturer" },
  { accessorKey: "healthRating", header: "Health Rating" },
  { accessorKey: "techBrand", header: "Tech Brand" },
  { accessorKey: "role", header: "User Role" },
];

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
  const [gadgets, setGadgets] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedGadget, setSelectedGadget] = useState(null);
  const [activeGadget, setActiveGadget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  let filteredGadgets = gadgets;

  if (categoryFilter !== "All") {
    filteredGadgets = gadgets.filter(function (gadget) {
      return gadget.category === categoryFilter;
    });
  }

  const table = useTable({
    data: filteredGadgets,
    columns: columns,
    features: tableSetup,
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  useEffect(
    function () {
      if (selectedGadget !== null) {
        setActiveGadget(selectedGadget);
      }
    },
    [selectedGadget],
  );

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
      const newGadget = {
        id: Date.now(),
        gadgetName: gadgetName,
        category: category,
        manufacturer: manufacturer,
        healthRating: healthRating,
        techBrand: techBrand,
        role: role,
      };

      setGadgets([...gadgets, newGadget]);
      setSelectedGadget(newGadget);
      setShowTable(true);

      setGadgetName("");
      setCategory("");
      setManufacturer("");
      setHealthRating("");
      setTechBrand("");
      setRole("");
    }
  }

  return (
    <div className={styles.container}>
      {showTable === false ? (
        <div className={styles.formBox}>
        <h1>Tech Gadget Inventory Hub</h1>
        <p>Provide the gadget information below.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Gadget Name</label>
            <input type="text" value={gadgetName} onChange={handleGadgetName} placeholder="Type the gadget name"/>
            {gadgetNameError && <span className={styles.errorMessage}>{gadgetNameError}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Category</label>
            <select value={category} onChange={handleCategory}>
              <option value="">Choose a category</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Wearable">Wearable</option>
              <option value="Audio">Audio</option>
            </select>
            {categoryError && <span className={styles.errorMessage}>{categoryError}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Manufacturer</label>
            <input type="text" value={manufacturer} onChange={handleManufacturer} placeholder="Type the manufacturer name" />
            {manufacturerError && <span className={styles.errorMessage}>{manufacturerError}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Health Rating</label>
            <input type="number" value={healthRating} onChange={handleHealthRating} placeholder="Choose from 1 to 100" min="1" max="100" />
            {healthRatingError && <span className={styles.errorMessage}>{healthRatingError}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Tech Brand Name</label>
            <input type="text" value={techBrand} onChange={handleTechBrand} placeholder="Type the tech brand name" />
            {techBrandError && <span className={styles.errorMessage}>{techBrandError}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>User Role</label>
            <div className={styles.radioButtons}>
              <label>
                <input type="radio" name="role" value="Engineer" checked={role === "Engineer"} onChange={handleRole} />
                Engineer
              </label>
              <label>
                <input type="radio" name="role" value="Tester" checked={role === "Tester"} onChange={handleRole} />
                Tester
              </label>
            </div>
            {roleError && <span className={styles.errorMessage}>{roleError}</span>}
          </div>

          <button type="submit">Save Gadget</button>
        </form>
        </div>
      ) 
      : 
      (
        <div className={styles.tableBox}>
          <h1>Tech Gadget Inventory Hub</h1>

          <div className={styles.tableHeader}>
            <div>
              <h2>Gadget Registry</h2>
              <p>Total gadgets: {gadgets.length}</p>
            </div>
            <button className={styles.addButton} onClick={() => setShowTable(false)}>
              Add Another Gadget
            </button>
          </div>

          <div className={styles.filterBox}>
            <label>Filter by Category</label>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="All">Show All</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Wearable">Wearable</option>
              <option value="Audio">Audio</option>
            </select>
          </div>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                {table.getHeaderGroups().map(function (headerGroup) {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(function (header) {
                        return (
                          <th key={header.id}>
                            {flexRender( header.column.columnDef.header, header.getContext(),)}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>

              <tbody>
                {table.getRowModel().rows.map(function (row) {
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedGadget(row.original)}
                      className={selectedGadget !== null && selectedGadget.id === row.original.id ? styles.activeRow : ""}
                    >
                      {row.getAllCells().map(function (cell) {
                        return (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.pageButtons}>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </button>

            <span>
              Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
            </span>

            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >
              Next
            </button>
          </div>

          {activeGadget !== null && (
            <div className={styles.infoBox}>
              <div className={styles.infoHeader}>
                <h2>Active Gadget Profile</h2>
                <span className={styles.roleLabel}>{activeGadget.role}</span>
              </div>

              <div className={styles.infoGrid}>
                <p>
                  <strong>Gadget Name:</strong> {activeGadget.gadgetName}
                </p>
                <p>
                  <strong>Category:</strong> {activeGadget.category}
                </p>
                <p>
                  <strong>Manufacturer:</strong> {activeGadget.manufacturer}
                </p>
                <p>
                  <strong>Health Rating:</strong> {activeGadget.healthRating}
                </p>
                <p>
                  <strong>Tech Brand:</strong> {activeGadget.techBrand}
                </p>
                <p>
                  <strong>User Role:</strong> {activeGadget.role}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
