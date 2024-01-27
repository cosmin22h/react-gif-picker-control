import { createContext } from "react";

import { ColorPalette } from "../models/ColorPalette";
import { Dimension } from "../models/Dimension";

import { TenorService } from "../services/TenorService";

export const gifPickerDefaultContext = {
    tenorAPI: new TenorService(""),
    colors: new ColorPalette(),
    dimension: new Dimension(),
    searchLimit: 0,
    gifErrorUrl: "",
};

export interface IGifPickerContext {
    tenorAPI: TenorService;
    colors: ColorPalette;
    dimension: Dimension;
    searchLimit: number;
    gifErrorUrl: string;
}

export const GifPickerContext = createContext<IGifPickerContext>(
    gifPickerDefaultContext
);
