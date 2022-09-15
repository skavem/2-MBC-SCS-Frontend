import React from "react";

import { EyeIcon } from "@heroicons/react/solid";

import { ISObjectWRKey } from "../../models";
import ItemButton from "./ItemButton";
import concatClasses from "../../utils/concatClasses";
import styles from "./items-list.module.css";

const Item = ({
  className = '',
  item,
  isActive,
  onClick,
  onDoubleClick = (_) => {},
  isShown = (_) => false,
  forwardRef,
  children,
}: {
  className: string;
  item: ISObjectWRKey;
  isActive: boolean;
  onClick: (item: ISObjectWRKey) => void;
  onDoubleClick?: (item: ISObjectWRKey) => void;
  isShown?: (item: ISObjectWRKey) => boolean;
  forwardRef: React.MutableRefObject<HTMLDivElement | null> | null;
  children?: React.ReactNode;
}) => {
  return (
    <div
      ref={forwardRef}
      onClick={() => onClick(item)}
      onDoubleClick={() => onDoubleClick(item)}
      className={concatClasses(
        className,
        styles["ItemsList-Item"],
        (isActive && styles["ItemsList-Item_active"]),
        'group'
      )}
    >
      {isShown(item) && (
        <div>
          <EyeIcon className={styles['ItemsList-Item-ShownIcon']} />
        </div>
      )}
      <div>
        {item.mark && (
          <span
            className={styles['ItemList-Item-Mark']}
          >
            {item.mark}
          </span>
        )}
        <span>{item.fullName}</span>
      </div>

      {children}
    </div>
  );
};

Item.Button = ItemButton;

export default Item;
