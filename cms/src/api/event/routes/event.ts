import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::event.event', {
  config: {
    find: {
      auth: false, // Public access for frontend
    },
    findOne: {
      auth: false, // Public access for frontend
    },
    // create, update, delete remain protected (default auth: true)
  },
});
