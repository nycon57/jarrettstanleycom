import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    { path: '/api/contact', method: 'POST' },
    { path: '/api/contact/media', method: 'POST' },
    { path: '/api/consulting', method: 'POST' },
    { path: '/api/newsletter', method: 'POST' },
    { path: '/api/resources/track-download', method: 'POST' },
    { path: '/api/email/send', method: 'POST' },
    { path: '/api/email/retry', method: 'POST' },
    { path: '/api/email/test', method: 'POST' },
  ],
});
