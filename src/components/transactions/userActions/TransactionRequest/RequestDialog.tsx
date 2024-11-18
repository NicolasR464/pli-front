'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/ui/dialog'
import PreTransactionForm from '@/components/forms/PreTransactionForm'

import { useTransactionStore } from '@/stores/transaction'

/**
 * This component handles the request state of a transaction request, 1to1 and 1toM. It prompts the user to chose the delivery type.
 */
const RequestDialog: React.FC = () => {
    const openRequestDialog = useTransactionStore(
        (state) => state.openRequestDialog,
    )
    const setOpenRequestDialog = useTransactionStore(
        (state) => state.setOpenRequestDialog,
    )

    return (
        <Dialog
            open={openRequestDialog}
            onOpenChange={setOpenRequestDialog}
        >
            <DialogContent className='sm:max-w-[600px] md:max-w-[800px]'>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        {'Demande d’échange'}
                    </DialogTitle>
                </DialogHeader>

                <PreTransactionForm />
            </DialogContent>
        </Dialog>
    )
}

export default RequestDialog
