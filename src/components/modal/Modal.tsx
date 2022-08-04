import { XIcon } from "@heroicons/react/solid";
import React from "react";
import concatClasses from "../../utils/concatClasses";
import styles from "./modal.module.css";

interface IModal {
  onClose: () => void;
  name: string;
  shown: boolean;
  children?: React.ReactNode;
}

const Modal = ({ onClose, name, shown, children }: IModal) => {
  return (
    <div
      className={concatClasses(
        styles.ModalBackground,
        shown
          ? styles.ModalBackground_visible
          : styles.ModalBackground_invisible
      )}
      onClick={onClose}
    >
      <div
        className={styles["ModalBackground-Window"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["ModalBackground-Window-Header"]}>
          <p className={styles["ModalBackground-Window-Header-Namefield"]}>
            {name}
          </p>
          <div
            className={concatClasses(
              styles["ModalBackground-Window-Header-CloseButton"],
              "group"
            )}
            onClick={onClose}
          >
            <XIcon className="h-5 fill-gray-700 group-hover:fill-white" />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

Modal.Contents = ({ children }: { children: React.ReactNode }) => (
  <div className={styles["ModalBackground-Window-Contents"]}>{children}</div>
);

Modal.Buttons = ({ children }: { children: React.ReactNode }) => (
  <div className={styles["ModalBackground-Window-Buttons"]}>{children}</div>
);

export default Modal;
