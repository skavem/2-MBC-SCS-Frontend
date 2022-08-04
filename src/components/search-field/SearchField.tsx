import React, { useCallback, useEffect } from "react";

import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { useInput } from "../../hooks/useInput";
import { useDebounce } from "../../hooks/useDebounce";

import styles from "./search-field.module.css";
import concatClasses from "../../utils/concatClasses";

interface ISearchFieldProps {
  className: string;
  onSearch: (data: string) => void;
}

const SearchField = ({ className = "", onSearch }: ISearchFieldProps) => {
  const { input, setValue } = useInput();
  const debounced = useDebounce(input.value);

  const searchVerse = useCallback(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  useEffect(() => {
    searchVerse();
  }, [searchVerse]);

  return (
    <div className={concatClasses(className, styles.SearchField)}>
      <input
        {...input}
        className={concatClasses(
          styles["SearchField-input"],
          styles["SearchField-input_first"]
        )}
        placeholder="Текст или ссылка:"
      />

      <button
        className={concatClasses(
          styles["SearchField-Button"],
          styles["SearchField-Button_middle"]
        )}
        onClick={() => {
          setValue("");
        }}
      >
        <XIcon className="h-5" />
      </button>

      <button
        className={concatClasses(
          styles["SearchField-Button"],
          styles["SearchField-Button_last"]
        )}
        onClick={searchVerse}
      >
        <SearchIcon className="h-5" />
      </button>
    </div>
  );
};

export default SearchField;
