import React from "react";

const CloseIconSvg = require("./svgs/xmark-solid.svg") as string;

interface ICloseIcon {
    className?: string;
    onClick?: () => void;
}

const CloseIcon = (props: ICloseIcon) => {
    const { className = "", onClick = () => undefined } = props;

    return (
        <img
            className={className}
            src={CloseIconSvg}
            alt="Close"
            onClick={onClick}
        />
    );
};

export default CloseIcon;
