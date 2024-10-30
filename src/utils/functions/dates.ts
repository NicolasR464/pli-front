import type { ISO8601DateTime } from '@/types'

/**
 * Returns the current date.
 * @returns {ISO8601DateTime} The current date.
 */
export const getPresentDate = (): ISO8601DateTime => {
    return new Date().toISOString() as ISO8601DateTime
}

/**
 * Formats a given date string into a more readable format.
 *
 * This function takes a date string, converts it into a Date object,
 * and then formats it according to specified options. The resulting
 * date is returned as a string in the format "day month year" (e.g., "26 octobre 2024").
 * @param {string} date - The input date string to format. It should be a valid date format
 * compatible with the JavaScript Date object.
 * @returns {string} A formatted date string in "day month year" format.
 * @example
 * const formattedDate = formatDate('2024-10-26T12:00:00Z');
 * Returns: "26 octobre 2024"
 */
export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('fr-FR', options)
}
