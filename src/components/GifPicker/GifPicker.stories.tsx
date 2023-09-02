import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import GifPicker from './GifPicker'

const meta: Meta<typeof GifPicker> = {
  component: GifPicker
}

export default meta
type Story = StoryObj<typeof GifPicker>

export const Dev: Story = {
  render: () => (
    <GifPicker
      tenorApiKey={process.env.REACT_APP_TENOR_API_KEY_FOR_DEV as string}
    />
  )
}
