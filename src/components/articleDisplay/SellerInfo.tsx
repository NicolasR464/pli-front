import React from 'react'
import Image from 'next/image'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/shadcn/ui/avatar'

import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { formatDate } from '@/utils/functions/dates'

type SellerInfoProps = {
    avatarUrl: string | null | undefined
    name: string
    pseudo: string
    address:
        | {
              label?: string
              housenumber?: string
              street?: string
              city?: string
              postcode?: string
              citycode?: string
              floor?: number
              extra?: string
              geopoints?: { type: string; coordinates: number[] }
          }[]
        | undefined
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
            {!!address && address.length > 0 && (
                <p>
                    <strong>{'Adresse : '}</strong>
                    {address[0].street ? `${address[0].street}, ` : ''}
                    {address[0].city ? `${address[0].city}, ` : ''}
                    {address[0].postcode ? String(address[0].postcode) : ''}
                </p>
            )}
            <p>
                <strong>{'Dernière connexion : '}</strong>
                {formatDate(lastConnected)}
            </p>
        </div>
    </div>
)

export default SellerInfo
