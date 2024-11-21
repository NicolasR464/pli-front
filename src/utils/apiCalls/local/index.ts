import { localInstance } from '@/utils/axiosInstances/local'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type {
    EmailParams,
    EmailResponse,
    ImageAnalysisResponse,
    ProductAnalysisResponse,
    ProductDataParams,
} from '@/types/mutations/local'

import type { AxiosResponse } from 'axios'

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
export const sendEmail = async ({
    contentData,
    emailType,
}: EmailParams): Promise<EmailResponse> => {
    const response: AxiosResponse<EmailResponse> = await localInstance.post(
        apiEndpoints.local.SEND_EMAIL,
        {
            contentData,
            emailType,
        },
    )

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.local.SEND_EMAIL}`)

    return response.data
}
