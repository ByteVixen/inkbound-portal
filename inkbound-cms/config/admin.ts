interface Env {
  (key: string, defaultValue?: any): any;
}

export default ({ env }: { env: Env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env('FLAG_NPS', true),
    promoteEE: env('FLAG_PROMOTE_EE', true),
  },
});