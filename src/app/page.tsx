const Home = (): React.JSX.Element => {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{process.env.NODE_ENV}</h1>
        </main>
    )
}

export default Home
