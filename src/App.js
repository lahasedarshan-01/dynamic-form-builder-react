import './App.css';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Builder from './components/Builder';
import Properties from './components/Properties';
import { useState, useEffect } from "react";
import PreviewModal from "./components/PreviewModal";
import Toast from "./components/Toast";

function App() {

  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success"
});
const showToast = (message, type = "success") => {

  setToast({
    show: true,
    message,
    type
  });

};

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

  showToast("Template Saved Successfully!");
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

const importJSON = (event) => {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {

    try {

      const importedFields = JSON.parse(e.target.result);

      setFields(importedFields);

      showToast("JSON Imported Successfully!");

    } catch {

      showToast("Invalid JSON", "danger");

    }

  };

  reader.readAsText(file);

};

const clearBuilder = () => {

  const confirmClear = window.confirm(
    "Are you sure you want to clear the builder?"
  );

  if (!confirmClear) return;

  setFields([]);
  setSelectedField(null);

  localStorage.removeItem("formTemplate");

  showToast("Builder Cleared Successfully!");

};

const moveFieldUp = (id) => {

  const index = fields.findIndex(
    (field) => field.id === id
  );

  if (index === 0) return;

  const newFields = [...fields];

  [newFields[index], newFields[index - 1]] =
    [newFields[index - 1], newFields[index]];

  setFields(newFields);

};

const moveFieldDown = (id) => {

  const index = fields.findIndex(
    (field) => field.id === id
  );

  if (index === fields.length - 1) return;

  const newFields = [...fields];

  [newFields[index], newFields[index + 1]] =
    [newFields[index + 1], newFields[index]];

  setFields(newFields);

};

const duplicateField = (id) => {

  const fieldToDuplicate = fields.find(
    (field) => field.id === id
  );

  if (!fieldToDuplicate) return;

  const duplicatedField = {
    ...fieldToDuplicate,
    id: Date.now(),
    label: `${fieldToDuplicate.label} Copy`
  };

  const index = fields.findIndex(
    (field) => field.id === id
  );

  const newFields = [...fields];

  newFields.splice(index + 1, 0, duplicatedField);

  setFields(newFields);

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
  importJSON={importJSON}
  clearBuilder={clearBuilder}
/>

    <div className="container mt-4">
      <div className="row">

        <Sidebar addField={addField} />

        <Builder
  fields={fields}
  deleteField={deleteField}
  duplicateField={duplicateField}
  setSelectedField={setSelectedField}
  moveFieldUp={moveFieldUp}
  moveFieldDown={moveFieldDown}
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
  showToast={showToast}
/>
    <Toast
  show={toast.show}
  message={toast.message}
  type={toast.type}
  onClose={() =>
    setToast({
      ...toast,
      show: false
    })
  }
/>

  </div>
);
}

export default App;