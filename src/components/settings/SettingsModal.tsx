import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useInput } from "../../hooks/useInput";
import { settingsSlice } from "../../store/slices/settingsSlice";
import concatClasses from "../../utils/concatClasses";
import { WSIPDefault, WSPortDefault } from "../../variables/websocket";
import { WSSingletone } from "../../websocket/wsSingletone";
import Modal from "../modal/Modal";
import styles from "./settings.module.css";

const SettingsModal = () => {
  const shown = useAppSelector((state) => state.settings.modalShown);
  const dispatch = useAppDispatch();
  const { input: ip } = useInput(WSIPDefault);
  const { input: port } = useInput(WSPortDefault);

  return (
    <Modal
      onClose={() => dispatch(settingsSlice.actions.setModalShown(false))}
      name="Настройки"
      shown={shown}
    >
      <Modal.Contents>
        <div className={styles["SettingsModal-InputGroup"]}>
          <label className={styles["SettingsModal-InputGroup-Label"]}>
            IP:
          </label>
          <input className={styles["SettingsModal-InputGroup-Input"]} {...ip} />
        </div>
        <div className={styles["SettingsModal-InputGroup"]}>
          <label className={styles["SettingsModal-InputGroup-Label"]}>
            PORT:
          </label>
          <input
            className={styles["SettingsModal-InputGroup-Input"]}
            {...port}
          />
        </div>
      </Modal.Contents>
      <Modal.Buttons>
        <div
          className={concatClasses(
            styles["SettingsModal-Button"],
            styles["SettingsModal-Button_teal"]
          )}
          onClick={() => {
            WSSingletone.get().establishConnection(ip.value, port.value);
            dispatch(settingsSlice.actions.setModalShown(false));
          }}
        >
          Сохранить
        </div>
        <div
          className={concatClasses(
            styles["SettingsModal-Button"],
            styles["SettingsModal-Button_gray"]
          )}
          onClick={() => dispatch(settingsSlice.actions.setModalShown(false))}
        >
          Отменить
        </div>
      </Modal.Buttons>
    </Modal>
  );
};

export default SettingsModal;
