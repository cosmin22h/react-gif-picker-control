import React from "react";

const SearchIconSvg = require("./svgs/magnifying-glass-solid.svg") as string;

interface ISearchIcon {
    className?: string;
}

const SearchIcon = (props: ISearchIcon) => {
    const { className = "" } = props;

    return <img className={className} src={SearchIconSvg} alt="Search" />;
};

export default SearchIcon;
