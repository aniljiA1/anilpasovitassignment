export const BASE = import.meta.env.VITE_API_BASE || 'https://anilpasovitbackend.onrender.com';

export async function api(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {})
    },
    ...opts
  });
  return res.json();
}
