import React from 'react'

type UserInfoCardProps = {
    avatarUrl: string
    username: string
    status: string
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
    avatarUrl,
    username,
    status,
}) => {
    return (
        <div className='sticky top-0 z-10 flex items-center justify-betwee p-4'>
            <div className='flex items-center space-x-4'>
                <img
                    src={avatarUrl}
                    alt={`${username} avatar`}
                    className='h-12 w-12 rounded-full object-cover'
                />
                <div>
                    <p className='text-lg font-semibold'>{username}</p>
                    <p className='text-sm text-green-600'>{status}</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfoCard
