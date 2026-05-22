'use client';

import { useState, useTransition } from 'react';
import { submitEventRequest, type FormResult } from '../actions';

export function EventRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      action={(formData) => {
        setResult(null);
        startTransition(async () => {
          const res = await submitEventRequest(formData);
          setResult(res);
          if ('success' in res) {
            (document.getElementById('event-form') as HTMLFormElement)?.reset();
          }
        });
      }}
      id="event-form"
      className="form-wrap"
      style={{ background: 'rgba(251, 248, 242, 0.06)', borderColor: 'rgba(251, 248, 242, 0.18)' }}
    >
      <div className="form-section" style={{ borderColor: 'rgba(251, 248, 242, 0.18)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow" style={{ color: 'var(--marron-claire)' }}>
            01 — Votre événement
          </span>
          <h3 className="form-section-title" style={{ color: 'var(--ivoire)' }}>
            Parlez-nous de votre projet
          </h3>
        </div>
        <div className="form-row">
          <Field label="Prénom" name="firstName" required placeholder="Marie" dark />
          <Field label="Nom" name="lastName" required placeholder="Dupont" dark />
        </div>
        <div className="form-row">
          <Field label="Email" name="email" type="email" required placeholder="vous@email.fr" dark />
          <Field label="Téléphone" name="phone" type="tel" required placeholder="06 12 34 56 78" dark />
        </div>
        <div className="form-row">
          <SelectField
            label="Type d'événement"
            name="eventType"
            options={[
              '',
              'Vernissage / exposition',
              'Présentation produits',
              'Atelier créatif',
              'Anniversaire / privé',
              'Tournage / shooting',
              'Autre',
            ]}
            dark
          />
          <Field
            label="Date souhaitée"
            name="eventDate"
            type="date"
            placeholder="JJ/MM/AAAA"
            dark
          />
        </div>
        <div className="form-row">
          <Field
            label="Nombre de personnes (estimation)"
            name="guests"
            placeholder="Ex : 20"
            dark
          />
          <Field
            label="Heure / durée"
            name="duration"
            placeholder="Ex : 18h-22h"
            dark
          />
        </div>
        <div className="form-row full">
          <TextareaField
            label="Décrivez votre projet"
            name="description"
            placeholder="Quelle ambiance, quels besoins, quelles attentes ?"
            rows={4}
            dark
          />
        </div>
      </div>

      {result && 'success' in result && (
        <div role="status" className="form-alert success">
          ✓ <strong>Demande reçue.</strong> Nous revenons vers vous sous 48h pour
          construire votre événement ensemble.
        </div>
      )}
      {result && 'error' in result && (
        <div role="alert" className="form-alert error">
          ! {result.error}
        </div>
      )}

      <div className="form-footer">
        <span className="form-note" style={{ color: 'var(--marron-claire)' }}>
          Réponse sous 48h
        </span>
        <button type="submit" disabled={isPending} className="form-submit">
          <span>{isPending ? 'Envoi…' : "Privatiser l'espace"}</span>
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
  dark,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  dark?: boolean;
}) {
  return (
    <label className="field">
      <span
        className="field-label"
        style={dark ? { color: 'rgba(251, 248, 242, 0.7)' } : undefined}
      >
        {label}
        {required && <span className="req" style={dark ? { color: 'var(--marron-claire)' } : undefined}>*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field-input"
        style={
          dark
            ? {
                color: 'var(--ivoire)',
                borderBottomColor: 'rgba(251, 248, 242, 0.25)',
              }
            : undefined
        }
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  dark,
}: {
  label: string;
  name: string;
  options: string[];
  dark?: boolean;
}) {
  return (
    <label className="field">
      <span
        className="field-label"
        style={dark ? { color: 'rgba(251, 248, 242, 0.7)' } : undefined}
      >
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="field-select"
        style={
          dark
            ? {
                color: 'var(--ivoire)',
                borderBottomColor: 'rgba(251, 248, 242, 0.25)',
              }
            : undefined
        }
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: 'var(--charbon)' }}>
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
  dark,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  dark?: boolean;
}) {
  return (
    <label className="field">
      <span
        className="field-label"
        style={dark ? { color: 'rgba(251, 248, 242, 0.7)' } : undefined}
      >
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="field-textarea"
        style={
          dark
            ? {
                color: 'var(--ivoire)',
                borderBottomColor: 'rgba(251, 248, 242, 0.25)',
              }
            : undefined
        }
      />
    </label>
  );
}
