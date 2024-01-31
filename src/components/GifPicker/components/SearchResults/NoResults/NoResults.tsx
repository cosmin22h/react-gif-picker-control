import "./NoResults.css";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";

import { ErrorLayout } from "../../core/ErrorLayout";
import { Loader } from "../../core/Loader";
import { Tag } from "../../core/Tag";

const noResultsMessage =
    "I haven't found anything. Please try one of the suggested keywords below!";

interface INoResults {
    onSelectTag: (tag: string) => void;
}

export const NoResults: FunctionComponent<INoResults> = ({ onSelectTag }) => {
    const noResultsRef = useRef<HTMLDivElement>(null);

    const { tenorAPI, gifNoResultsUrl, colors, dimension } =
        useContext(GifPickerContext);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [trendingTerms, setTrendingTerms] = useState<string[]>([]);

    useEffect(() => {
        if (!noResultsRef.current) {
            return;
        }

        const width = Math.min(dimension.width, window.innerWidth);
        let widthMedia = 300;

        if (width < 350) {
            widthMedia = 130;
        } else if (width < 400) {
            widthMedia = 250;
        }

        noResultsRef.current.style.setProperty(
            "--width-media",
            `${widthMedia}px`
        );
    }, [isLoading]);

    useEffect(() => {
        const getTrendingTerms = async () => {
            try {
                setIsLoading(true);

                const rTrendingTerms = await tenorAPI.getTrendingSearchTerms();

                setTrendingTerms(rTrendingTerms);
                setIsError(false);
            } catch (err) {
                console.error("[Trending Terms Error]", err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getTrendingTerms();
    }, []);

    if (isLoading) {
        return <Loader type={1} />;
    }

    if (isError) {
        return <ErrorLayout />;
    }

    const renderTags = () => {
        return trendingTerms.map((term) => (
            <Tag key={term} label={term} onClickTag={onSelectTag} />
        ));
    };

    return (
        <div ref={noResultsRef} className="rgp-no-results-layout">
            <h2
                className="rgp-no-results-header"
                style={{ color: colors.accent }}
            >
                404
            </h2>
            <img
                className="rgp-media-content"
                src={gifNoResultsUrl}
                alt="No results"
                title="Nothing happens"
                loading="lazy"
            />
            <h4 className="rgp-footer" style={{ color: colors.accent }}>
                {noResultsMessage}
            </h4>
            <div className="rgp-tags">{renderTags()}</div>
        </div>
    );
};
