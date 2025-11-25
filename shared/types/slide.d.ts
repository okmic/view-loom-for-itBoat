export interface ISlide {
    createdAt: Date
    updatedAt: Date
    name: string
    audioTimeMarks: number[]
    startScreen: {
        iconImgUrl: string | null
        title: string
        description: string
    }
    Slides: {
        iconImgUrl: string | null
        title: string
        subTitle: string
        list: {
            iconImgUrl: string | null
            title: string
        }[]
    }[]
    mp3Link?: string
}
