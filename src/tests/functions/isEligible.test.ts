import type { EligibilityParams } from '@/utils/functions/isEligible'
import { isEligible } from '@/utils/functions/isEligible'

describe('isEligible', () => {
    test('should return true when user is premium and total funds (balance + credit) are greater than or equal to article price', () => {
        const params: EligibilityParams = {
            isPremium: true,
            userBalance: 50,
            userCredit: 30,
            articlePrice: 70,
        }
        expect(isEligible(params)).toBe(true)
    })

    test('should return false when user is premium but total funds (balance + credit) are less than article price', () => {
        const params: EligibilityParams = {
            isPremium: true,
            userBalance: 20,
            userCredit: 10,
            articlePrice: 50,
        }
        expect(isEligible(params)).toBe(false)
    })

    test('should return true when user is not premium and balance is greater than or equal to article price', () => {
        const params: EligibilityParams = {
            isPremium: false,
            userBalance: 100,
            userCredit: 50,
            articlePrice: 80,
        }
        expect(isEligible(params)).toBe(true)
    })

    test('should return false when user is not premium and balance is less than article price', () => {
        const params: EligibilityParams = {
            isPremium: false,
            userBalance: 30,
            userCredit: 100,
            articlePrice: 50,
        }
        expect(isEligible(params)).toBe(false)
    })

    test('should handle edge case where balance and credit exactly equal the article price for premium users', () => {
        const params: EligibilityParams = {
            isPremium: true,
            userBalance: 40,
            userCredit: 30,
            articlePrice: 70,
        }
        expect(isEligible(params)).toBe(true)
    })

    test('should handle edge case where balance exactly equals the article price for non-premium users', () => {
        const params: EligibilityParams = {
            isPremium: false,
            userBalance: 50,
            userCredit: 20,
            articlePrice: 50,
        }
        expect(isEligible(params)).toBe(true)
    })
})
