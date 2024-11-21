import React, { useEffect, useState } from 'react'

import type { TransactionWithArticleDataProps } from '@/components/profile/items/transaction/transactionItem'
import TransactionItem from '@/components/profile/items/transaction/transactionItem'

import { getArticleById } from '@/utils/apiCalls/article'
import { getTransactionsByUser } from '@/utils/apiCalls/transaction'

import { useAuth, useUser } from '@clerk/nextjs'

const Transactions: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [transactions, setTransactions] = useState<
        TransactionWithArticleDataProps[]
    >([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    // Récupérer les transactions de l'utilisateur
    useEffect(() => {
        const fetchTransactions = async (): Promise<void> => {
            if (!clerkUser) return
            try {
                const token = await getToken()
                if (!token) {
                    throw new Error('JWT introuvable.')
                }

                const userTransactions = await getTransactionsByUser(
                    clerkUser.id,
                    token,
                )

                // Récupérer les informations des articles associés
                const transactionsWithArticles = await Promise.all(
                    userTransactions.map(async (transaction) => {
                        const article = await getArticleById(
                            transaction.articleB,
                        )
                        return {
                            transaction: {
                                id: transaction.id,
                                ...(transaction.delivery && {
                                    delivery: {
                                        id: transaction.delivery.id,
                                        ...(transaction.delivery.sent && {
                                            sent: new Date(
                                                transaction.delivery.sent,
                                            ).toISOString(),
                                        }),
                                    },
                                }),
                            },
                            articleData: article,
                        }
                    }),
                )

                setTransactions(transactionsWithArticles)
            } catch {
                setError(
                    'Erreur lors de la mise à jour des informations utilisateur.',
                )
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [clerkUser, getToken])

    if (loading) {
        return <p>{'Chargement des transactions…'}</p>
    }

    return (
        <div>
            <h1 className='text-xl font-semibold'>{'Mes Transactions'}</h1>
            {error.trim() && (
                <div className='mb-4 rounded-lg bg-red-100 p-4 text-red-700'>
                    {error}
                </div>
            )}
            <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {transactions.map((transactionData) => (
                    <TransactionItem
                        key={transactionData.transaction.id}
                        transaction={transactionData.transaction}
                        articleData={transactionData.articleData}
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions
