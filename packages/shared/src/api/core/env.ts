const ENV_KEY = 'NEXT_PUBLIC_BACKEND_MAIN_API_URL';
const SERVER_ENV_KEY = 'BACKEND_SERVER_API_URL';
const DEV_FALLBACK = 'http://localhost:8080';
const DEV_SERVER_FALLBACK = 'http://backend:8000';

export function getBackendMainApiUrl(): string {
  const configured = process.env[ENV_KEY]?.trim();
  if (configured) {
    return configured;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      `${ENV_KEY} was not set at build time. Rebuild the frontend with your public https API URL (e.g. https://api.example.com).`,
    );
  }
  return DEV_FALLBACK;
}

/** Server-side fetch URL (Docker internal); falls back to public API URL. */
export function getBackendServerApiUrl(): string {
  const server = process.env[SERVER_ENV_KEY]?.trim();
  if (server) {
    return server;
  }
  if (process.env.NODE_ENV === 'production') {
    return getBackendMainApiUrl();
  }
  return DEV_SERVER_FALLBACK;
}

export const env = {
  get backendMainApiUrl(): string {
    return getBackendMainApiUrl();
  },
  get backendServerApiUrl(): string {
    return getBackendServerApiUrl();
  },
};
