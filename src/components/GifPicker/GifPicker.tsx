import "./GifPicker.css";

import React, {
    FunctionComponent,
    ReactElement,
    useEffect,
    useState,
} from "react";

// context
import {
    gifPickerDefaultContext,
    GifPickerContext,
    IGifPickerContext,
} from "./context/GifPickerContext";

// components
import { SearchBar } from "./components/SearchBar";

// models
import { ColorPalette } from "./models/ColorPalette";
import { Dimension } from "./models/Dimension";
import { Gif } from "./models/Gif";
import { TenorService } from "./services/TenorService";
import { CategoriesList } from "./components/Categories/CategoriesList";

// constants
const searchLimit = 50;
const defaultGifErrorUrl =
    "https://media.tenor.com/OxvVRFnPZO8AAAAC/error-the-simpsons.gif";

interface IGifPicker {
    tenorApiKey: string;
    onSelectGif: (gif: Gif) => void;
    colors?: ColorPalette;
    dimension?: Dimension;
    limit?: number;
    gifErrorUrl?: string;
}

const GifPicker: FunctionComponent<IGifPicker> = ({
    tenorApiKey,
    onSelectGif,
    colors = new ColorPalette(),
    dimension = new Dimension(),
    limit = searchLimit,
    gifErrorUrl = defaultGifErrorUrl,
}) => {
    const [gifPickerContext, setGifPickerContext] = useState<IGifPickerContext>(
        gifPickerDefaultContext
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDobouncedSearchTerm] = useState<string>("");

    useEffect(() => {
        setGifPickerContext({
            tenorAPI: new TenorService(tenorApiKey),
            colors,
            dimension,
            searchLimit: limit,
            gifErrorUrl,
        });
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDobouncedSearchTerm(searchTerm);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const handleOnChangeSearchTerm = (newTerm: string): void => {
        setSearchTerm(newTerm);
    };

    const handleOnClearSearchTerm = (): void => {
        setSearchTerm("");
        setDobouncedSearchTerm("");
    };

    const handleOnSelectTerm = (term: string): void => {
        setSearchTerm(term);
        setDobouncedSearchTerm(term);
    };

    const handleOnSelectGif = (selectedGif: Gif) => {
        handleOnClearSearchTerm();
        onSelectGif(selectedGif);
    };

    const renderList = (): ReactElement => {
        if (debouncedSearchTerm.trim().length === 0) {
            return <CategoriesList onSelectCategory={handleOnSelectTerm} />;
        }

        return <div>Search results</div>;
    };

    return (
        <GifPickerContext.Provider value={gifPickerContext}>
            <div
                className="rgp"
                style={{
                    background: colors.background,
                    color: colors.text,
                    width: dimension.width,
                }}
            >
                <div className="rgp-gif-picker">
                    <div className="rgp-search-bar-container">
                        <SearchBar
                            term={searchTerm}
                            onChange={handleOnChangeSearchTerm}
                            onClear={handleOnClearSearchTerm}
                        />
                    </div>
                    <div
                        className="rgp-divider"
                        style={{
                            background: colors.accent,
                        }}
                    ></div>
                    <div
                        className="rgp-display-result-container"
                        style={{ maxHeight: dimension.height }}
                    >
                        {renderList()}
                    </div>
                </div>
            </div>
        </GifPickerContext.Provider>
    );
};

export default GifPicker;
