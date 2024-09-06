import { Skeleton } from '../shadcn/ui/skeleton'

const SkeletonAvatarTxt = (): React.JSX.Element => (
    <div className='m-10 flex w-full items-center justify-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
        </div>
    </div>
)

export default SkeletonAvatarTxt
