import { Skeleton } from "@/components/ui/skeleton"

export function NavItemsSkeleton() {
  return (
    <div className="flex w-fit items-center gap-2">
      <div className="grid gap-2">
        <Skeleton className="h-6 w-55" />
        <Skeleton className="h-6 w-55" />
      </div>
    </div>
  )
}