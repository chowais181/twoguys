import ApiClient from '~/api/Client';

const endpoint = 'v1/stripe/checkout-session';

export default {
  createCheckoutSession(data) {
      return ApiClient.post(endpoint, data);
  },
}


