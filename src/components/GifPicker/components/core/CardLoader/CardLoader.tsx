import "./CardLoader.css";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";

interface ICardLoader {
    height: number;
}

export const CardLoader: FunctionComponent<ICardLoader> = ({ height }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const [spans, setSpans] = useState<number>(0);

    useEffect(() => {
        getSpans();
    }, []);

    const getSpans = () => {
        if (!cardRef.current) {
            return;
        }

        const spansNeeded = Math.ceil(height / 100);

        setSpans(spansNeeded);
    };

    return (
        <div
            ref={cardRef}
            className="rgp-card-loader"
            style={{ gridRowEnd: `span ${spans}`, height }}
        ></div>
    );
};
