'use client';

import { useState, useTransition } from 'react';
import { submitPetReservation, type FormResult } from '../actions';

const LINEN_TYPES = [
  'Coussin / panier',
  'Couverture',
  'Vêtements / harnais',
  'Serviettes après bain',
  'Plusieurs articles',
  'Autre',
] as const;

export function ReservationPetForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      action={(formData) => {
        setResult(null);
        startTransition(async () => {
          const res = await submitPetReservation(formData);
          setResult(res);
          if ('success' in res) {
            (document.getElementById('pet-form') as HTMLFormElement)?.reset();
          }
        });
      }}
      id="pet-form"
      className="form-wrap"
    >
      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">01 — Vos coordonnées</span>
          <h3 className="form-section-title">Qui contactons-nous&nbsp;?</h3>
        </div>
        <div className="form-row">
          <Field label="Prénom" name="firstName" required placeholder="Marie" />
          <Field label="Nom" name="lastName" required placeholder="Dupont" />
        </div>
        <div className="form-row">
          <Field label="Email" name="email" type="email" required placeholder="vous@email.fr" />
          <Field label="Téléphone" name="phone" type="tel" required placeholder="06 12 34 56 78" />
        </div>
      </div>

      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">02 — Votre demande</span>
          <h3 className="form-section-title">
            Que voulez-vous laver pour votre compagnon&nbsp;?
          </h3>
        </div>
        <div className="form-row">
          <SelectField
            label="Type de linge"
            name="linenType"
            required
            options={['', ...LINEN_TYPES]}
          />
          <SelectField
            label="Espèce de l'animal"
            name="petType"
            options={['', 'Chien', 'Chat', 'Cheval', 'Rongeur', 'Autre']}
          />
        </div>
        <div className="form-row">
          <Field
            label="Date souhaitée"
            name="desiredDate"
            type="date"
            placeholder="JJ/MM/AAAA"
          />
          <Field
            label="Créneau préféré"
            name="timeSlot"
            placeholder="Ex : matin, après-midi…"
          />
        </div>
        <div className="form-row full">
          <TextareaField
            label="Précisions (facultatif)"
            name="notes"
            placeholder="Type de poils, allergies particulières, taille du linge, etc."
            rows={3}
          />
        </div>
      </div>

      {result && 'success' in result && (
        <div role="status" className="form-alert success">
          ✓ <strong>Demande reçue.</strong> Nous revenons vers vous sous 24h pour confirmer
          le créneau et le tarif.
        </div>
      )}
      {result && 'error' in result && (
        <div role="alert" className="form-alert error">
          ! {result.error}
        </div>
      )}

      <div className="form-footer">
        <span className="form-note">Réponse sous 24h</span>
        <button type="submit" disabled={isPending} className="form-submit">
          <span>{isPending ? 'Envoi…' : 'Réserver mon créneau'}</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

/* ── helpers ── */
function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {required && <span className="req">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field-input"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {required && <span className="req">*</span>}
      </span>
      <select name={name} defaultValue="" required={required} className="field-select">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || '— Sélectionner —'}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="field-textarea"
      />
    </label>
  );
}
