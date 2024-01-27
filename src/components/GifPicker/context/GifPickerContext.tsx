import { createContext } from "react";

import { ColorPalette } from "../models/ColorPalette";
import { Dimension } from "../models/Dimension";

import { TenorService } from "../services/TenorService";

export const gifPickerDefaultContext = {
    tenorAPI: null,
    colors: new ColorPalette(),
    dimension: new Dimension(),
    searchLimit: 0,
};

export interface IGifPickerContext {
    tenorAPI: TenorService | null;
    colors: ColorPalette;
    dimension: Dimension;
    searchLimit: number;
}

export const GifPickerContext = createContext<IGifPickerContext>(
    gifPickerDefaultContext
);
