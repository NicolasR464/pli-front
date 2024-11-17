import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { getTransactionsByUser } from '@/utils/apiCalls/transaction'
import { getArticleById } from '@/utils/apiCalls/article'
import TransactionItem from './transactionItem'

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

    // Récupérer les transactions de l'utilisateur
    useEffect(() => {
        const fetchTransactions = async () => {
            if (!clerkUser) return
            try {
                const token = await getToken()
                if (!token) {
                    console.error('JWT introuvable.')
                    return
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
                            articleData: article,
                        }
                    }),
                )

                setTransactions(transactionsWithArticles)
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des transactions :',
                    error,
                )
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [clerkUser, getToken])

    if (loading) {
        return <p>Chargement des transactions...</p>
    }

    return (
        <div>
            <h1 className='text-xl font-semibold'>Mes Transactions</h1>
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
