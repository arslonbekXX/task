import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { useObjectsStore } from '@/store/objects.store'
import { useThemeStore } from '@/store/theme.store'
import { Header } from '@/components/layout/header'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { ObjectTable } from '@/components/objects/object-table'
import { MapView } from '@/components/map/map-view'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function DashboardView() {
  const theme = useThemeStore((state) => state.theme)
  const objects = useObjectsStore((state) => state.objects)

  // Reflect the persisted theme on <html>.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <section aria-label="Statistika">
          <StatsGrid />
        </section>

        <section aria-label="Xarita">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-4" /> Xarita
              </CardTitle>
              <CardDescription>
                Obyektlar xaritada marker sifatida ko‘rsatilgan. Yangi obyekt
                qo‘shganda koordinatani xaritadan tanlashingiz mumkin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[32rem] w-full">
                <MapView objects={objects} />
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Obyektlar jadvali">
          <ObjectTable />
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Mini Geo Dashboard · TanStack Start · Zustand · TanStack Form · Zod ·
        Leaflet
      </footer>
    </div>
  )
}
