import React, { useEffect, useState } from 'react'

import { getArticleById } from '@/utils/apiCalls/article'
import { getTransactionsByUser } from '@/utils/apiCalls/transaction'

import { useAuth, useUser } from '@clerk/nextjs'
import TransactionItem from './TransactionItem'

type Transaction = {
    _id: string
    version: number
    receiver: string
    article: string
    sender: string
    delivery: {
        _id: string
        type: string
        packageWeight: number
        sent: string
        cost: number
        qrCodeUrl: string
    }
    articleData: {
        adTitle: string
        imageUrls: string[]
    }
}

const Transactions: React.FC = () => {
    const { user: clerkUser } = useUser()
    const { getToken } = useAuth()
    const [transactions, setTransactions] = useState<Transaction[]>([])
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
                            transaction.article,
                        )
                        return {
                            ...transaction,
                            delivery: {
                                ...transaction.delivery,
                                sent: new Date(
                                    transaction.delivery.sent,
                                ).toISOString(),
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
                {transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction._id}
                        transaction={transaction}
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions
