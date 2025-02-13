import { FC, ReactNode, useEffect, useRef } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node)) {
        onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onclose]);

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center z-2 backdrop-blur-lg">
      <div ref={modalRef} className="w-fit">
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
