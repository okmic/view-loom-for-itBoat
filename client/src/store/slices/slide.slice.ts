import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ISlide } from '../../../../shared/types/slide'

interface SlideState {
  slides: ISlide[]
}

const initialState: SlideState = {
  slides: []
}

const slideSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {
    setSlides(state, action: PayloadAction<{ slides: ISlide[] }>) {
       state.slides = action.payload.slides
    },
  }
})

export const { setSlides } = slideSlice.actions
export default slideSlice.reducer
