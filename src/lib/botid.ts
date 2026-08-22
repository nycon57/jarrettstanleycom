import { checkBotId } from 'botid/server';

/**
 * Returns whether BotID classified the current request as a bot. A BotID
 * infrastructure failure should not prevent legitimate visitors from using a
 * public form, so callers can safely continue when no verdict is available.
 */
export async function isBotIdBotRequest(): Promise<boolean> {
  try {
    const verification = await checkBotId();
    return verification.isBot;
  } catch (error) {
    console.warn('BotID verification unavailable; allowing request to continue', {
      error: error instanceof Error ? error.message : String(error),
      source: 'botid',
    });

    return false;
  }
}
