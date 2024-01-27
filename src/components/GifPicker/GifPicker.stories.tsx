import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import GifPicker from "./GifPicker";

import { Gif } from "./models/Gif";

const meta: Meta<typeof GifPicker> = {
    component: GifPicker,
};

export default meta;
type Story = StoryObj<typeof GifPicker>;

// props
const handleSelectedGif = (selectedGif: Gif) => {
    alert(`GIF selected: (${selectedGif.description})`);
};

export const Dev: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={process.env.REACT_APP_TENOR_API_KEY_FOR_DEV as string}
            onSelectGif={handleSelectedGif}
            searchLimit={10}
        />
    ),
};

export const SmallDimension: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={process.env.REACT_APP_TENOR_API_KEY_FOR_DEV as string}
            onSelectGif={handleSelectedGif}
            dimension={{ width: 10, height: 250 }}
        />
    ),
};

export const BigerDimension: Story = {
    render: () => (
        <GifPicker
            tenorApiKey={process.env.REACT_APP_TENOR_API_KEY_FOR_DEV as string}
            onSelectGif={handleSelectedGif}
            dimension={{ width: 550, height: 450 }}
        />
    ),
};
