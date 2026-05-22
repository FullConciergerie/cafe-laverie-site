'use client';

import { useState, useTransition } from 'react';
import { submitOpenLaverie, type FormResult } from '../actions';

export function OpenLaverieForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      action={(formData) => {
        setResult(null);
        startTransition(async () => {
          const res = await submitOpenLaverie(formData);
          setResult(res);
          if ('success' in res) {
            (document.getElementById('open-form') as HTMLFormElement)?.reset();
          }
        });
      }}
      id="open-form"
      className="form-wrap"
    >
      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">01 — Vos coordonnées</span>
          <h3 className="form-section-title">Présentez-vous</h3>
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
          <span className="form-section-eyebrow">02 — Votre projet</span>
          <h3 className="form-section-title">Où voulez-vous ouvrir&nbsp;?</h3>
        </div>
        <div className="form-row">
          <Field
            label="Ville / zone envisagée"
            name="city"
            required
            placeholder="Bourges, Auxerre, Mâcon…"
          />
          <SelectField
            label="Horizon de lancement"
            name="timeline"
            options={[
              '',
              'Dans les 3 mois',
              'Dans 3 à 6 mois',
              'Dans 6 à 12 mois',
              'Plus tard / à explorer',
            ]}
          />
        </div>
        <div className="form-row">
          <SelectField
            label="Votre situation actuelle"
            name="currentRole"
            options={[
              '',
              'Salarié·e — réflexion / reconversion',
              'Salarié·e — projet en parallèle',
              'Déjà indépendant·e',
              'Investisseur·euse',
              'En recherche d\'activité',
              'Retraité·e actif·ve',
              'Autre',
            ]}
          />
          <SelectField
            label="Capacité d'investissement"
            name="investment"
            options={[
              '',
              'Moins de 30 000 €',
              '30 000 — 60 000 €',
              '60 000 — 100 000 €',
              '100 000 € et plus',
              'Je préfère en discuter',
            ]}
          />
        </div>
      </div>

      <div className="form-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow">03 — Pour mieux vous connaître</span>
          <h3 className="form-section-title">Votre parcours, votre vision</h3>
        </div>
        <div className="form-row full">
          <TextareaField
            label="Expérience pertinente (facultatif)"
            name="experience"
            placeholder="Immobilier, hospitalité, gestion, entrepreneuriat, etc."
            rows={3}
          />
        </div>
        <div className="form-row full">
          <TextareaField
            label="Pourquoi ce projet vous intéresse&nbsp;?"
            name="motivation"
            placeholder="Ce que vous cherchez à construire, votre vision, votre marché local…"
            rows={4}
          />
        </div>
      </div>

      {result && 'success' in result && (
        <div role="status" className="form-alert success">
          ✓ <strong>Candidature reçue.</strong> Delil vous appelle sous 48h pour un
          premier échange de découverte (30 minutes, gratuit).
        </div>
      )}
      {result && 'error' in result && (
        <div role="alert" className="form-alert error">
          ! {result.error}
        </div>
      )}

      <div className="form-footer">
        <span className="form-note">Premier échange gratuit</span>
        <button type="submit" disabled={isPending} className="form-submit">
          <span>{isPending ? 'Envoi…' : 'Demander un appel découverte'}</span>
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
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select name={name} defaultValue="" className="field-select">
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
