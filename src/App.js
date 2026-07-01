import './App.css';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Builder from './components/Builder';
import Properties from './components/Properties';
import { useState, useEffect } from "react";
import PreviewModal from "./components/PreviewModal";

function App() {

  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // One function for all field types
  const addField = (type) => {
  setFields([
    ...fields,
    {
  id: Date.now(),
  type,
  label: type.charAt(0).toUpperCase() + type.slice(1),
  placeholder: `Enter ${type}`,
  options: ["Option 1", "Option 2"],

  required: false,
  minLength: 0,
  maxLength: 100,
  min: "",
  max: ""
}
  ]);
};
  const deleteField = (id) => {
  setFields(fields.filter((field) => field.id !== id));
};

const updateField = (id, key, value) => {
  setFields(
    fields.map((field) =>
      field.id === id
        ? { ...field, [key]: value }
        : field
    )
  );

  if (selectedField && selectedField.id === id) {
    setSelectedField({
      ...selectedField,
      [key]: value
    });
  }
};
const saveTemplate = () => {

  localStorage.setItem(
    "formTemplate",
    JSON.stringify(fields)
  );

  alert("✅ Template Saved Successfully!");

};

useEffect(() => {

  const savedTemplate = localStorage.getItem("formTemplate");

  if (savedTemplate) {
    setFields(JSON.parse(savedTemplate));
  }

}, []);

const exportJSON = () => {

  const data = JSON.stringify(fields, null, 2);

  const blob = new Blob([data], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "form-template.json";

  link.click();

  URL.revokeObjectURL(url);

};
  return (
  <div
    className={
      darkMode
        ? "bg-dark text-light min-vh-100"
        : "bg-light text-dark min-vh-100"
    }
  >
    <Header />

    <Toolbar
  setShowPreview={setShowPreview}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  saveTemplate={saveTemplate}
  exportJSON={exportJSON}
/>

    <div className="container mt-4">
      <div className="row">

        <Sidebar addField={addField} />

        <Builder
          fields={fields}
          deleteField={deleteField}
          setSelectedField={setSelectedField}
        />

        <Properties
          selectedField={selectedField}
          updateField={updateField}
        />

      </div>
    </div>

    <PreviewModal
      showPreview={showPreview}
      setShowPreview={setShowPreview}
      fields={fields}
    />

  </div>
);
}

export default App;