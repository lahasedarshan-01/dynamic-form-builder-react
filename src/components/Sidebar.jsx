function Sidebar({ addField }) {

  return (
    <div className="col-lg-3">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h5>
            <i className="bi bi-grid me-2"></i>
            Components
          </h5>
        </div>

        <div className="card-body d-grid gap-2">

          <button
  className="btn btn-outline-primary"
  onClick={() => addField("text")}
>
  Text Field
</button>

         <button
  className="btn btn-outline-success"
  onClick={() => addField("email")}
>
  Email
</button>

         <button
  className="btn btn-outline-dark"
  onClick={() => addField("password")}
>
  <i className="bi bi-lock-fill me-2"></i>
  Password
</button>

          <button
  className="btn btn-outline-warning"
  onClick={() => addField("number")}
>
  <i className="bi bi-123 me-2"></i>
  Number
</button>
          <button
  className="btn btn-outline-info"
  onClick={() => addField("date")}
>
  <i className="bi bi-calendar-date-fill me-2"></i>
  Date
</button>

          <button
  className="btn btn-outline-secondary"
  onClick={() => addField("textarea")}
>
  <i className="bi bi-card-text me-2"></i>
  Textarea
</button>

          <button
  className="btn btn-outline-danger"
  onClick={() => addField("checkbox")}
>
  <i className="bi bi-check2-square me-2"></i>
  Checkbox
</button>

          <button
  className="btn btn-outline-primary"
  onClick={() => addField("radio")}
>
  <i className="bi bi-record-circle me-2"></i>
  Radio Button
</button>

          <button
  className="btn btn-outline-success"
  onClick={() => addField("dropdown")}
>
  <i className="bi bi-menu-button-wide-fill me-2"></i>
  Dropdown
</button>

          <button
  className="btn btn-primary"
  onClick={() => addField("submit")}
>
  <i className="bi bi-send-fill me-2"></i>
  Submit Button
</button>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;