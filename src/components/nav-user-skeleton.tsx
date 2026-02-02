import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAvatar() {
  return (
    <div className="flex w-fit items-center gap-2">
      <Skeleton className="size-8 shrink-0 rounded-sm" />
      <div className="grid gap-2">
        <Skeleton className="h-3 w-37.5" />
        <Skeleton className="h-3 w-37.5" />
      </div>
    </div>
  )
}
