'use client';

import { useState, useTransition } from 'react';
import { submitProLinen, type FormResult } from '../actions';

export function ProLinenForm() {
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
          const res = await submitProLinen(formData);
          setResult(res);
          if ('success' in res) {
            form.reset();
          }
        });
      }}
      id="pro-form"
      className="form-wrap"
      style={{ background: 'rgba(251, 248, 242, 0.06)', borderColor: 'rgba(251, 248, 242, 0.18)' }}
    >
      <div className="form-section" style={{ borderColor: 'rgba(251, 248, 242, 0.18)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow" style={{ color: 'var(--marron-claire)' }}>
            01 — Votre établissement
          </span>
          <h3 className="form-section-title" style={{ color: 'var(--ivoire)' }}>
            Présentez votre activité
          </h3>
        </div>
        <div className="form-row">
          <Field label="Nom de l'établissement" name="companyName" required placeholder="Hôtel des Bords de Loire" dark />
          <SelectField
            label="Type d'activité"
            name="businessType"
            required
            options={[
              '',
              'Hôtel / B&B',
              'Gîte / Airbnb',
              'Restaurant / Brasserie',
              'Salon de coiffure / esthétique',
              'Cabinet médical / paramédical',
              'Crèche / accueil enfants',
              'Sport / fitness',
              'Autre',
            ]}
            dark
          />
        </div>
        <div className="form-row">
          <Field label="Prénom / nom du contact" name="contactName" required placeholder="Marie Dupont" dark />
          <Field label="Fonction" name="role" placeholder="Gérant·e, gouvernant·e…" dark />
        </div>
        <div className="form-row">
          <Field label="Email professionnel" name="email" type="email" required placeholder="contact@etablissement.fr" dark />
          <Field label="Téléphone" name="phone" type="tel" required placeholder="06 12 34 56 78" dark />
        </div>
        <div className="form-row">
          <Field label="Adresse / ville" name="address" required placeholder="58000 Nevers" dark />
          <Field label="Site web (facultatif)" name="website" placeholder="www.votresite.fr" dark />
        </div>
      </div>

      <div className="form-section" style={{ borderColor: 'rgba(251, 248, 242, 0.18)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="form-section-eyebrow" style={{ color: 'var(--marron-claire)' }}>
            02 — Vos besoins
          </span>
          <h3 className="form-section-title" style={{ color: 'var(--ivoire)' }}>
            Quel volume, quelle cadence&nbsp;?
          </h3>
        </div>
        <div className="form-row">
          <SelectField
            label="Volume hebdomadaire estimé"
            name="volume"
            options={[
              '',
              'Moins de 20 kg / semaine',
              '20 — 50 kg / semaine',
              '50 — 100 kg / semaine',
              '100 — 200 kg / semaine',
              'Plus de 200 kg / semaine',
              'Je préfère en discuter',
            ]}
            dark
          />
          <SelectField
            label="Fréquence souhaitée"
            name="frequency"
            options={[
              '',
              'Quotidienne',
              '2 à 3 fois par semaine',
              'Hebdomadaire',
              'À la demande',
            ]}
            dark
          />
        </div>
        <div className="form-row">
          <SelectField
            label="Type de linge"
            name="linenType"
            options={[
              '',
              'Linge de lit (draps, taies)',
              'Serviettes / éponge',
              'Nappes / linge de table',
              'Tenues professionnelles',
              'Linge varié',
            ]}
            dark
          />
          <SelectField
            label="Collecte + livraison"
            name="delivery"
            options={[
              '',
              'Oui — collecte chez nous',
              'Non — on vient déposer',
              'À voir ensemble',
            ]}
            dark
          />
        </div>
        <div className="form-row full">
          <TextareaField
            label="Précisions sur vos besoins"
            name="notes"
            placeholder="Exigences sanitaires, contraintes horaires, marquage du linge, etc."
            rows={4}
            dark
          />
        </div>
      </div>

      {result && 'success' in result && (
        <div role="status" className="form-alert success">
          ✓ <strong>Demande reçue.</strong> Nous revenons vers vous sous 48h pour
          étudier ensemble votre besoin et vous proposer un devis sur mesure.
        </div>
      )}
      {result && 'error' in result && (
        <div role="alert" className="form-alert error">
          ! {result.error}
        </div>
      )}

      <div className="form-footer">
        <span className="form-note" style={{ color: 'var(--marron-claire)' }}>
          Devis sur mesure sous 48h
        </span>
        <button type="submit" disabled={isPending} className="form-submit">
          <span>{isPending ? 'Envoi…' : 'Demander un devis pro'}</span>
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
        {required && (
          <span className="req" style={dark ? { color: 'var(--marron-claire)' } : undefined}>*</span>
        )}
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
  required,
  dark,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  dark?: boolean;
}) {
  return (
    <label className="field">
      <span
        className="field-label"
        style={dark ? { color: 'rgba(251, 248, 242, 0.7)' } : undefined}
      >
        {label}
        {required && (
          <span className="req" style={dark ? { color: 'var(--marron-claire)' } : undefined}>*</span>
        )}
      </span>
      <select
        name={name}
        defaultValue=""
        required={required}
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
