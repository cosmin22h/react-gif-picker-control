import { createContext } from "react";

import { ColorPalette } from "../models/ColorPalette";
import { Dimension } from "../models/Dimension";

import { TenorService } from "../services/TenorService";

export const GF_CONTEXT_DEFAULT_VALUE = {
    tenorAPI: undefined,
    colors: new ColorPalette(),
    dimension: new Dimension(),
    searchLimit: 0,
};

export interface IGifPickerContext {
    tenorAPI: TenorService | undefined;
    colors: ColorPalette;
    dimension: Dimension;
    searchLimit: number;
}

export const GifPickerContext = createContext<IGifPickerContext>(
    GF_CONTEXT_DEFAULT_VALUE
);
