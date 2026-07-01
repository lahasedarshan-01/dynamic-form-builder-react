import { useState } from "react";

function PreviewModal({ showPreview, setShowPreview, fields }) {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value
    });

    setErrors({
      ...errors,
      [id]: ""
    });
  };

  const validateForm = () => {

    let newErrors = {};

    fields.forEach((field) => {

      const value = formData[field.id];

      // Required Validation
      // Required Validation

if (field.required) {

  if (field.type === "checkbox") {

    if (!value || value.length === 0) {
      newErrors[field.id] = `${field.label} is required`;
      return;
    }

  } else {

    if (!value || value.toString().trim() === "") {
      newErrors[field.id] = `${field.label} is required`;
      return;
    }

  }

}

      // Email Validation
      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.id] = "Invalid Email Address";
      }

      // Min Length
      if (
        field.minLength &&
        value &&
        value.length < field.minLength
      ) {
        newErrors[field.id] =
          `Minimum ${field.minLength} characters required`;
      }

      // Max Length
      if (
        field.maxLength &&
        value &&
        value.length > field.maxLength
      ) {
        newErrors[field.id] =
          `Maximum ${field.maxLength} characters allowed`;
      }

    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  if (!showPreview) return null;

  return (

    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >

      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">
              Form Preview
            </h5>

            <button
              className="btn-close"
              onClick={() => setShowPreview(false)}
            ></button>

          </div>

          <div className="modal-body">

            {fields.length === 0 ? (

              <p>No Fields Added</p>

            ) : (

              fields.map((field) => (

                <div
                  key={field.id}
                  className="mb-3"
                >

                  <label className="form-label fw-bold">
                    {field.label}

                    {field.required && (
                      <span className="text-danger ms-1">*</span>
                    )}
                  </label>

                  {/* Text */}
                  {field.type === "text" && (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field.id, e.target.value)
                        }
                      />

                      {errors[field.id] && (
                        <div className="text-danger mt-1">
                          {errors[field.id]}
                        </div>
                      )}
                    </>
                  )}

                  {/* Email */}
                  {field.type === "email" && (
                    <>
                      <input
                        type="email"
                        className="form-control"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field.id, e.target.value)
                        }
                      />

                      {errors[field.id] && (
                        <div className="text-danger mt-1">
                          {errors[field.id]}
                        </div>
                      )}
                    </>
                  )}

                  {/* Password */}
                  {field.type === "password" && (
                    <>
                      <input
                        type="password"
                        className="form-control"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field.id, e.target.value)
                        }
                      />

                      {errors[field.id] && (
                        <div className="text-danger mt-1">
                          {errors[field.id]}
                        </div>
                      )}
                    </>
                  )}

                  {/* Number */}
                  {field.type === "number" && (
                    <>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field.id, e.target.value)
                        }
                      />

                      {errors[field.id] && (
                        <div className="text-danger mt-1">
                          {errors[field.id]}
                        </div>
                      )}
                    </>
                  )}

                  {/* Date */}
                  {field.type === "date" && (
                    <>
                      <input
                        type="date"
                        className="form-control"
                        value={formData[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field.id, e.target.value)
                        }
                      />

                      {errors[field.id] && (
                        <div className="text-danger mt-1">
                          {errors[field.id]}
                        </div>
                      )}
                    </>
                  )}
                  {/* Textarea */}
{field.type === "textarea" && (
  <>
    <textarea
      className="form-control"
      rows="4"
      placeholder={field.placeholder}
      value={formData[field.id] || ""}
      onChange={(e) =>
        handleChange(field.id, e.target.value)
      }
    />

    {errors[field.id] && (
      <div className="text-danger mt-1">
        {errors[field.id]}
      </div>
    )}
  </>
)}

{/* Dropdown */}
{field.type === "dropdown" && (
  <>
    <select
      className="form-select"
      value={formData[field.id] || ""}
      onChange={(e) =>
        handleChange(field.id, e.target.value)
      }
    >
      <option value="">
        {field.placeholder || "Select"}
      </option>

      {field.options.map((option, index) => (
        <option
          key={index}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>

    {errors[field.id] && (
      <div className="text-danger mt-1">
        {errors[field.id]}
      </div>
    )}
  </>
)}

{/* Checkbox */}
{field.type === "checkbox" && (
  <>
    {field.options.map((option, index) => (
      <div
        className="form-check"
        key={index}
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

    {errors[field.id] && (
      <div className="text-danger mt-1">
        {errors[field.id]}
      </div>
    )}
  </>
)}

{/* Radio */}
{field.type === "radio" && (
  <>
    {field.options.map((option, index) => (
      <div
        className="form-check"
        key={index}
      >
        <input
          className="form-check-input"
          type="radio"
          name={`radio-${field.id}`}
        />

        <label className="form-check-label">
          {option}
        </label>
      </div>
    ))}

    {errors[field.id] && (
      <div className="text-danger mt-1">
        {errors[field.id]}
      </div>
    )}
  </>
)}

                </div>

              ))

            )}

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {

                if (validateForm()) {
                  alert("✅ Form Submitted Successfully!");
                }

              }}
            >
              Submit
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default PreviewModal;