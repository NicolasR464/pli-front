import ArticleForm from '@/components/forms/ArticleForm'
import ImageProcessing from '@/components/forms/ImageDropZone'
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
