'use client'

import type {
    EmailParams,
    EmailResponse,
    ImageAnalysisResponse,
    ProductAnalysisResponse,
    ProductDataParams,
    UploadImageParams,
} from '@/types/mutations/local'

import { analyzeImage, analyzeProductData, sendEmail } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook for storing and analyzing the content of an image using React Query's useMutation.
 * @returns {UseMutationResult} A mutation result object for storing and analyzing an image with Cloudinary and Azure Cognitive Services.
 */
export const useImageAnalysis = (): UseMutationResult<
    ImageAnalysisResponse,
    Error,
    UploadImageParams
> => {
    return useMutation<ImageAnalysisResponse, Error, UploadImageParams>({
        mutationFn: ({ file }) => analyzeImage(file),
    })
}

/**
 * Custom hook for analyzing the content of the product using React Query's useMutation.
 * @returns {UseMutationResult} A mutation result object for sending back the product analysis and value.
 */
export const useProductDataAnalysis = (): UseMutationResult<
    ProductAnalysisResponse,
    Error,
    ProductDataParams
> => {
    return useMutation<ProductAnalysisResponse, Error, ProductDataParams>({
        mutationFn: (formData) => analyzeProductData(formData),
    })
}

/**
 * Custom hook for sending an email to a user (for anything, transaction requests, etc.) by using React Query's useMutation.
 */
export const useSendEmail = (): UseMutationResult<
    EmailResponse,
    Error,
    EmailParams
> => {
    return useMutation<EmailResponse, Error, EmailParams>({
        mutationFn: (data) => sendEmail(data),
    })
}
