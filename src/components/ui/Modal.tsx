import { ReactNode, useEffect } from "react";

declare global {
  interface Window {
    jQuery: unknown;
  }
}

type Props = {
  id: string;
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  maxWidth?: string;
};

export const Modal = ({
  id,
  children,
  title,
  onClose,
  isOpen = false,
  maxWidth = "550px",
}: Props) => {
  useEffect(() => {
    if (typeof window.jQuery !== "function") return;
    window.jQuery(`#${id}`).modal(isOpen ? "show" : "hide");
  }, [id, isOpen]);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className={`modal-dialog modal-dialog-centered mw-${maxWidth}`}>
        <div className="modal-content">
          <div className="modal-header p-5">
            <h2>{title}</h2>
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              onClick={() => onClose && onClose()}
            >
              <i className="fa fa-times fs-1"></i>
            </div>
          </div>
          <div className="modal-body p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};
