# Mini Geo Dashboard

Geo obyektlarni boshqarish uchun kichik, lekin to‘liq ishlaydigan full-stack dashboard. Obyektlarni qo‘shish, tahrirlash, o‘chirish, qidirish va ularni Yandex xaritasida marker sifatida ko‘rish mumkin. Barcha ma’lumotlar `localStorage`’da saqlanadi — sahifa yangilangandan keyin ham yo‘qolmaydi.

![Texnologiyalar](https://img.shields.io/badge/TanStack_Start-React-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Zustand](https://img.shields.io/badge/State-Zustand-orange)

---

## ✨ Imkoniyatlar

- **Dashboard statistikasi** — jami, aktiv, nofaol va poligon obyektlar soni (Zustand store’dan real vaqtda hisoblanadi).
- **Obyekt qo‘shish formasi** — [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) validatsiyasi (field-level va form-level).
- **Koordinatani xaritadan olish** — xaritaga bosilganda latitude/longitude avtomatik formaga yoziladi.
- **Jadval** — qidiruv (300ms debounce), sahifalash (5 yoki 10 tadan), rangli status badge, tahrirlash (modal) va o‘chirish (tasdiqlash bilan).
- **Yandex xaritasi** — har bir obyekt marker, marker bosilganda popup’da to‘liq ma’lumot.
- **Dark mode** — Zustand theme store + Tailwind `dark` klassi (xarita ham mavzuga moslashadi).
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
| [Yandex Maps JS API v3](https://yandex.com/maps-api/docs/js-api/index.html) | Xarita, markerlar va popuplar |
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

### 3. Yandex Maps API kalitini olish (bepul)

Xarita ishlashi uchun Yandex Maps JS API kaliti kerak:

1. [Yandex developer dashboard](https://developer.tech.yandex.ru/services/) saytiga kiring.
2. **JavaScript API va Geocoder** xizmati uchun kalit yarating.
3. Kalitni nusxalang.

### 4. `.env` faylini sozlash

`.env.example` faylidan nusxa oling va kalitni qo‘ying:

```bash
cp .env.example .env
```

```env
# .env
VITE_YANDEX_MAPS_API_KEY=siz_olgan_kalit
```

> ℹ️ Vite faqat `VITE_` bilan boshlanadigan o‘zgaruvchilarni brauzerga uzatadi.
> Kalit bo‘lmasa, ilova ishlaydi, lekin xarita o‘rnida tushunarli xato xabari ko‘rsatiladi.

### 5. Dev serverni ishga tushirish

```bash
bun run dev
```

Brauzerda oching: **http://localhost:3000**

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
│  ├─ objects/             # object-form, object-table, object-row, edit-object-modal
│  ├─ map/                 # map-view (Yandex init + markerlar + popup)
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
   └─ app.css              # Tailwind v4 + shadcn theme tokenlari + dark variant
```

> Forma validatsiyasi (Zod sxemasi) alohida fayl emas — `object-form.tsx` ichida joylashgan.
> Fayl nomlari `kebab-case`’da.

---

## 🧠 Muhim texnik yechimlar

### Yandex koordinata tartibi

Yandex Maps v3 hamma joyda **`[longitude, latitude]`** kutadi (Leaflet/Google’ning aksi).
Ma’lumotda `latitude`/`longitude` alohida saqlanadi, ammo xaritaga uzatishda har doim teskari tartibda beriladi:

```ts
new ymaps3.YMapMarker({ coordinates: [object.longitude, object.latitude] }, element)
```

Xaritaga bosilganda esa `YMapListener` event’i `[lng, lat]` qaytaradi va u formaga to‘g‘ri map qilinadi.

### Xarita to‘g‘ri boshqarilishi

- Yandex Maps SDK faqat brauzerda ishlagani uchun runtime’da **`<script>` orqali** (`https://api-maps.yandex.ru/v3/...`) bir marta yuklanadi — SSR’ni buzmaydi.
- Xarita `useEffect` ichida **bir marta** init qilinadi (`await ymaps3.ready`), hammasi `ref`’lar bilan boshqariladi (keraksiz re-render yo‘q).
- Obyektlar ro‘yxati o‘zgarganda eski markerlar `map.removeChild(marker)` qilinib, yangidan chiziladi.
- Komponent unmount bo‘lganda `map.destroy()` chaqiriladi.
- Theme store o‘zgarganda `map.update({ theme })` orqali xarita dark/light mavzuga o‘tadi.

### Zustand persist + SSR

Ikkala store ham `skipHydration: true` bilan ishlaydi — server tomonida `localStorage`’ga tegmaydi.
Klientda `useStoresHydration` orqali qo‘lda rehydrate qilinadi va shu vaqtgacha loading ko‘rsatiladi (hydration mismatch bo‘lmaydi). Radix (shadcn) komponentlari ham faqat hydration’dan keyin mount bo‘ladi.

---

## ☁️ Deploy (Netlify / Vercel)

TanStack Start odatiy holda Node server build qiladi (`.output/`).

1. Repozitoriyani Netlify yoki Vercel’ga ulang.
2. **Build command:** `bun run build`
3. **Muhim:** hosting platformasining sozlamalarida **environment variable** sifatida `VITE_YANDEX_MAPS_API_KEY` ni qo‘shing (lokal `.env` fayli deploy’ga ketmaydi).
   - Vercel: *Project → Settings → Environment Variables*
   - Netlify: *Site settings → Environment variables*
4. Qayta deploy qiling.

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

---

## 📝 Litsenziya

Ushbu loyiha o‘quv maqsadida yaratilgan. Erkin foydalaning va kengaytiring.
