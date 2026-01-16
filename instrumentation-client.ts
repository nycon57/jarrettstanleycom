import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    { path: '/api/email/send', method: 'POST' },
    { path: '/api/email/retry', method: 'POST' },
    { path: '/api/email/test', method: 'POST' },
  ],
});
