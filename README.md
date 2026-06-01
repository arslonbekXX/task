# Mini Geo Dashboard

Geo obyektlarni boshqarish uchun kichik, lekin to‘liq ishlaydigan full-stack dashboard. Obyektlarni qo‘shish, tahrirlash, o‘chirish, qidirish va ularni xaritada (Leaflet) marker sifatida ko‘rish mumkin. Barcha ma’lumotlar `localStorage`’da saqlanadi — sahifa yangilangandan keyin ham yo‘qolmaydi.

![Texnologiyalar](https://img.shields.io/badge/TanStack_Start-React-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Zustand](https://img.shields.io/badge/State-Zustand-orange) ![Leaflet](https://img.shields.io/badge/Map-Leaflet-199900)

---

## ✨ Imkoniyatlar

- **Dashboard statistikasi** — jami, aktiv, nofaol obyektlar va poligonlar (nuqtaviy model bo‘lgani uchun har doim 0) soni, Zustand store’dan real vaqtda hisoblanadi.
- **Obyekt qo‘shish** — jadval ustidagi **«Yangi obyekt»** tugmasi modal forma ochadi ([TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) validatsiyasi, field-level va form-level).
- **Koordinatani xaritadan tanlash** — formadagi **«Xaritadan tanlash»** tugmasi xarita dialogini ochadi; kerakli nuqtaga bosilganda latitude/longitude avtomatik formaga yoziladi (create va edit’da).
- **Jadval** — qidiruv (300ms debounce), sahifalash (5 yoki 10 tadan), rangli status badge, tahrirlash (modal) va o‘chirish (tasdiqlash bilan).
- **Leaflet xaritasi** — `react-leaflet` + CartoDB/OpenStreetMap plitalar (**API kalitsiz**); har bir obyekt marker, marker bosilganda popup’da to‘liq ma’lumot.
- **Dark mode** — Zustand theme store + Tailwind `dark` klassi; xarita plitalari ham (light/dark) mavzuga moslashadi.
- **Loading & error holatlar**, bo‘sh holat (“obyekt yo‘q”), responsive dizayn (mobil + desktop).

---

## 🧰 Ishlatilgan texnologiyalar

| Texnologiya | Maqsadi |
| --- | --- |
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework, file-based routing (Vite plugin) |
| [TypeScript](https://www.typescriptlang.org/) (strict) | Type-safety — hech qayerda `any` ishlatilmagan |
| [Zustand](https://zustand.docs.pmnd.rs/) + `persist` | Global holat + `localStorage`’ga saqlash |
| [TanStack Form](https://tanstack.com/form) | Forma holati va validatsiyasi |
| [Zod](https://zod.dev) | Validatsiya sxemasi (Standard Schema orqali to‘g‘ridan-to‘g‘ri) |
| [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) | Xarita, markerlar va popuplar (CartoDB/OpenStreetMap plitalar — API kalitsiz) |
| [shadcn/ui](https://ui.shadcn.com/) + [lucide-react](https://lucide.dev/) | Qayta ishlatiladigan UI komponentlari va ikonkalar |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling + dark mode |

---

## 🚀 Ishga tushirish

### 1. Talablar

- **Node.js 20+** va **bun** (yoki npm)

### 2. Paketlarni o‘rnatish

```bash
bun install
```

### 3. Dev serverni ishga tushirish

```bash
bun run dev
```

Brauzerda oching: **http://localhost:3000**

> ℹ️ Xarita plitalari CartoDB (OpenStreetMap ma’lumotlari) dan olinadi — **API kalit yoki `.env` sozlamasi kerak emas**. Loyiha hech qanday muhit o‘zgaruvchisini talab qilmaydi.

---

## 📦 Buyruqlar

| Buyruq | Tavsifi |
| --- | --- |
| `bun run dev` | Dev serverni ishga tushiradi (HMR bilan) |
| `bun run build` | Production uchun build qiladi |
| `bun run start` | Build’dan keyin production serverni ishga tushiradi (`node .output/server/index.mjs`) |
| `bun run serve` | Build’ni lokal ko‘rib chiqish (`vite preview`) |
| `bun run typecheck` | TypeScript tekshiruvi (`tsc --noEmit`) |

---

## 🗂 Loyiha strukturasi

```
src/
├─ routes/                 # TanStack Start file-based routes
│  ├─ __root.tsx           # ildiz layout (HTML shell, CSS, meta, Toaster)
│  └─ index.tsx            # asosiy sahifa (hydration gate + dashboard)
├─ components/
│  ├─ index.ts             # barrel export
│  ├─ ui/                  # shadcn/ui primitivlari (button, input, select,
│  │                       #   textarea, card, dialog, alert-dialog, table,
│  │                       #   badge, label, pagination, skeleton, sonner) +
│  │                       #   ilovaga xos wrapperlar (status-badge, spinner,
│  │                       #   form-field, confirm-dialog, table-pagination)
│  ├─ dashboard/           # stats-card, stats-grid
│  ├─ objects/             # object-form, object-table, object-row,
│  │                       #   create-object-modal, edit-object-modal
│  ├─ map/                 # map-view (SSR-safe wrapper), map-content
│  │                       #   (Leaflet xaritasi), map-picker (koordinata dialogi)
│  ├─ layout/              # header, theme-toggle
│  └─ dashboard-view.tsx   # sahifani yig‘uvchi komponent
├─ store/                  # Zustand store’lar
│  ├─ objects.store.ts     #   obyektlar CRUD + persist + selectStats
│  └─ theme.store.ts       #   dark mode + persist
├─ types/                  # GeoObject, Status, ObjectFormValues, Stats, LatLng
├─ lib/                    # utils, constants, use-debounce, use-stores-hydration
├─ data/
│  └─ seed.json            # boshlang‘ich 10 ta obyekt
└─ styles/
   └─ app.css              # Tailwind v4 + shadcn theme tokenlari + Leaflet popup stillari
```

> Forma validatsiyasi (Zod sxemasi) alohida fayl emas — `object-form.tsx` ichida joylashgan.
> Fayl nomlari `kebab-case`’da.

---

## 🧠 Muhim texnik yechimlar

### Koordinata tartibi (Leaflet)

Leaflet hamma joyda **`[latitude, longitude]`** tartibida ishlaydi. Ma’lumotda `latitude`/`longitude` alohida saqlanadi va to‘g‘ridan-to‘g‘ri uzatiladi:

```tsx
<Marker position={[object.latitude, object.longitude]} />
```

Xaritaga bosilganda `useMapEvents` event’i `latlng` ni `{ lat, lng }` ko‘rinishida qaytaradi — qo‘shimcha almashtirish kerak emas.

### SSR-xavfsiz xarita

Leaflet/react-leaflet import vaqtida `window`’ga murojaat qiladi, TanStack Start esa SSR qiladi — shuning uchun Leaflet faqat klientda yuklanishi shart:

- `map-view.tsx` — yengil wrapper: `<ClientOnly>` (TanStack Router) + `React.lazy(() => import("./map-content"))` + `<Suspense>`. Server’da faqat loading placeholder render bo‘ladi, hydration toza qoladi.
- `map-content.tsx` — barcha Leaflet kodi shu yerda (alohida client chunk). Server bundle’ga leaflet umuman tushmaydi.

### Plitalar va dark mode

Plitalar **CartoDB** (OpenStreetMap ma’lumotlari) dan — **API kalit kerak emas**. Theme o‘zgarganda `light_all` ↔ `dark_all` URL almashadi (`<TileLayer key={theme}>` orqali qayta yuklanadi). Popup esa theme tokenlari (`--popover`, `--border` va h.k.) bilan avtomatik moslashadi.

### Markerlar va z-index

- Markerlar `L.divIcon` orqali — rangli SVG pin (aktiv = yashil, nofaol = kulrang, tanlanayotgan nuqta = ko‘k).
- Leaflet panel/boshqaruvlari juda yuqori z-index (1000 gacha) oladi. Xarita o‘ralasiga `isolation: isolate` qo‘yilgan — bu Leaflet z-indexlarini shu kontekstda “qamab”, portal qilingan oynalar (create/edit dialog, Select, toast) xarita ustida chiqishini ta’minlaydi.

### Koordinatani xaritadan tanlash

Create va edit formalaridagi **«Xaritadan tanlash»** tugmasi xarita bilan dialog ochadi (`map-picker.tsx`). Mavjud obyektlar kontekst uchun ko‘rsatiladi; xaritaga bosib nuqta tanlanadi (ko‘k marker), **«Tanlash»** bosilganda lat/lon formaga yoziladi. Dialog ichidagi xarita `ResizeObserver` + `map.invalidateSize()` bilan to‘g‘ri o‘lchamga keltiriladi.

### Zustand persist + SSR

Ikkala store ham `skipHydration: true` bilan ishlaydi — server tomonida `localStorage`’ga tegmaydi.
Klientda `useStoresHydration` orqali qo‘lda rehydrate qilinadi va shu vaqtgacha loading ko‘rsatiladi (hydration mismatch bo‘lmaydi). Radix (shadcn) komponentlari ham faqat hydration’dan keyin mount bo‘ladi.

---

## ☁️ Deploy (Netlify / Vercel)

TanStack Start odatiy holda Node server build qiladi (`.output/`).

1. Repozitoriyani Netlify yoki Vercel’ga ulang.
2. **Build command:** `bun run build`
3. Qayta deploy qiling.

> Xarita API kalit talab qilmaydi, shuning uchun qo‘shimcha environment variable kerak emas.
> Vercel uchun TanStack Start odatda avtomatik aniqlanadi. Netlify’da Node versiyasini 20+ ga sozlang.

---

## 📄 Ma’lumot modeli

```ts
type Status = 'active' | 'inactive'

interface GeoObject {
  id: string
  name: string
  description: string
  status: Status
  latitude: number
  longitude: number
  createdAt: string // ISO 8601
}
```
