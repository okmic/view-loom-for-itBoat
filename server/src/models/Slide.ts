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
  Slides: [
    {
      iconImgUrl: { type: String, required: false, default: null },
      title: { type: String, required: true },
      subTitle: { type: String, required: true },
      list: [
        { 
        title: { type: String, required: true, },
        iconImgUrl: { type: String, required: false, default: null },
        }
      ],
    }
  ]
})
interface ISlideModel extends Model<DocSlideType> {}
class SlideService {
  public model = model<DocSlideType, ISlideModel>('Slide', SlideSchema)
}
export const Slide = new SlideService()
