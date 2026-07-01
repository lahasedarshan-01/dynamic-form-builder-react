function Toolbar({
  setShowPreview,
  darkMode,
  setDarkMode,
  saveTemplate,
  exportJSON
}) {
  return (

    <div className="container mt-4">

      <div className="card shadow border-0">

        <div className="card-body d-flex justify-content-center gap-3">

         <button
  className="btn btn-success"
  onClick={() => setShowPreview(true)}
>
  <i className="bi bi-eye-fill me-2"></i>
  Preview
</button>

          <button
  className="btn btn-primary"
  onClick={saveTemplate}
>
  <i className="bi bi-floppy-fill me-2"></i>
  Save Template
</button>

          <button
  className="btn btn-warning text-dark"
  onClick={exportJSON}
>
  <i className="bi bi-download me-2"></i>
  Export JSON
</button>

          <button
  className="btn btn-dark"
  onClick={() => setDarkMode(!darkMode)}
>
  <i
    className={`bi ${
      darkMode ? "bi-sun-fill" : "bi-moon-fill"
    } me-2`}
  ></i>

  {darkMode ? "Light Mode" : "Dark Mode"}
</button>

        </div>

      </div>

    </div>

  );
}

export default Toolbar;