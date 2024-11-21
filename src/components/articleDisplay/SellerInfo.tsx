import React from 'react'
import Image from 'next/image'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/shadcn/ui/avatar'

import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { formatDate } from '@/utils/functions/dates'

import type { Address } from '@/types/article'

type SellerInfoProps = {
    avatarUrl: string | null | undefined
    name: string
    pseudo: string
    address?: Address
    lastConnected: Date
}

const SellerInfo: React.FC<SellerInfoProps> = ({
    avatarUrl,
    name,
    pseudo,
    address,
    lastConnected,
}) => (
    <div className='mb-4 flex items-center'>
        <Avatar>
            {avatarUrl ? (
                <AvatarImage
                    src={avatarUrl}
                    alt='Avatar du user'
                    className='h-15 w-15 rounded-full'
                />
            ) : (
                <Image
                    src={avatarPlaceholder}
                    alt='Avatar'
                    width={100}
                    height={100}
                    priority
                />
            )}
            <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className='ml-4'>
            <p>
                <strong>{'Pseudo : '}</strong>
                {pseudo}
            </p>
            {!!address && (
                <p>
                    <strong>{'Adresse principale : '}</strong>
                    {address.street ? `${address.street}, ` : ''}
                    {address.city ? `${address.city}, ` : ''}
                    {address.postcode ? String(address.postcode) : ''}
                </p>
            )}

            {lastConnected !== undefined && (
                <p>
                    <strong>{'Dernière connexion : '}</strong>
                    {formatDate(lastConnected)}
                </p>
            )}
        </div>
    </div>
)

export default SellerInfo
