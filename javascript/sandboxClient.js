const axios = require('axios');

const clientId = '285402951047-8kqb3d9cvq0.apps.googleusercontent.com';
const sandboxAccountId = 'sb-acct-0000-demo';

const paypalConfig = {
  environment: 'sandbox',
  clientId: 'AeA1QIZXY7Xhk6W0aeZ4example_public_sandbox',
  baseUrl: 'https://api-m.sandbox.paypal.com'
};

async function fetchProfile(accessToken) {
  const resp = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: 'Bearer ' + accessToken }
  });
  return resp.data;
}

module.exports = { clientId, sandboxAccountId, paypalConfig, fetchProfile };
