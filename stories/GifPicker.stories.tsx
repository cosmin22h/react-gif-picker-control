import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import GifPicker from "../src/components/GifPicker/GifPicker";

import { Gif } from "../src/components/GifPicker/models/Gif";

const meta: Meta<typeof GifPicker> = {
    component: GifPicker,
};

export default meta;
type Story = StoryObj<typeof GifPicker>;

// props
const handleSelectedGif = (selectedGif: Gif) => {
    console.log(selectedGif);
};

export const Dev: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={
                process.env.REACT_APP_TENOR_API_V2_KEY_FOR_DEV as string
            }
            onGifClick={handleSelectedGif}
            searchLimit={20}
        />
    ),
};

export const SmallDimension: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={
                process.env.REACT_APP_TENOR_API_V2_KEY_FOR_DEV as string
            }
            onGifClick={handleSelectedGif}
            containerDimensions={{ width: 10, height: 250 }}
        />
    ),
};

export const MidDimension: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={
                process.env.REACT_APP_TENOR_API_V2_KEY_FOR_DEV as string
            }
            onGifClick={handleSelectedGif}
            containerDimensions={{ width: 450, height: 450 }}
        />
    ),
};

export const BigDimension: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={
                process.env.REACT_APP_TENOR_API_V2_KEY_FOR_DEV as string
            }
            onGifClick={handleSelectedGif}
            containerDimensions={{ width: 700, height: 450 }}
        />
    ),
};

export const HideCategories: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={
                process.env.REACT_APP_TENOR_API_V2_KEY_FOR_DEV as string
            }
            onGifClick={handleSelectedGif}
            containerDimensions={{ width: 350, height: 450 }}
            hideCategories={true}
        />
    ),
};
