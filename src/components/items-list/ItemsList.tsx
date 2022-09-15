import React, { useEffect, useRef } from "react";

import { ISObjectWRKey } from "../../models";
import { IItemButton, IListButton } from "../../models/ui";
import concatClasses from "../../utils/concatClasses";
import isScrollNeeded from "../../utils/isScrollNeeded";
import Item from "./Item";
import styles from "./items-list.module.css";

interface IItemsListProps {
  className: string;
  itemClassName?: string;
  items: ISObjectWRKey[];
  activeItem: ISObjectWRKey | null;
  isItemShown?: (item: ISObjectWRKey) => boolean;
  onItemClick: (item: ISObjectWRKey) => void;
  onDoubleItemClick?: (item: ISObjectWRKey) => void;
  rightButtons?: IItemButton[];
  bottomButtons?: IItemButton[];
  listTopButton?: IListButton;
}

const ItemsList = ({
  className,
  itemClassName = "",
  items,
  activeItem,
  isItemShown = (a) => false,
  onItemClick,
  onDoubleItemClick = (_) => {},
  rightButtons,
  bottomButtons,
  listTopButton,
}: IItemsListProps) => {
  const activeRef = useRef<HTMLDivElement | null>(null);
  const list = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeRef.current === null || list.current === null) return;
    if (isScrollNeeded(activeRef.current!, list.current!)) {
      activeRef.current?.scrollIntoView({ block: "center" });
    }
  }, [activeItem]);

  return (
    <div ref={list} className={concatClasses(styles.ItemsList, className)}>
      {listTopButton && (
        <Item.Button
          className={listTopButton.className}
          name={listTopButton.name}
          onClick={listTopButton.onClick}
        >
          {listTopButton.children}
        </Item.Button>
      )}
      {items?.map((item) => {
        const isActive = item.reactKey === activeItem?.reactKey;
        return (
          <Item
            className={itemClassName}
            item={item}
            forwardRef={isActive ? activeRef : null}
            isActive={isActive}
            isShown={isItemShown}
            onClick={onItemClick}
            onDoubleClick={onDoubleItemClick}
            key={item.reactKey}
          >
            {rightButtons?.map((button) => (
              <Item.Button
                name={button.name}
                onClick={() => button.onClick(item)}
                className={`${button.className} ${
                  isActive ? button.activeClassName : button.nonActiveClassName
                }`}
                key={`${item.reactKey}-${button.name as string}`}
              >
                {button.children}
              </Item.Button>
            ))}
            {bottomButtons?.map((button) => (
              <Item.Button
                name={button.name}
                onClick={() => button.onClick(item)}
                className={`${button.className} ${
                  isActive ? button.activeClassName : button.nonActiveClassName
                }`}
                key={`${item.reactKey}-${button.name as string}`}
              >
                {button.children}
              </Item.Button>
            ))}
          </Item>
        );
      })}
    </div>
  );
};

export default ItemsList;
