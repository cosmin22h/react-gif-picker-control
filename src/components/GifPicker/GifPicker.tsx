import React from 'react'

interface IGifPicker {
  tenorApiKey: string
}

const GifPicker = (props: IGifPicker) => {
  const { tenorApiKey } = props

  return <h1>GIF Picker - tenor key: {tenorApiKey}</h1>
}

export default GifPicker
