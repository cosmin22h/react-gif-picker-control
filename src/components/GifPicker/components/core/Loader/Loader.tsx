import "./Loader.css";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";
import { CardLoader } from "../CardLoader";

interface ILoader {
    type: number;
}

export const Loader: FunctionComponent<ILoader> = ({ type }) => {
    const loaderRef = useRef<HTMLDivElement>(null);

    const { colors, dimension } = useContext(GifPickerContext);

    const [noColumns, setNoColumns] = useState<number>(0);

    useEffect(() => {
        if (!loaderRef.current) {
            return;
        }

        loaderRef.current.style.setProperty("--scrollbar-color", colors.accent);

        const width = Math.min(dimension.width, window.innerWidth);
        let gridColumns = type === 0 ? 3 : 4;

        if (type === 0) {
            if (width < 250) {
                gridColumns = 1;
            } else if (width < 450) {
                gridColumns = 2;
            }
        } else {
            if (width < 450) {
                gridColumns = 2;
            } else if (width < 250) {
                gridColumns = 1;
            } else if (width < 400) {
                gridColumns = 2;
            } else if (width < 490) {
                gridColumns = 3;
            }
        }

        loaderRef.current.style.setProperty(
            "--no-columns",
            gridColumns.toString()
        );

        setNoColumns(gridColumns);
    }, [dimension]);

    const renderCardsLoader = () => {
        return Array.from(
            { length: (dimension.height / 100) * noColumns },
            (_, index) => {
                return <CardLoader key={index} height={100} />;
            }
        );
    };

    return (
        <div
            ref={loaderRef}
            className="rgp-loader"
            style={{ height: dimension.height }}
        >
            <div className="rgp-loader-container">{renderCardsLoader()}</div>
        </div>
    );
};
