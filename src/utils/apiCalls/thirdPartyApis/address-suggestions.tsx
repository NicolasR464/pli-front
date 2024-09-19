'use server'

import type {
    AddressSuggestion,
    ApiGouvFeature,
    ApiGouvResponse,
} from '@/types/address/gouvApiCall'

import { apiEndpoints } from '../../constants/endpoints'
import axios from 'axios'

/**
 * Handles address suggestion requests.
 * @param {string} input - The input string for address suggestions.
 * @returns {Promise<AddressSuggestion[]>} A promise that resolves to an array of address suggestions.
 */
export const getAddressSuggestions = async (
    input: string,
): Promise<AddressSuggestion[] | undefined> => {
    const response = await axios.get(apiEndpoints.ADDRESS_SUGGESTIONS, {
        params: {
            q: encodeURIComponent(input),
            limit: 15,
        },
    })

    const suggestions: AddressSuggestion[] = (
        response.data as ApiGouvResponse
    ).features.map((feature: ApiGouvFeature) => ({
        label: feature.properties.label,
        properties: {
            street: feature.properties.street,
            city: feature.properties.city,
            postcode: feature.properties.postcode,
            citycode: feature.properties.citycode,
            geopoints: feature.geometry,
        },
    }))

    if (response.status !== 200)
        throw new Error('Address suggestions could not be fetched')

    return suggestions
}
