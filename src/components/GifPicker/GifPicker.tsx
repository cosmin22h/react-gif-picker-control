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
const defaultGifErrorUrl =
    "https://media.tenor.com/OxvVRFnPZO8AAAAC/error-the-simpsons.gif";
const defaultNoResultsGifUrl =
    "https://media.tenor.com/jJHoqBHOqVkAAAAC/animated-cartoon.gif";

interface IGifPicker {
    tenorApiKey: string;
    onGifClick: (gif: Gif) => void;
    colors?: ColorPalette;
    containerDimensions?: Dimension;
    searchLimit?: number;
    gifErrorUrl?: string;
    gifNoResultsUrl?: string;
    hideCategories?: boolean;
    autoFocus?: boolean;
}

const GifPicker: FunctionComponent<IGifPicker> = ({
    tenorApiKey,
    onGifClick,
    colors = new ColorPalette(),
    containerDimensions: dimension = new Dimension(),
    searchLimit = defaultSearchLimit,
    gifErrorUrl = defaultGifErrorUrl,
    gifNoResultsUrl = defaultNoResultsGifUrl,
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

    const [gifPickerContext, setGifPickerContext] = useState<IGifPickerContext>(
        gifPickerDefaultContext
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDobouncedSearchTerm] = useState<string>("");

    useEffect(() => {
        if (dimension.width < 150) {
            dimension.width = 150;
        }

        if (dimension.width > 500) {
            dimension.width = 500;
        }

        setGifPickerContext({
            tenorAPI: new TenorService(tenorApiKey),
            colors,
            dimension: dimension,
            searchLimit,
            gifErrorUrl,
            gifNoResultsUrl,
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
                    width: dimension.width,
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
