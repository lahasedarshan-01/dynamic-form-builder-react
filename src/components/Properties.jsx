function Properties({
  selectedField,
  updateField
}) {
  return (
    <div className="col-lg-3">

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h5>
            <i className="bi bi-sliders me-2"></i>
            Properties
          </h5>
        </div>

        <div className="card-body">

          {!selectedField ? (

            <p className="text-muted">
              Select a field to edit its properties.
            </p>

          ) : (

            <>
              <div className="mb-3">
                <label className="form-label">
                  Field Type
                </label>

                <input
                  className="form-control"
                  value={selectedField.type}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Label
                </label>

               <input
  className="form-control"
  value={selectedField.label}
  onChange={(e) =>
    updateField(
      selectedField.id,
      "label",
      e.target.value
    )
  }
/>
              </div>

              <div className="mb-3">
                {/* Min Length & Max Length */}

{(selectedField.type === "text" ||
  selectedField.type === "email" ||
  selectedField.type === "password" ||
  selectedField.type === "textarea") && (

  <div className="row">

    <div className="col-6">

      <label className="form-label">
        Min Length
      </label>

      <input
        type="number"
        className="form-control"
        value={selectedField.minLength}
        onChange={(e) =>
          updateField(
            selectedField.id,
            "minLength",
            Number(e.target.value)
          )
        }
      />

    </div>

    <div className="col-6">

      <label className="form-label">
        Max Length
      </label>

      <input
        type="number"
        className="form-control"
        value={selectedField.maxLength}
        onChange={(e) =>
          updateField(
            selectedField.id,
            "maxLength",
            Number(e.target.value)
          )
        }
      />

    </div>

  </div>

)}
  <label className="form-label">
    Placeholder
  </label>

  <input
    className="form-control"
    value={selectedField.placeholder || ""}
    onChange={(e) =>
      updateField(
        selectedField.id,
        "placeholder",
        e.target.value
      )
    }
  />
  <div className="form-check mt-3">
  <input
    className="form-check-input"
    type="checkbox"
    id="requiredCheck"
    checked={selectedField.required}
    onChange={(e) =>
      updateField(
        selectedField.id,
        "required",
        e.target.checked
      )
    }
  />

  <label
    className="form-check-label"
    htmlFor="requiredCheck"
  >
    Required Field
  </label>
</div>

  {(selectedField.type === "dropdown" ||
    selectedField.type === "checkbox" ||
    selectedField.type === "radio") && (

    <>
      <label className="form-label fw-bold mt-3">
        Options
      </label>

      {selectedField.options.map((option, index) => (

  <div
    key={index}
    className="d-flex gap-2 mb-2"
  >

    <input
      className="form-control"
      value={option}
      onChange={(e) => {

        const newOptions = [...selectedField.options];
        newOptions[index] = e.target.value;

        updateField(
          selectedField.id,
          "options",
          newOptions
        );

      }}
    />

    <button
      className="btn btn-danger"
      onClick={() => {

        const newOptions = selectedField.options.filter(
          (_, i) => i !== index
        );

        updateField(
          selectedField.id,
          "options",
          newOptions
        );

      }}
    >
      <i className="bi bi-trash"></i>
    </button>

  </div>

))}

      <button
        className="btn btn-success btn-sm mt-2"
        onClick={() => {

          updateField(
            selectedField.id,
            "options",
            [
              ...selectedField.options,
              `Option ${selectedField.options.length + 1}`
            ]
          );

        }}
      >
        + Add Option
      </button>

    </>

  )}

</div>
              
            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default Properties;