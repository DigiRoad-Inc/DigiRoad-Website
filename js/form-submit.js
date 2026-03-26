/* ─────────────────────────────────────────────────────────────────
   form-submit.js
   Sends form data to the Supabase Edge Function.
   No API keys — all secrets live server-side in the edge function.
───────────────────────────────────────────────────────────────── */
var SUBMIT_URL = 'https://gtypkmndvodclqxbpkdr.supabase.co/functions/v1/submit-form';

function submitForm(type, data, onSuccess, onError) {
  return fetch(SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({ type: type }, data))
  })
  .then(function (res) { return res.json(); })
  .then(function (json) {
    if (json.error) throw new Error(json.error);
    if (onSuccess) onSuccess();
  })
  .catch(function (err) {
    console.error('Form submission error:', err);
    if (onError) onError(err.message || 'Something went wrong. Please try again.');
  });
}
