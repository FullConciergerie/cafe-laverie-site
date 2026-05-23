'use client';

import { useState, useTransition } from 'react';
import { submitHomePickup, type FormResult } from '../actions';

export function HomePickupForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        setResult(null);
        startTransition(async () => {
          const res = await submitHomePickup(formData);
          setResult(res);
          if ('success' in res) {
            form.reset();
          }
        });
      }}
      id="pickup-form"
      className="form-wrap"
    >
      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">01 — Vos coordonnées</span>
          <h3 className="form-section-title">Où venir chercher votre linge&nbsp;?</h3>
        </div>
        <div className="form-row">
          <Field label="Prénom" name="firstName" required placeholder="Marie" />
          <Field label="Nom" name="lastName" required placeholder="Dupont" />
        </div>
        <div className="form-row">
          <Field label="Email" name="email" type="email" required placeholder="vous@email.fr" />
          <Field label="Téléphone" name="phone" type="tel" required placeholder="06 12 34 56 78" />
        </div>
        <div className="form-row">
          <Field label="Adresse" name="address" required placeholder="16 quai de Mantoue" />
          <Field label="Ville" name="city" required placeholder="Nevers" />
        </div>
        <div className="form-row">
          <Field label="Code postal" name="postalCode" required placeholder="58000" />
          <Field label="Étage / interphone (facultatif)" name="floor" placeholder="3ème étage, code A1234" />
        </div>
      </div>

      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">02 — Votre linge</span>
          <h3 className="form-section-title">Que devons-nous laver&nbsp;?</h3>
        </div>
        <div className="form-row">
          <SelectField
            label="Volume estimé"
            name="volume"
            required
            options={[
              '',
              'Petit (1 sac, ~5 kg)',
              'Moyen (2 sacs, ~10 kg)',
              'Important (3+ sacs, ~15 kg)',
              'Couette / oreillers seulement',
              'Je ne sais pas — à estimer ensemble',
            ]}
          />
          <SelectField
            label="Type de linge"
            name="linenType"
            options={[
              '',
              'Linge courant (vêtements)',
              'Linge de maison (draps, serviettes)',
              'Couette / oreillers',
              'Mélange',
            ]}
          />
        </div>
        <div className="form-row">
          <SelectField
            label="Fréquence souhaitée"
            name="frequency"
            options={[
              '',
              'Ponctuel (1 seule fois)',
              'Hebdomadaire',
              'Toutes les 2 semaines',
              'Mensuel',
              'À voir ensemble',
            ]}
          />
          <Field
            label="Date / créneau souhaité"
            name="desiredDate"
            placeholder="Ex : jeudi 28 mai matin"
          />
        </div>
        <div className="form-row full">
          <TextareaField
            label="Précisions (facultatif)"
            name="notes"
            placeholder="Allergies, articles fragiles, instructions particulières, etc."
            rows={3}
          />
        </div>
      </div>

      {result && 'success' in result && (
        <div role="status" className="form-alert success">
          ✓ <strong>Demande reçue.</strong> Nous vous appelons sous 24h pour confirmer
          la date de collecte, vous donner un devis et fixer la livraison.
        </div>
      )}
      {result && 'error' in result && (
        <div role="alert" className="form-alert error">
          ! {result.error}
        </div>
      )}

      <div className="form-footer">
        <span className="form-note">Devis sous 24h</span>
        <button type="submit" disabled={isPending} className="form-submit">
          <span>{isPending ? 'Envoi…' : 'Programmer ma collecte'}</span>
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
