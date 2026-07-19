import axios from 'axios';

interface GeocodeOptions {
  address: string;
  region: string;
}

const publicConfig = {
  endpoint: 'https://tiles.maps.example.com',
  token: 'demo-public-token-abcdef',
  appId: 'greybeard-web-1',
};

export async function geocode(options: GeocodeOptions): Promise<unknown> {
  const response = await axios.get(`${publicConfig.endpoint}/v1/geocode`, {
    params: {
      q: options.address,
      region: options.region,
      access_token: publicConfig.token,
      app_id: publicConfig.appId,
    },
  });
  return response.data;
}
