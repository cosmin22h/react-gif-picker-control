import "./CategoriesList.css";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { GifPickerContext } from "../../../context/GifPickerContext";

import { Category } from "../../../models/Category";

import { Loader } from "../../core/Loader";
import { ErrorLayout } from "../../core/ErrorLayout";
import { CategoryCard } from "../CategoryCard";

interface ICategoriesList {
    onSelectCategory: (categoryName: string) => void;
}

export const CategoriesList: FunctionComponent<ICategoriesList> = ({
    onSelectCategory,
}) => {
    const categoryListRef = useRef<HTMLDivElement>(null);

    const { tenorAPI, dimension, colors } = useContext(GifPickerContext);

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                setIsLoading(true);

                const rCategories = await tenorAPI.getCategories();

                setCategories(rCategories);
                setIsError(false);
            } catch (error) {
                console.error("[Get Categories Error]", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getCategories();
    }, []);

    useEffect(() => {
        if (!isLoading && categoryListRef.current) {
            categoryListRef.current.style.setProperty(
                "--scrollbar-color",
                colors.accent
            );

            const width = Math.min(dimension.width, window.innerWidth);
            const gridColumns = width < 450 ? 2 : 3;

            categoryListRef.current.style.setProperty(
                "--no-columns",
                gridColumns.toString()
            );
        }
    }, [isLoading]);

    const handleOnSelectCategory = (category: Category) => {
        onSelectCategory(category.name);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorLayout />;
    }

    const renderCategories = () => {
        return categories.map((category) => (
            <CategoryCard
                key={category.name}
                category={category}
                onSelectCategory={handleOnSelectCategory}
            />
        ));
    };

    return (
        <div ref={categoryListRef} className="rgp-categories-list">
            {renderCategories()}
        </div>
    );
};
