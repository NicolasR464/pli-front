import type { Article } from '../article'
import type { EmailType } from '../index'

export type ImageAnalysis = {
    imageUrl: string
    brand: string
    tags: string[]
    objectIdentified: string
    category: string
    subCategory: string
    state: string
}

export type ImageAnalysisResponse = {
    message: string
    content: ImageAnalysis
}

export type ProductAnalysis = {
    productName: string
    estimatedValue: number
}

export type ProductAnalysisResponse = {
    message: string
    content: ProductAnalysis
}

export type EmailParams = {
    contentData: unknown
    emailType: EmailType
}

export type EmailResponse = {
    message: string
}

export type UploadImageParams = {
    file: File
}

export type ProductDataParams = {
    formData: Partial<Article> & {
        analysedImageData?: Partial<ImageAnalysis>
    }
}
