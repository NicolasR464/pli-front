// StickySubheader.tsx
import React from 'react'
import Link from 'next/link'

type StickySubheaderProps = {
    proposalMessage: string
    roomId: string
    onModifyProposal: () => void
    onRefuseProposal: () => void
}

const StickySubheader: React.FC<StickySubheaderProps> = ({
    proposalMessage,
    roomId,
    onModifyProposal,
    onRefuseProposal,
}) => {
    return (
        <div className='sticky top-0 z-10 flex items-center justify-between bg-blueGreen-light-active p-4'>
            <div>{proposalMessage}</div>
            <div className='space-x-2'>
                <button
                    onClick={onModifyProposal}
                    className='rounded bg-blue-500 px-2 py-1 text-white'
                >
                    Modifier
                </button>
                <button
                    onClick={onRefuseProposal}
                    className='rounded bg-red-500 px-2 py-1 text-white'
                >
                    Refuser
                </button>
                <Link href={`/articles/`} className='rounded bg-green-500 px-2 py-1 text-white'>
                        Accepter
                </Link>
            </div>
        </div>
    )
}

export default StickySubheader
