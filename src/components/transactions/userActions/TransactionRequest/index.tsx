'use client'

import { Button } from '@/components/shadcn/ui/button'
import RequestDialog from './RequestDialog'

import { useTransactionStore } from '@/stores/transaction'

import type { PartialArticleFields, UserB } from '@/types/transaction/actions'

/**
 * Props for the TransactionRequest component
 */
export type TransactionRequestProps = {
    readonly userB: UserB
    readonly articleB: PartialArticleFields
    // If the transaction is 1to1, the articleA info is required
    readonly articleA?: PartialArticleFields
    readonly actionButtonTxt?: string
}

/**
 * Component for the transaction requests made by the user (1to1 and 1toM)
 * @param {object} props - Component props
 * @param {User['id']} props.userB - The recipient user id
 * @param {PartialArticleFields} props.articleB - The article being requested
 * @param {PartialArticleFields} [props.articleA] - The article being offered in exchange (for 1to1 trades)
 * @param {string} props.actionButtonTxt - The text of the button
 * @exports TransactionRequest
 */
const TransactionRequest = ({
    userB,
    articleB,
    // If the transaction is 1to1, the articleA info is required
    articleA = undefined,
    actionButtonTxt = 'Je veux !',
}: TransactionRequestProps): React.JSX.Element => {
    const setOpenRequestDialog = useTransactionStore(
        (state) => state.setOpenRequestDialog,
    )
    const setArticleA = useTransactionStore((state) => state.setArticleA)
    const setArticleB = useTransactionStore((state) => state.setArticleB)
    const setUserB = useTransactionStore((state) => state.setUserB)
    const requestSent = useTransactionStore((state) => state.requestSent)

    if (articleA) {
        // @TODO : For 1to1 transactions, do a post request to transaction service - to do a pre-transaction
    }

    return (
        <div>
            {/* Button that will set the transaction data in the store and open the request dialog. */}
            <Button
                disabled={requestSent}
                onClick={() => {
                    if (articleA) setArticleA(articleA)

                    setArticleB(articleB)

                    setUserB(userB)

                    setOpenRequestDialog(true)
                }}
                className='rounded-lg bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-2 text-white shadow-md transition duration-300 ease-in-out hover:from-teal-500 hover:to-teal-700'
                aria-label='transaction request'
            >
                {!!requestSent && 'Demande envoyée'}
                {!requestSent && actionButtonTxt}
            </Button>

            {/* Dialog that will open when the button above is clicked. It contains the form to set the delivery type and confirm the pre-transaction */}
            <RequestDialog />
        </div>
    )
}

export default TransactionRequest
