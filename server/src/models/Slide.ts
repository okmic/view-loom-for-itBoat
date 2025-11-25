import { Schema, model, Model } from 'mongoose'
import { DocSlideType } from "./types"
const SlideSchema = new Schema<DocSlideType>({
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
  startScreen: {
    iconImgUrl: { type: String, required: false, default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  Slide1: {
    iconImgUrl: { type: String, required: false, default: null },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
  },
  Slides: [
    {
      iconImgUrl: { type: String, required: false, default: null },
      title: { type: String, required: true },
      subTitle: { type: String, required: true },
      list: [ { 
        iconImgUrl: { type: String, required: false, default: null },
        type: String, required: true,
      } ],
    }
  ]
})
interface ISlideModel extends Model<DocSlideType> {}
class SlideService {
  public model = model<DocSlideType, ISlideModel>('Slide', SlideSchema)
}
export const Slide = new SlideService()
