import { Schema, model, Model } from 'mongoose'
import { DocSlideType } from "./types"
const SlideSchema = new Schema<DocSlideType>({
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  title1: { type: String, required: true },
  subTitle1: { type: String, required: true },
  title2: { type: String, required: true },
  subTitle2: { type: String, required: true },
  title3: { type: String, required: true },
  subTitle3: { type: String, required: true },
  title4: { type: String, required: true },
  subTitle4: { type: String, required: true },
  footerTitle: { type: String, required: true },
})
interface ISlideModel extends Model<DocSlideType> {}
class SlideService {
  public model = model<DocSlideType, ISlideModel>('Slide', SlideSchema)
}
export const Slide = new SlideService()
