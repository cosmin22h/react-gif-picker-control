import React, { useState } from "react";

// models
import { ColorPalette } from "./models/ColorPalette";
import { Dimension } from "./models/Dimension";
import { Gif } from "./models/Gif";
import { TenorService } from "./services/TenorService";

interface IGifPicker {
    tenorApiKey: string;
    onSelectGif: (gif: Gif) => void;
    colors?: ColorPalette;
    dimension?: Dimension;
    limit?: number;
}

const GifPicker = (props: IGifPicker) => {
    const {
        tenorApiKey,
        onSelectGif,
        colors = new ColorPalette(),
        dimension = new Dimension(),
        limit = 50,
    } = props;
    const [tenorService] = useState<TenorService>(
        new TenorService(tenorApiKey)
    );

    return (
        <>
            <h1>GIF Picker</h1>
        </>
    );
};

export default GifPicker;
