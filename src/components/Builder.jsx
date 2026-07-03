function Builder({
  fields,
  deleteField,
  duplicateField,
  setSelectedField,
  moveFieldUp,
  moveFieldDown
}) {

  return (
    <div className="col-lg-6">

      <div className="card shadow">

        <div className="card-header bg-success text-white">
          <h5>
            <i className="bi bi-ui-checks-grid me-2"></i>
            Form Builder
          </h5>
        </div>

        <div className="card-body" id="builder">

          {
            fields.length === 0 ? (

              <h5 className="text-muted text-center mt-5">
                Drag or Click Components to Build Form
              </h5>

            ) : (

              fields.map((field) => (

                <div
  key={field.id}
  className="card p-3 mb-3 shadow-sm"
  onClick={() => setSelectedField(field)}
  style={{ cursor: "pointer" }}
>

                  {/* Delete Button */}
                 <div className="d-flex justify-content-end gap-2 mb-2">

  <button
    className="btn btn-primary btn-sm"
    title="Move Up"
    onClick={(e) => {
      e.stopPropagation();
      moveFieldUp(field.id);
    }}
  >
    <i className="bi bi-arrow-up"></i>
  </button>

  <button
    className="btn btn-warning btn-sm"
    title="Move Down"
    onClick={(e) => {
      e.stopPropagation();
      moveFieldDown(field.id);
    }}
  >
    <i className="bi bi-arrow-down"></i>
  </button>

  <button
    className="btn btn-info btn-sm text-white"
    title="Duplicate"
    onClick={(e) => {
      e.stopPropagation();
      duplicateField(field.id);
    }}
  >
    <i className="bi bi-files"></i>
  </button>

  <button
    className="btn btn-danger btn-sm"
    title="Delete"
    onClick={(e) => {
      e.stopPropagation();
      deleteField(field.id);
    }}
  >
    <i className="bi bi-trash"></i>
  </button>

</div>
                  {/* Text */}
                  {field.type === "text" && (
                    <>
                     <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

<input
  type="text"
  className="form-control"
  placeholder={field.placeholder}
/>
                    </>
                  )}

                  {/* Email */}
                  {field.type === "email" && (
                    <>
                      <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

<input
  type="email"
  className="form-control"
  placeholder={field.placeholder}
/>
                    </>
                  )}

                  {/* Password */}
                  {field.type === "password" && (
                    <>
                      <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

<input
  type="password"
  className="form-control"
  placeholder={field.placeholder}
/>
                    </>
                  )}

                  {/* Number */}
                  {field.type === "number" && (
                    <>
                     <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

<input
  type="number"
  className="form-control"
  placeholder={field.placeholder}
/>
                    </>
                  )}

                  {/* Date */}
{field.type === "date" && (
  <>
   <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

    <input
      type="date"
      className="form-control"
    />
  </>
)}

                  {/* Textarea */}
                  {field.type === "textarea" && (
                    <>
                      <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>

<textarea
  className="form-control"
  rows="4"
  placeholder={field.placeholder}
></textarea>
                    </>
                  )}

                  {/* Checkbox */}
{field.type === "checkbox" && (
  <>
    <label className="form-label fw-bold">
      {field.label}
      {field.required && (
        <span className="text-danger ms-1">*</span>
      )}
    </label>

    {field.options.map((option, index) => (
      <div
        key={index}
        className="form-check"
      >
        <input
          className="form-check-input"
          type="checkbox"
        />

        <label className="form-check-label">
          {option}
        </label>
      </div>
    ))}
  </>
)}
                {/* Radio */}
{field.type === "radio" && (
  <>
    <label className="form-label fw-bold">
      {field.label}
      {field.required && (
        <span className="text-danger ms-1">*</span>
      )}
    </label>

    {field.options.map((option, index) => (
      <div
        key={index}
        className="form-check"
      >
        <input
          type="radio"
          className="form-check-input"
          name={`radio-${field.id}`}
        />

        <label className="form-check-label">
          {option}
        </label>
      </div>
    ))}
  </>
)}
                  {/* Dropdown */}
                  {field.type === "dropdown" && (
                    <>
                    <label className="form-label fw-bold">
  {field.label}
  {field.required && (
    <span className="text-danger ms-1">*</span>
  )}
</label>
                      <select className="form-select">

  <option>Select</option>

  {field.options.map((option, index) => (

    <option key={index}>
      {option}
    </option>

  ))}

</select>
                    </>
                  )}

                  {/* Submit */}
                  {field.type === "submit" && (
                    <button className="btn btn-success">
                      Submit
                    </button>
                  )}

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>
  );
}

export default Builder;