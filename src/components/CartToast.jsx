// El contenedor live siempre está montado: así los lectores de pantalla anuncian el mensaje al aparecer.
export function CartToast({ toast, onClose }) {
  return (
    <div className="cart-toast-container" role="status" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="toast show cart-toast align-items-center text-bg-success border-0">
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Cerrar notificación"
              onClick={onClose}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
