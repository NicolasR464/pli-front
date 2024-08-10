const hey = (ho: number): number => {
    return ho
}

const User = (): JSX.Element => {
    hey(1)
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{'user'}</h1>
        </main>
    )
}

export default User
