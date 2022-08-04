import React, { useCallback, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/redux";
import { settingsSlice } from "../../store/slices/settingsSlice";
import appPages from "../../variables/pages";
import SettingsButton from "../settings/SettingsButton";
import SettingsModal from "../settings/SettingsModal";
import styles from "./navbar.module.css";
import concatClasses from "../../utils/concatClasses";

const Navbar = () => {
  const curLoc = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const keyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const curPageInd = appPages.findIndex(
          (page) => page.path === curLoc.pathname
        );
        const nextPageInd =
          curPageInd + 1 < appPages.length ? curPageInd + 1 : 0;
        navigate(appPages[nextPageInd].path);
      }
    },
    [curLoc, navigate]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyHandler);

    return () => {
      document.removeEventListener("keyup", keyHandler);
    };
  }, [keyHandler]);

  return (
    <nav className={styles.Navbar}>
      <h1 className={styles["Navbar-Logo-Text"]}>SC Studio</h1>
      <div className={styles["Navbar-Pages"]}>
        {appPages.map((page) => {
          const isActive = curLoc.pathname === page.path ||
          (page.default && curLoc.pathname === "/")
          return (
          <Link
            to={page.path}
            key={page.name}
            className={concatClasses(
              styles["Navbar-Pages-PageLink"],
              styles['Navbar-Pages-PageLink_' + (isActive ? 'active' : 'inactive')]
            )}
          >
            {page.name}
          </Link>
        )})}
      </div>
      <SettingsButton
        onClick={() => dispatch(settingsSlice.actions.setModalShown(true))}
      />
      <SettingsModal />
    </nav>
  );
};

export default Navbar;
