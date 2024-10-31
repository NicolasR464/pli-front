import type { ProductDataParams } from './mutations'

import { localInstance } from '@/utils/axiosInstances/local'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { Article } from '@/types/article'

import type { AxiosResponse } from 'axios'

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

type ProductAnalysis = {
    productName: string
    estimatedValue: number
}

export type ProductAnalysisResponse = {
    message: string
    content: ProductAnalysis
}

export type EmailParams = {
    senderEmail: string
    receiverEmail: string
    article: Partial<Article>
}

export type EmailResponse = {
    message: string
}

/**
 * Store and analyze an image by sending it to the local instance.
 * @param {File} file - The image file to be analyzed.
 * @returns {Promise<AnalysisResponse>} A promise that resolves to the analysis response.
 * @throws {Error} If the image analysis fails.
 */
export const analyzeImage = async (
    file: File,
): Promise<ImageAnalysisResponse> => {
    const response: AxiosResponse<ImageAnalysisResponse> =
        await localInstance.postForm(apiEndpoints.local.IMAGE_ANALYSIS, {
            file,
        })

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.local.IMAGE_ANALYSIS}`)

    return response.data
}

/**
 * Analyze an the form content for the product data by sending it to the local instance.
 * @param {FormData} formData - The form data to be analyzed.
 * @returns {Promise<ImageAnalysisResponse>} A promise that resolves to the analysis response.
 * @throws {Error} If the image analysis fails.
 */
export const analyzeProductData = async (
    formData: ProductDataParams,
): Promise<ProductAnalysisResponse> => {
    const response: AxiosResponse<ProductAnalysisResponse> =
        await localInstance.postForm(apiEndpoints.local.PRODUCT_ANALYSIS, {
            formData,
        })

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.local.PRODUCT_ANALYSIS}`,
        )

    return response.data
}

/**
 * Send an email by sending it to the local instance.
 * @param {FormData} formData - The form data to be sent.
 * @returns {Promise<EmailResponse>} A promise that resolves to the email response.
 * @throws {Error} If the email sending fails.
 */
export const sendEmail = async (
    formData: EmailParams,
): Promise<EmailResponse> => {
    const params = new URLSearchParams()
    params.append('senderEmail', formData.senderEmail)
    params.append('receiverEmail', formData.receiverEmail)
    params.append('article', JSON.stringify(formData.article))

    const response: AxiosResponse<EmailResponse> = await localInstance.post(
        apiEndpoints.SEND_EMAIL,
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    )

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.SEND_EMAIL}`)

    return response.data
}
