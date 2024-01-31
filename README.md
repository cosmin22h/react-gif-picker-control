# Gif Picker React Control

![npm](https://img.shields.io/npm/v/react-gif-picker-control)

![demo](./demo-gif-picker-control.gif)

A React component that offers a GIF picker control with a GIF search engine powered by [Tenor API V2](https://developers.google.com/tenor).

## Prerequirement

You need to provide a Tenor API V2 key in order to use this component. [This](https://developers.google.com/tenor) is where you can obtain the key.

## Installation

```bash
npm install gif-picker-react
```

or

```bash
yarn add gif-picker-react
```

## Usage

```js
import GifPicker from "react-gif-picker-control";

const App = () {
    return (
        <div>
            <GifPicker
                tenorApiKey={"YOUR_API_KEY"}
                onGifClick={"YOUR_FUNCTION_TO_HANDLE_THE_GIF_SELECTION"}
            />
        </div>
    );
}
```

## Props

Required:

| Prop        | Type     | Description                                                                                                   |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| tenorApiKey | string   | Your [Tenor API key](https://developers.google.com/tenor) for powering the GIF search engine                  |
| onGifClick  | function | Callback function triggered when a GIF is clicked. The function has one parameter which is [Gif](#gif) object |
