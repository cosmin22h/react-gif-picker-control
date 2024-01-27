import "./SearchBar.css";
import React, { ChangeEvent, FunctionComponent, useContext } from "react";

import { GifPickerContext } from "../../context/GifPickerContext";
import CloseIcon from "../../icons/CloseIcon";
import SearchIcon from "../../icons/SearchIcon";

interface ISearchBar {
    term: string;
    onChange: (newTerm: string) => void;
    onClear: () => void;
}

export const SearchBar: FunctionComponent<ISearchBar> = ({
    term,
    onChange,
    onClear,
}) => {
    const { colors, dimension } = useContext(GifPickerContext);

    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        onChange(event.target.value);
    };

    return (
        <div className="rgp-search-bar" style={{ background: colors.primary }}>
            <input
                className="rgp-search-input"
                value={term}
                onChange={handleOnChangeInput}
                placeholder="Search GIF"
                style={{ color: colors.text }}
            />
            {term.length > 0 ? (
                <CloseIcon color={colors.accent} onClick={onClear} />
            ) : (
                <SearchIcon color={colors.accent} />
            )}
        </div>
    );
};
