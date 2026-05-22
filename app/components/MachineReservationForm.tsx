'use client';

import { useState, useTransition } from 'react';
import { submitMachineReservation, type FormResult } from '../actions';

export function MachineReservationForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      action={(formData) => {
        setResult(null);
        startTransition(async () => {
          const res = await submitMachineReservation(formData);
          setResult(res);
          if ('success' in res) {
            (document.getElementById('machine-form') as HTMLFormElement)?.reset();
          }
        });
      }}
      id="machine-form"
      className="form-wrap"
    >
      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">01 — Vos coordonnées</span>
          <h3 className="form-section-title">Comment vous joindre&nbsp;?</h3>
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
          <span className="form-section-eyebrow">02 — Votre lessive</span>
          <h3 className="form-section-title">Quelle machine, quand&nbsp;?</h3>
        </div>
        <div className="form-row">
          <SelectField
            label="Taille de machine"
            name="machineSize"
            required
            options={['', '8 kg (lave-linge standard)', '14 kg (gros volumes)', '18 kg (couettes, oreillers)', 'Je ne sais pas']}
          />
          <SelectField
            label="Sèche-linge ?"
            name="dryer"
            options={['', 'Oui', 'Non', 'Selon dispo']}
          />
        </div>
        <div className="form-row">
          <Field
            label="Date souhaitée"
            name="desiredDate"
            type="date"
            required
          />
          <Field
            label="Heure / créneau"
            name="timeSlot"
            placeholder="Ex : 14h-16h"
          />
        </div>
        <div className="form-row full">
          <TextareaField
            label="Précisions (facultatif)"
            name="notes"
            placeholder="Type de linge, contraintes particulières, etc."
            rows={2}
          />
        </div>
      </div>

      {result && 'success' in result && (
        <div role="status" className="form-alert success">
          ✓ <strong>Demande reçue.</strong> Nous vous confirmons votre créneau sous
          1h (téléphone ou WhatsApp).
        </div>
      )}
      {result && 'error' in result && (
        <div role="alert" className="form-alert error">
          ! {result.error}
        </div>
      )}

      <div className="form-footer">
        <span className="form-note">Confirmation sous 1h</span>
        <button type="submit" disabled={isPending} className="form-submit">
          <span>{isPending ? 'Envoi…' : 'Réserver ma machine'}</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

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
