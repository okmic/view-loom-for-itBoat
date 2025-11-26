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
    setSliders(state, action: PayloadAction<{ sliders: ISlide[] }>) {
       state.slides = action.payload.sliders
    },
  }
})

export const { setSliders } = slideSlice.actions
export default slideSlice.reducer
