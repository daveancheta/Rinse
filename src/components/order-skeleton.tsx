import { Skeleton } from './ui/skeleton'

function OrderSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-4 gap-4 mt-5">
            {Array.from({ length: 8 }).map((_, index) =>
                <Skeleton className="h-55 w-full" key={index}/>
                )}

        </div>
    )
}

export default OrderSkeleton