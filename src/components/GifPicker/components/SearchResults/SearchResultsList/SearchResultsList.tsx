import "./SearchResultsList.css";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";

import { Gif } from "../../../models/Gif";

import { ErrorLayout } from "../../core/ErrorLayout";
import { Loader } from "../../core/Loader";
import { Tag } from "../../core/Tag";
import { GifCard } from "../GifCard";
import { NoResults } from "../NoResults";

const suggestionsMessage =
    "Haven't found what you're looking for? Try one of the suggested keywords below!";

interface ISearchResultsList {
    searchTerm: string;
    onSelectGif: (gif: Gif) => void;
    onSelectTag: (tag: string) => void;
}

export const SearchResultsList: FunctionComponent<ISearchResultsList> = ({
    searchTerm,
    onSelectGif,
    onSelectTag,
}) => {
    const resultsListRef = useRef<HTMLDivElement>(null);

    const { tenorAPI, colors, dimension } = useContext(GifPickerContext);

    const [searchGifResults, setSearchGifResults] = useState<Gif[]>([]);
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (isLoading || !resultsListRef.current) {
            return;
        }
        resultsListRef.current.style.setProperty(
            "--scrollbar-color",
            colors.accent
        );

        const width = Math.min(dimension.width, window.innerWidth);
        let gridColumns = 4;
        let gridColumnFooter = 5;

        if (width < 400) {
            gridColumns = 2;
            gridColumnFooter = 3;
        } else if (width < 490) {
            gridColumns = 3;
            gridColumnFooter = 4;
        }

        resultsListRef.current.style.setProperty(
            "--no-columns",
            gridColumns.toString()
        );
        resultsListRef.current.style.setProperty(
            "--grid-column-footer",
            gridColumnFooter.toString()
        );
    }, [isLoading]);

    useEffect(() => {
        const getResults = async (term: string) => {
            try {
                setIsLoading(true);

                const [rResults, rSearchSuggestions] = await Promise.all([
                    tenorAPI.search(term),
                    tenorAPI.getSearchSuggestion(term),
                ]);

                let suggestions = rSearchSuggestions;

                if (suggestions.length === 0) {
                    suggestions = await tenorAPI.getTrendingSearchTerms();
                }

                setSearchGifResults(rResults);
                setSearchSuggestions(suggestions);
                setIsError(false);
            } catch (err) {
                console.error("Search Error", err);

                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getResults(searchTerm);

        const timer = setTimeout(() => {
            if (!resultsListRef.current) {
                return;
            }

            resultsListRef.current.scrollTo(0, 0);
        }, 0.1);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm]);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorLayout />;
    }

    const handleOnSelectGif = (selectedGif: Gif) => {
        onSelectGif(selectedGif);
    };

    const renderGifResults = () => {
        return searchGifResults.map((gif) => {
            return (
                <GifCard
                    key={gif.id}
                    gif={gif}
                    onSelectGif={handleOnSelectGif}
                />
            );
        });
    };

    const renderTags = () => {
        return searchSuggestions.map((suggestion) => (
            <Tag key={suggestion} label={suggestion} onClickTag={onSelectTag} />
        ));
    };

    const renderList = () => {
        if (searchGifResults.length === 0) {
            return <NoResults onSelectTag={onSelectTag} />;
        }

        return (
            <div className="rgp-search-results-container">
                {renderGifResults()}
                <div className="rgp-footer">
                    <h4
                        className="rgp-footer-message"
                        style={{ color: colors.accent }}
                    >
                        {suggestionsMessage}
                    </h4>
                    <div className="rgp-tags">{renderTags()}</div>
                </div>
            </div>
        );
    };

    return (
        <div ref={resultsListRef} className="rgp-search-results">
            {renderList()}
        </div>
    );
};
