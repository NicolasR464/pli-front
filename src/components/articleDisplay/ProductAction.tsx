import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'
import type { TransactionRequestProps } from '@/components/transactions/userActions/TransactionRequest'
import TransactionRequest from '@/components/transactions/userActions/TransactionRequest'

import { useUserStore } from '@/stores/user'
import { sendMessage } from '@/utils/apiCalls/instantMessage'
import { isEligible } from '@/utils/functions/isEligible'

import { useAuth, useUser } from '@clerk/nextjs'

/**
 * This component handles the actions related to a product, including 1toM transaction requests and messaging the seller.
 * It uses the TransactionRequest and RequestDialog components to manage transaction requests.
 * The button allows users to send a message to the owner of the product.
 * @param {object} props - Component props
 * @param {object} props.userB - The user receiving the transaction request
 * @param {object} props.articleB - The article involved in the transaction
 */
const ProductActions: React.FC<TransactionRequestProps> = ({
    userB,
    articleB,
}) => {
    const { getToken } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const clerkUser = useUser().user

    const { user: userConnected } = useUserStore()

    const handleSendMessage = async (): Promise<void> => {
        setLoading(true)

        try {
            const token = await getToken()
            if (!token) {
                throw new Error(
                    'Vous devez être connecté pour envoyer un message.',
                )
            }
            const senderId = clerkUser?.id ?? 'unknown_user'
            const roomID = `${senderId}_${userB.id}`
            const message = `Bonjour, je suis intéressé(e) par votre article "${articleB.adTitle}".`
            const sentAt = new Date()

            // Envoi du premier message
            await sendMessage(
                roomID,
                senderId,
                userB.id,
                message,
                sentAt,
                token,
            )

            // Redirection vers la messagerie
            router.push(`/messagerie/${roomID}`)
        } catch {
            // Gestion sécurisée de l'erreur
            const errorMessage = 'Une erreur inattendue est survenue.'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mb-6 mt-6 flex justify-center space-x-4'>
            {/* For Transaction 1-to-M request */}
            {!!articleB.price &&
                !!userConnected.isPremium &&
                userConnected.balance !== undefined &&
                userConnected.credit !== undefined &&
                isEligible({
                    isPremium: userConnected.isPremium,
                    userBalance: userConnected.balance,
                    userCredit: userConnected.credit,
                    articlePrice: articleB.price,
                }) && (
                    <TransactionRequest
                        userB={userB}
                        articleB={articleB}
                    />
                )}

            {/* For Transaction 1-to-1 request */}
            <Button
                onClick={() => {
                    handleSendMessage()
                }}
                disabled={loading}
                className='transform rounded-lg bg-gradient-to-r from-teal-200 to-teal-300 px-6 py-2 text-teal-700 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-teal-300 hover:to-teal-400 hover:text-white'
                aria-label='Envoyer un message au vendeur'
            >
                {loading ? 'Envoi en cours…' : 'Envoyer un message 💬'}
            </Button>

            {error.trim() && (
                <div className='mt-4 text-red-500'>
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}

export default ProductActions
