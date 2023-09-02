import React from "react";

// models
import { ColorPalette } from "./models/ColorPalette";
import { Dimension } from "./models/Dimension";
import { Gif } from "./models/Gif";

interface IGifPicker {
    tenorApiKey: string;
    onSelectGif: (gif: Gif) => void;
    dimension?: Dimension;
    colors?: ColorPalette;
}

const GifPicker = (props: IGifPicker) => {
    const { tenorApiKey, onSelectGif, dimension, colors } = props;

    return (
        <>
            <h1>GIF Picker</h1>
        </>
    );
};

export default GifPicker;
