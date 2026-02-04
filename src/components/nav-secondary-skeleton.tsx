import { Skeleton } from "@/components/ui/skeleton"

export function NavSecondarySkeleton() {
  return (
    <div className="flex w-fit items-center gap-2">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-55" />
        <Skeleton className="h-4 w-55" />
      </div>
    </div>
  )
}