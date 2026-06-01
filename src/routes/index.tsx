import { createFileRoute } from '@tanstack/react-router'
import { useStoresHydration } from '@/lib/use-stores-hydration'
import { DashboardView } from '@/components/dashboard-view'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  // Gate the interactive UI until persisted state has been read from localStorage,
  // so SSR output and the first client render match (no hydration mismatch).
  const hydrated = useStoresHydration()

  if (!hydrated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-muted-foreground">
        <Spinner className="size-8" />
        <p className="text-sm">Dashboard yuklanmoqda…</p>
      </div>
    )
  }

  return <DashboardView />
}
