import { dsn } from './config/sentry';

export async function openReportDialog(title) {
  const Sentry = await import('@sentry/vue');

  Sentry.showReportDialog({
    title,
    dsn,
    eventId: Sentry.captureMessage('User\'s report'),
    subtitle: '',
    subtitle2: '',
  });
}
