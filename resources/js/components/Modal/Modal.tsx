import { Button } from "../Button/Button";
import "./Modal.styles.css";
import { ModalProps } from "./Modal.types";

export const Modal = ({
  isOpen = false,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonType = "primary",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
          </div>
        )}

        {children && <div className="modal-body">{children}</div>}

        {(onConfirm || onCancel) && (
          <div className="modal-footer">
            {onCancel && <Button label={cancelText} onClick={onCancel} />}
            {onConfirm && (
              <Button
                type={confirmButtonType}
                label={confirmText}
                onClick={onConfirm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
