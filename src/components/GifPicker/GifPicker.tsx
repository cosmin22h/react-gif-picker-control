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
import { SearchResultsList } from "./components/SearchResults/SearchResultsList";
import { ErrorLayout } from "./components/core/ErrorLayout";

// constants
const defaultSearchLimit = 50;
const defaultImageErrorUrl =
    "https://media.tenor.com/OxvVRFnPZO8AAAAC/error-the-simpsons.gif";
const defaultImageNoResultsUrl =
    "https://media.tenor.com/jJHoqBHOqVkAAAAC/animated-cartoon.gif";
const defaultWidth = 350;
const defaultHeight = 450;

interface IGifPicker {
    tenorApiKey: string;
    onGifClick: (gif: Gif) => void;
    colors?: ColorPalette;
    width?: number;
    height?: number;
    searchLimit?: number;
    imageErrorUrl?: string;
    imageNoResultsUrl?: string;
    hideCategories?: boolean;
    autoFocus?: boolean;
}

const GifPicker: FunctionComponent<IGifPicker> = ({
    tenorApiKey,
    onGifClick,
    colors = new ColorPalette(),
    width = defaultWidth,
    height = defaultHeight,
    searchLimit = defaultSearchLimit,
    imageErrorUrl = defaultImageErrorUrl,
    imageNoResultsUrl = defaultImageNoResultsUrl,
    hideCategories = false,
    autoFocus = true,
}) => {
    if (!tenorApiKey || !onGifClick) {
        return (
            <div
                style={{
                    background: colors.primary,
                }}
            >
                <ErrorLayout errorMessage="You need to provide the following props: tenorApiKey and onSelectedGif" />
            </div>
        );
    }

    const containerW = width < 150 ? 150 : width > 500 ? 500 : width;
    const containerH = height > 500 ? 500 : height;

    const [gifPickerContext, setGifPickerContext] = useState<IGifPickerContext>(
        gifPickerDefaultContext
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDobouncedSearchTerm] = useState<string>("");

    useEffect(() => {
        setGifPickerContext({
            tenorAPI: new TenorService(tenorApiKey),
            colors,
            dimension: new Dimension(containerW, containerH),
            searchLimit,
            imageErrorUrl,
            imageNoResultsUrl,
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
        onGifClick(selectedGif);
    };

    const renderList = (): ReactElement => {
        if (gifPickerContext.tenorAPI === null) {
            return null;
        }

        if (debouncedSearchTerm.trim().length === 0) {
            return (
                !hideCategories && (
                    <CategoriesList onSelectCategory={handleOnSelectTerm} />
                )
            );
        }

        return (
            <SearchResultsList
                searchTerm={debouncedSearchTerm}
                onSelectTag={handleOnSelectTerm}
                onSelectGif={handleOnSelectGif}
            />
        );
    };

    return (
        <GifPickerContext.Provider value={gifPickerContext}>
            <div
                className="rgp"
                style={{
                    background: colors.background,
                    color: colors.text,
                    width: containerW,
                }}
            >
                <div className="rgp-gif-picker">
                    <div className="rgp-search-bar-container">
                        <SearchBar
                            term={searchTerm}
                            onChange={handleOnChangeSearchTerm}
                            onClear={handleOnClearSearchTerm}
                            autoFocus={autoFocus}
                        />
                    </div>
                    {(!hideCategories ||
                        debouncedSearchTerm.trim().length > 0) && (
                        <div
                            className="rgp-divider"
                            style={{
                                background: colors.accent,
                            }}
                        ></div>
                    )}
                    <div
                        className="rgp-display-result-container"
                        style={{ maxHeight: containerH }}
                    >
                        {renderList()}
                    </div>
                </div>
            </div>
        </GifPickerContext.Provider>
    );
};

export default GifPicker;
