import { GifPickerContext } from "../../../context/GifPickerContext";
import "./Loader.css";
import React, { FunctionComponent, useContext } from "react";

export const Loader: FunctionComponent = () => {
    const { colors } = useContext(GifPickerContext);

    return (
        <div className="rgp-loader-container">
            <span
                className="rgp-loader"
                style={{
                    borderColor: colors.text,
                    borderBottomColor: colors.accent,
                }}
            ></span>
        </div>
    );
};
