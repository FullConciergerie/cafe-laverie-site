'use server';

export type FormResult =
  | { success: true }
  | { error: string };

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  'Café Laverie Nevers <noreply@fullconciergerie.com>';
// Destinataire : Delil (boîte café laverie). Modifiable via env var.
const TO_EMAIL =
  process.env.CAFE_LAVERIE_TO_EMAIL ?? 'contact@cafe-laverie.fr';

/**
 * Validations partagées entre toutes les soumissions.
 * Renvoie une `FormResult` d'erreur si quelque chose cloche, ou null si OK.
 */
function validate(
  data: Record<string, string>,
  requiredFields: readonly string[],
): FormResult | null {
  // Étiquettes lisibles côté utilisateur (au lieu des noms de champ techniques)
  const labels: Record<string, string> = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    postalCode: 'Code postal',
    companyName: "Nom de l'établissement",
    businessType: "Type d'activité",
    contactName: 'Nom du contact',
    desiredDate: 'Date souhaitée',
    quantity: "Nombre d'épillettes",
    linenType: 'Type de linge',
    volume: 'Volume',
  };

  for (const f of requiredFields) {
    if (!data[f] || data[f].trim() === '') {
      const label = labels[f] ?? f;
      return { error: `Le champ « ${label} » est obligatoire.` };
    }
  }

  // Email basic check
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "L'adresse email n'est pas valide." };
  }

  return null;
}

/** Échappe le HTML pour éviter les injections dans le mail. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renvoie un tableau HTML clé/valeur de toutes les données du formulaire,
 * lisible côté boîte mail.
 */
function dataToHtmlTable(data: Record<string, string>): string {
  const labels: Record<string, string> = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    postalCode: 'Code postal',
    floor: 'Étage / interphone',
    volume: 'Volume',
    linenType: 'Type de linge',
    frequency: 'Fréquence',
    desiredDate: 'Date souhaitée',
    timeSlot: 'Créneau',
    notes: 'Précisions',
    quantity: "Nombre d'épillettes",
    petType: 'Espèce',
    companyName: 'Établissement',
    businessType: "Type d'activité",
    contactName: 'Contact',
    role: 'Fonction',
    website: 'Site web',
    delivery: 'Collecte + livraison',
    eventType: "Type d'événement",
    eventDate: "Date de l'événement",
    guests: 'Nombre de personnes',
    duration: 'Heure / durée',
    description: 'Description',
    city2: 'Ville / zone envisagée',
    currentRole: 'Situation actuelle',
    investment: "Capacité d'investissement",
    timeline: 'Horizon de lancement',
    experience: 'Expérience',
    motivation: 'Motivation',
  };

  // Ordre privilégié : on commence par identité, contact, puis le reste.
  const priorityOrder = [
    'firstName', 'lastName', 'email', 'phone',
    'companyName', 'businessType', 'contactName', 'role',
    'address', 'city', 'postalCode', 'floor', 'website',
    'eventType', 'eventDate', 'guests', 'duration',
    'volume', 'linenType', 'quantity', 'petType',
    'frequency', 'delivery', 'desiredDate', 'timeSlot',
    'currentRole', 'investment', 'timeline',
    'description', 'experience', 'motivation', 'notes',
  ];

  const orderedKeys = [
    ...priorityOrder.filter((k) => k in data),
    ...Object.keys(data).filter((k) => !priorityOrder.includes(k)),
  ];

  const rows = orderedKeys
    .filter((k) => data[k] && data[k].trim() !== '')
    .map((k) => {
      const label = labels[k] ?? k;
      const value = escapeHtml(data[k].trim()).replace(/\n/g, '<br/>');
      return `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; vertical-align: top; color: #6b7280; font-size: 12px; white-space: nowrap;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; vertical-align: top; color: #111827;">
            ${value}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #fafafa; border: 1px solid #eee; border-radius: 6px; overflow: hidden;">
      ${rows}
    </table>
  `;
}

/**
 * Envoi du mail via Resend. Si RESEND_API_KEY n'est pas configurée,
 * on log en console et on renvoie success quand même (le formulaire ne
 * doit pas avoir l'air cassé pour l'utilisateur final pour autant).
 */
async function sendNotification(
  subject: string,
  data: Record<string, string>,
): Promise<FormResult> {
  if (!RESEND_API_KEY) {
    // eslint-disable-next-line no-console
    console.warn(
      `[CafeLaverie] RESEND_API_KEY manquante — soumission "${subject}" loguée seulement :`,
      data,
    );
    // Petit délai pour l'UX
    await new Promise((r) => setTimeout(r, 400));
    return { success: true };
  }

  const fromName = (data.firstName || '') + ' ' + (data.lastName || '');
  const safeFrom = escapeHtml(fromName.trim() || 'Visiteur du site');
  const safeEmail = escapeHtml(data.email ?? '');
  const safePhone = escapeHtml(data.phone ?? '');

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
      <h2 style="color: #9b6b4a; margin-bottom: 6px;">${escapeHtml(subject)}</h2>
      <p style="color: #6b7280; margin-top: 0; font-size: 14px;">
        Reçu depuis le site <strong>cafelaverie.fr</strong>
      </p>

      <div style="padding: 14px 16px; background: #fff7ed; border-left: 4px solid #9b6b4a; border-radius: 4px; margin: 16px 0;">
        <p style="margin: 0; font-size: 16px;"><strong>${safeFrom}</strong></p>
        ${safeEmail ? `<p style="margin: 4px 0 0; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #9b6b4a; text-decoration: none;">${safeEmail}</a></p>` : ''}
        ${safePhone ? `<p style="margin: 4px 0 0; font-size: 14px;"><a href="tel:${safePhone.replace(/\s/g, '')}" style="color: #9b6b4a; text-decoration: none;">${safePhone}</a></p>` : ''}
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Détails de la demande :</p>
      ${dataToHtmlTable(data)}

      <p style="margin-top: 24px; color: #6b7280; font-size: 12px;">— Site cafelaverie.fr</p>
    </div>
  `;

  try {
    const replyTo = data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
      ? data.email
      : undefined;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: `[Café Laverie] ${subject}`,
        html,
        reply_to: replyTo,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      // eslint-disable-next-line no-console
      console.error(
        `[CafeLaverie] Resend rejected for "${subject}"`,
        res.status,
        body.slice(0, 300),
      );
      return {
        error:
          "Impossible d'envoyer la demande pour le moment. Réessayez ou appelez-nous directement.",
      };
    }
  } catch (err) {
    console.error(`[CafeLaverie] Resend fetch threw for "${subject}"`, err);
    return {
      error:
        "Problème réseau pendant l'envoi. Réessayez dans un instant.",
    };
  }

  return { success: true };
}

function formDataToObject(formData: FormData): Record<string, string> {
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') data[key] = value;
  }
  return data;
}

export async function submitPetReservation(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  const v = validate(data, ['firstName', 'lastName', 'email', 'phone', 'quantity', 'linenType']);
  if (v) return v;
  return sendNotification('Nouvelle demande — Linge animaux', data);
}

export async function submitOpenLaverie(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  const v = validate(data, ['firstName', 'lastName', 'email', 'phone', 'city']);
  if (v) return v;
  return sendNotification('Nouvelle candidature — Ouvrir une laverie', data);
}

export async function submitEventRequest(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  const v = validate(data, ['firstName', 'lastName', 'email', 'phone']);
  if (v) return v;
  return sendNotification('Nouvelle demande — Privatisation espace', data);
}

export async function submitHomePickup(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  const v = validate(data, [
    'firstName', 'lastName', 'email', 'phone',
    'address', 'city', 'postalCode', 'volume',
  ]);
  if (v) return v;
  return sendNotification('Nouvelle demande — Collecte linge à domicile', data);
}

export async function submitProLinen(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  const v = validate(data, [
    'companyName', 'businessType', 'contactName', 'email', 'phone', 'address',
  ]);
  if (v) return v;
  return sendNotification('Nouvelle demande — Linge professionnels (B2B)', data);
}
