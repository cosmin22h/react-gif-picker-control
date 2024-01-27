import { GifPickerContext } from "../../../context/GifPickerContext";
import "./Tag.css";
import React, { FunctionComponent, useContext, useEffect, useRef } from "react";

interface ITag {
    label: string;
    onClickTag: (tagLabel: string) => void;
}

export const Tag: FunctionComponent<ITag> = ({ label, onClickTag }) => {
    const tagRef = useRef<HTMLDivElement>(null);

    const { colors } = useContext(GifPickerContext);

    useEffect(() => {
        if (!tagRef.current) {
            return;
        }

        tagRef.current.style.setProperty("--accent-color", colors.accent);
        tagRef.current.style.setProperty("--bg-color", colors.primary);
    }, []);

    const handleOnClick = () => {
        onClickTag(label);
    };

    return (
        <div ref={tagRef} className="rgp-tag" onClick={handleOnClick}>
            {label}
        </div>
    );
};
