import React from "react";

import { ClipboardIcon, PencilIcon, PlusIcon, XIcon } from "@heroicons/react/solid";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useStoreItems from "../../../hooks/useStoreItems";
import { ICouplet, IRCouplet } from "../../../models";
import { storeReducersEnum } from "../../../store";
import { setActiveCouplet } from "../../../store/actions/SongsPage/coupletsActions";
import { WSSingletone } from "../../../websocket/wsSingletone";
import ItemsList from "../../items-list/ItemsList";
import {
  setCoupletModalEdit,
  setCoupletModalFullName,
  setCoupletModalInsertAfter,
  setCoupletModalMark,
  setCoupletModalShown,
} from "../../../store/actions/SongsPage/coupletModalActions";
import { useCoupletsHotkeys } from "../../../hooks/useCoupletsHotkeys";
import styles from './CoupletsList.module.css'

const CoupletsList = ({ className }: { className: string }) => {
  const items = useStoreItems(storeReducersEnum.couplets);
  const shownCouplet = useAppSelector((state) => state.recv.couplet);

  const dispatch = useAppDispatch();

  useCoupletsHotkeys();

  return (
    <ItemsList
      className={className}
      itemClassName={styles['CoupletsList-Item']}
      {...items}
      onItemClick={(couplet) =>
        dispatch(setActiveCouplet(couplet as IRCouplet))
      }
      onDoubleItemClick={(couplet) =>
        WSSingletone.get().showCouplet(couplet as ICouplet)
      }
      isItemShown={(couplet) => couplet.id === shownCouplet?.id}
      listTopButton={{
        name: "add-new",
        onClick() {
          dispatch(setCoupletModalMark(""));
          dispatch(setCoupletModalFullName(""));
          dispatch(setCoupletModalInsertAfter(-1));
          dispatch(setCoupletModalShown(true));
        },
        className: styles['CoupletsList-TopButton'],
        children: <PlusIcon className="h-5" />,
      }}
      rightButtons={[
        {
          name: "copy",
          onClick(item) {
            navigator.clipboard.writeText(item.fullName)
          },
          className: styles['CoupletsList-Item-RightButton'],
          activeClassName: styles['CoupletsList-Item-RightButton_active'],
          children: <ClipboardIcon className="h-5" />,
        },
        {
          name: "edit",
          onClick(item) {
            dispatch(setCoupletModalMark(item.mark as string));
            dispatch(setCoupletModalFullName(item.fullName as string));
            dispatch(setCoupletModalEdit(item as IRCouplet));
            dispatch(setCoupletModalShown(true));
          },
          className: styles['CoupletsList-Item-RightButton'],
          activeClassName: styles['CoupletsList-Item-RightButton_active'],
          children: <PencilIcon className="h-5" />,
        },
        {
          name: "remove",
          onClick(item) {
            WSSingletone.get().deleteCouplet(item.id as number);
          },
          className: styles['CoupletsList-Item-RightButton'],
          activeClassName: styles['CoupletsList-Item-RightButton_active'],
          children: <XIcon className="h-5" />,
        },
      ]}
      bottomButtons={[
        {
          name: "add-after",
          onClick(item) {
            dispatch(setCoupletModalInsertAfter(item.id as number));
            dispatch(setCoupletModalShown(true));
          },
          children: (
            <PlusIcon
              className={styles['CoupletsList-Item-BottomButton']}
            />
          ),
        },
      ]}
    />
  );
};

export default CoupletsList;
