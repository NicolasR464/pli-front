export type EligibilityParams = {
    isPremium: boolean
    userBalance: number
    userCredit: number
    articlePrice: number
}

/**
 * Checks if a user is eligible to request an article based on their premium status, balance, and credit.
 * @param {EligibilityParams} params - The parameters for eligibility check.
 * @returns {boolean} - True if the user is eligible, false otherwise.
 */
export const isEligible = ({
    isPremium,
    userBalance,
    userCredit,
    articlePrice,
}: EligibilityParams): boolean => {
    if (isPremium) {
        // Si premium, balance + crédit doit être >= prix de l'article
        const totalFunds = userBalance + userCredit
        return totalFunds >= articlePrice
    }

    // Si non premium, seule la balance est vérifiée
    return userBalance >= articlePrice
}
