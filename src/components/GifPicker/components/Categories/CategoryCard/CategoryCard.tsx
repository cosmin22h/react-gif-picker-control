import "./CategoryCard.css";
import React, { FunctionComponent, useContext, useEffect, useRef } from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";

import { Category } from "../../../models/Category";

interface ICategoryCard {
    category: Category;
    onSelectCategory: (category: Category) => void;
}

export const CategoryCard: FunctionComponent<ICategoryCard> = ({
    category,
    onSelectCategory,
}) => {
    const categoryCardRef = useRef<HTMLDivElement>(null);

    const { dimension, colors } = useContext(GifPickerContext);

    useEffect(() => {
        if (!categoryCardRef.current) {
            return;
        }

        categoryCardRef.current.style.setProperty(
            "--background-image",
            `url(${category.image}) no-repeat center center / cover`
        );
        categoryCardRef.current.style.setProperty(
            "--accent-color",
            colors.accent
        );
        categoryCardRef.current.style.setProperty(
            "--bg-color",
            colors.background
        );

        const widthCard = Math.min(dimension.width, window.innerWidth);
        const heightCard = `${widthCard < 300 ? 50 : 120}px`;

        categoryCardRef.current.style.setProperty("--hCard", heightCard);
    }, []);

    const handleOnSelectCategory = (): void => {
        onSelectCategory(category);
    };

    return (
        <div
            ref={categoryCardRef}
            className="rgp-category-card"
            title={category.name}
            onClick={handleOnSelectCategory}
            style={{ background: colors.primary }}
        >
            <div className="rgp-title">{category.name}</div>
        </div>
    );
};
