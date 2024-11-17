import type { Article } from '@/types/article'
import type { EmailType } from '@/types/index'
import type { Transaction } from '@/types/transaction'
import type { PartialArticleFields } from '@/types/transaction/actions'
import type { User } from '@/types/user'

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

/**
 * Data to be used in the email template, should be flexible.
 */
export type EmailParams = {
    contentData: {
        userA?: Partial<User>
        userB?: Partial<User>
        articleA?: PartialArticleFields
        articleB?: PartialArticleFields
        transactionID?: string
    }
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
