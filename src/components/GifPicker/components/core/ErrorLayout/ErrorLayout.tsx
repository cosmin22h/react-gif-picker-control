import "./ErrorLayout.css";
import React, { FunctionComponent, useContext } from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";

const defaultErrorMessage = "Something went wrong!";

interface IErrorLayout {
    errorMessage?: string;
}

export const ErrorLayout: FunctionComponent<IErrorLayout> = ({
    errorMessage = defaultErrorMessage,
}) => {
    const { gifErrorUrl, colors } = useContext(GifPickerContext);

    return (
        <div className="rgp-error-layout">
            <h4 className="rgp-error-header" style={{ color: colors.accent }}>
                {errorMessage}
            </h4>
            {gifErrorUrl.length > 0 && (
                <img
                    className="rgp-error-media-content"
                    src={gifErrorUrl}
                    alt={errorMessage}
                    title="Error"
                    loading="lazy"
                />
            )}
        </div>
    );
};
