import ArticleForm from '@/components/forms/adCreation'
import ImageProcessing from '@/components/forms/imageProcessing'
import ConfirmDialog from './ConfirmDialog'

const newArticle = (): React.JSX.Element => {
    return (
        <>
            <h1 className='text-center text-2xl font-bold'>
                {'Création d’une annonce'}
            </h1>
            <ImageProcessing />
            <ArticleForm />
            <ConfirmDialog />
        </>
    )
}

export default newArticle
