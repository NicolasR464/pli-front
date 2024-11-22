import { formatDate, getPresentDate } from '@/utils/functions/dates'

describe('getPresentDate', () => {
    test('should return the current date in ISO8601 format', () => {
        const result = getPresentDate()
        const currentDate = new Date().toISOString()

        // Vérifie si la date renvoyée correspond au début de l'ISO actuel (par ex., "2024-11-22T")
        expect(result.startsWith(currentDate.slice(0, 10))).toBe(true)

        // Vérifie si le format correspond bien à l'ISO8601
        expect(() => new Date(result)).not.toThrow()
        expect(new Date(result).toISOString()).toEqual(result)
    })
})

describe('formatDate', () => {
    test('should correctly format a valid ISO8601 date string', () => {
        const inputDate = '2024-10-26T12:00:00Z'
        const expectedOutput = '26 octobre 2024'
        const result = formatDate(inputDate)

        expect(result).toBe(expectedOutput)
    })

    test('should correctly format a Date object', () => {
        const inputDate = new Date('2024-10-26T12:00:00Z')
        const expectedOutput = '26 octobre 2024'
        const result = formatDate(inputDate)

        expect(result).toBe(expectedOutput)
    })

    test('should handle dates at the start of the month', () => {
        const inputDate = '2024-02-01T00:00:00Z'
        const expectedOutput = '1 février 2024'
        const result = formatDate(inputDate)

        expect(result).toBe(expectedOutput)
    })

    test('should handle dates at the end of the month', () => {
        const inputDate = '2024-12-31T20:00:00Z'
        const expectedOutput = '31 décembre 2024'
        const result = formatDate(inputDate)

        expect(result).toBe(expectedOutput)
    })
})
