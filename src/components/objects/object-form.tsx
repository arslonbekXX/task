import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import type { LatLng, ObjectFormValues } from '@/types'
import { fieldErrorText } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/ui/form-field'
import { MapPicker } from '@/components/map/map-picker'

/**
 * Zod schemas for the object form, validated through TanStack Form's
 * Standard Schema support (Zod >= 3.24). latitude/longitude are validated as
 * strings (the raw input value) and range-checked after numeric coercion, so an
 * empty input is reported as required instead of silently coercing to 0.
 */
const numericString = z
  .string()
  .trim()
  .min(1)
  .refine((value) => !Number.isNaN(Number(value)))

const objectFormSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(1).max(300),
  status: z.enum(['active', 'inactive']),
  latitude: numericString.refine(
    (value) => Number(value) >= -90 && Number(value) <= 90,
  ),
  longitude: numericString.refine(
    (value) => Number(value) >= -180 && Number(value) <= 180,
  ),
})

interface ObjectFormProps {
  mode?: 'create' | 'edit'
  initialValues?: ObjectFormValues
  onSubmit: (values: ObjectFormValues) => void
  onCancel?: () => void
  submitLabel?: string
}

const EMPTY_VALUES: ObjectFormValues = {
  name: '',
  description: '',
  status: 'active',
  latitude: '',
  longitude: '',
}

/** Whether a field should render its error / invalid state. */
function showError(meta: { isTouched: boolean; errors: ReadonlyArray<unknown> }) {
  return meta.isTouched && meta.errors.length > 0
}

/** Parse the form's string lat/lng into a LatLng, or null if incomplete. */
function parseCoord(lat: string, lng: string): LatLng | null {
  if (lat.trim() === '' || lng.trim() === '') return null
  const latNum = Number(lat)
  const lngNum = Number(lng)
  if (Number.isNaN(latNum) || Number.isNaN(lngNum)) return null
  return { lat: latNum, lng: lngNum }
}

export function ObjectForm({
  mode = 'create',
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: ObjectFormProps) {
  const form = useForm({
    defaultValues: initialValues ?? EMPTY_VALUES,
    // Form-level validation (drives `canSubmit`).
    validators: { onChange: objectFormSchema },
    onSubmit: ({ value }) => {
      onSubmit(value)
      if (mode === 'create') form.reset()
    },
  })

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
      className="space-y-4"
    >
      <form.Field name="name" validators={{ onChange: objectFormSchema.shape.name }}>
        {(field) => (
          <FormField
            label="Nomi"
            htmlFor={field.name}
            required
            error={showError(field.state.meta) ? fieldErrorText(field.state.meta.errors) : null}
          >
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Masalan, Amir Temur xiyoboni"
              aria-invalid={showError(field.state.meta) || undefined}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </FormField>
        )}
      </form.Field>

      <form.Field
        name="description"
        validators={{ onChange: objectFormSchema.shape.description }}
      >
        {(field) => (
          <FormField
            label="Tavsif"
            htmlFor={field.name}
            required
            error={showError(field.state.meta) ? fieldErrorText(field.state.meta.errors) : null}
          >
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Obyekt haqida qisqacha"
              aria-invalid={showError(field.state.meta) || undefined}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </FormField>
        )}
      </form.Field>

      <form.Field name="status" validators={{ onChange: objectFormSchema.shape.status }}>
        {(field) => {
          const checked = field.state.value === 'active'
          return (
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <div className="space-y-0.5">
                <Label htmlFor={field.name}>Status</Label>
                <p className="text-xs text-muted-foreground">
                  {checked ? 'Faol' : 'Nofaol'}
                </p>
              </div>
              <Switch
                id={field.name}
                checked={checked}
                onCheckedChange={(value) => {
                  field.handleChange(value ? 'active' : 'inactive')
                  field.handleBlur()
                }}
              />
            </div>
          )
        }}
      </form.Field>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label>Koordinatalar</Label>
          <form.Subscribe
            selector={(state) =>
              [state.values.latitude, state.values.longitude] as const
            }
          >
            {([lat, lng]) => (
              <MapPicker
                value={parseCoord(lat, lng)}
                onChange={(coord) => {
                  form.setFieldValue('latitude', coord.lat.toFixed(6))
                  form.setFieldValue('longitude', coord.lng.toFixed(6))
                }}
              />
            )}
          </form.Subscribe>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field
            name="latitude"
            validators={{ onChange: objectFormSchema.shape.latitude }}
          >
            {(field) => (
              <FormField
                label="Latitude"
                htmlFor={field.name}
                required
                error={showError(field.state.meta) ? fieldErrorText(field.state.meta.errors) : null}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  inputMode="decimal"
                  placeholder="-90 … 90"
                  value={field.state.value}
                  aria-invalid={showError(field.state.meta) || undefined}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field
            name="longitude"
            validators={{ onChange: objectFormSchema.shape.longitude }}
          >
            {(field) => (
              <FormField
                label="Longitude"
                htmlFor={field.name}
                required
                error={showError(field.state.meta) ? fieldErrorText(field.state.meta.errors) : null}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  inputMode="decimal"
                  placeholder="-180 … 180"
                  value={field.state.value}
                  aria-invalid={showError(field.state.meta) || undefined}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </FormField>
            )}
          </form.Field>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Bekor qilish
          </Button>
        )}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting
                ? 'Saqlanmoqda…'
                : (submitLabel ?? (mode === 'create' ? 'Qo‘shish' : 'Saqlash'))}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
