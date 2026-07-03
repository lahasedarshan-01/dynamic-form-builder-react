import { useEffect } from "react";

function Toast({ show, message, type = "success", onClose }) {

  useEffect(() => {

    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);

  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className={`toast show bg-${type} text-white`}>

        <div className="d-flex">

          <div className="toast-body">
            {message}
          </div>

          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          ></button>

        </div>

      </div>
    </div>
  );
}

export default Toast;