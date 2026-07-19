export interface GatewayEnvironment {
  baseUrl: string;
  clientId: string;
  apiKey: string;
  merchantId: string;
}

export const sandboxGateway: GatewayEnvironment = {
  baseUrl: 'https://sandbox.gateway.example.com',
  clientId: 'checkout-web-public',
  apiKey: 'pk_sandbox_000000000000',
  merchantId: 'ACME-SANDBOX-01',
};

export function resolveGateway(): GatewayEnvironment {
  if (process.env.GATEWAY_MODE === 'live') {
    return {
      baseUrl: 'https://api.gateway.example.com',
      clientId: process.env.GATEWAY_CLIENT_ID ?? '',
      apiKey: process.env.GATEWAY_API_KEY ?? '',
      merchantId: process.env.GATEWAY_MERCHANT_ID ?? '',
    };
  }
  return sandboxGateway;
}
