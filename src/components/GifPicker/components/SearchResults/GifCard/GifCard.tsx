import "./GifCard.css";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";
import { Gif } from "../../../models/Gif";

interface IGifCard {
    gif: Gif;
    onSelectGif: (gif: Gif) => void;
    gifsLoaded: boolean;
    onLoadedGif: () => void;
}

export const GifCard: FunctionComponent<IGifCard> = ({
    gif,
    onSelectGif,
    gifsLoaded,
    onLoadedGif,
}) => {
    const gifCardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const { colors, dimension } = useContext(GifPickerContext);

    const [spans, setSpans] = useState<number>(0);

    useEffect(() => {
        if (!gifCardRef.current) {
            return;
        }

        gifCardRef.current.style.setProperty("--accent-color", colors.accent);
        gifCardRef.current.style.setProperty("--bg-color", colors.background);

        const width = Math.min(dimension.width, window.innerWidth);
        let imageWidth = 110;

        if (width < 300) {
            imageWidth = 100;
        } else if (width < 350) {
            imageWidth = 130;
        } else if (width < 400) {
            imageWidth = 150;
        } else if (width < 450) {
            imageWidth = 120;
        } else if (width < 500) {
            imageWidth = 140;
        }

        gifCardRef.current.style.setProperty(
            "--width-image",
            `${imageWidth}px`
        );
    }, []);

    const getSpans = () => {
        if (!imageRef.current) {
            return;
        }

        const height = imageRef.current.clientHeight;
        const spansNeeded = Math.ceil(height / 10);

        setSpans(spansNeeded);
    };

    const handleOnClick = () => {
        onSelectGif(gif);
    };

    return (
        <div
            ref={gifCardRef}
            className="rgp-gif-card"
            style={{
                cursor: gifsLoaded ? "pointer" : "default",
                gridRowEnd: `span ${spans}`,
            }}
            onClick={handleOnClick}
        >
            <img
                ref={imageRef}
                className="rgp-gif-image"
                src={gif.urlMedia}
                title={gifsLoaded ? gif.description : ""}
                alt={gifsLoaded ? gif.description : ""}
                onLoad={() => {
                    getSpans();
                    onLoadedGif();
                }}
                style={{ opacity: gifsLoaded ? 1 : 0 }}
            />
        </div>
    );
};
