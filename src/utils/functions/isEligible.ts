type EligibilityParams = {
    isPremium: boolean
    userBalance: number
    userCredit: number
    articlePrice: number
}

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
