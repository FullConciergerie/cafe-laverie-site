'use server';

export type FormResult =
  | { success: true }
  | { error: string };

/**
 * Stub : pour l'instant on log et on renvoie success.
 * Pour câbler l'envoi d'email, ajouter une intégration Resend / Postmark / etc.
 * et configurer la variable d'env RESEND_API_KEY + FROM_EMAIL + TO_EMAIL.
 */
async function sendNotification(
  subject: string,
  data: Record<string, string>,
): Promise<FormResult> {
  // Validation minimale
  const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
  for (const f of requiredFields) {
    if (!data[f] || data[f].trim() === '') {
      return { error: `Le champ « ${f} » est obligatoire.` };
    }
  }

  // Email basic check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: 'Email invalide.' };
  }

  // TODO : remplacer par Resend ou un webhook quand prêt
  // eslint-disable-next-line no-console
  console.log(`[CafeLaverie] ${subject}`, data);

  // Faux délai pour l'UX
  await new Promise((r) => setTimeout(r, 600));

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
  return sendNotification('Nouvelle demande — Linge animaux', data);
}

export async function submitOpenLaverie(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  return sendNotification('Nouvelle candidature — Ouvrir une laverie', data);
}

export async function submitMachineReservation(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  return sendNotification('Nouvelle réservation machine', data);
}

export async function submitEventRequest(formData: FormData): Promise<FormResult> {
  const data = formDataToObject(formData);
  return sendNotification('Nouvelle demande — Privatisation espace', data);
}
