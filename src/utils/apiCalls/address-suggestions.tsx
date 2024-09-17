'use server'
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'

/**
 * Handles address suggestion requests.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
// eslint-disable-next-line import/no-anonymous-default-export
export const getAddressSuggestions = async (input): Promise<void> => {
    try {
        const response = await axios.get(
            `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
                input,
            )}&limit=15`,
        )

        interface FeatureProperties {
            label: string
            context: string
        }

        const suggestions = response.data.features.map(
            (feature: { properties: FeatureProperties }) => ({
                label: feature.properties.label,
                context: feature.properties.context,
            }),
        )

        return suggestions
    } catch (error) {
        console.error('Error fetching address suggestions:', error)
    }
}
