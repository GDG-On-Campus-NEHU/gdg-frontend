/**
 * @typedef {Object} EventRecord
 * @property {number|string} [id]
 * @property {string|null} [title]
 * @property {string|null} [event_date]
 * @property {boolean|null} [requires_registration]
 * @property {string|null} [registration_link]
 * @property {string|null} [registration_deadline]
 * @property {boolean} [registration_open]
 * @property {string|null} [mode]
 * @property {string|null} [location_address]
 * @property {string|null} [meeting_link]
 */

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

export const parseDateValue = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDateTime = (value) => {
  const parsed = parseDateValue(value);
  if (!parsed) return '';
  return DATE_TIME_FORMATTER.format(parsed);
};

export const formatCalendarDate = (value) => {
  const parsed = parseDateValue(value);
  if (!parsed) return '';
  return DATE_FORMATTER.format(parsed);
};

export const formatClockTime = (value) => {
  const parsed = parseDateValue(value);
  if (!parsed) return '';
  return TIME_FORMATTER.format(parsed);
};

const hasRegistrationLink = (event) =>
  typeof event?.registration_link === 'string' && event.registration_link.trim().length > 0;

/**
 * @param {EventRecord|null|undefined} event
 * @param {Date} [now]
 */
export const resolveRegistrationState = (event, now = new Date()) => {
  const requiresRegistration = event?.requires_registration === true;
  const linkPresent = hasRegistrationLink(event);
  const deadline = parseDateValue(event?.registration_deadline);

  if (!requiresRegistration) {
    return {
      requiresRegistration: false,
      linkPresent,
      deadline,
      isOpen: false,
    };
  }

  let isOpen;
  if (typeof event?.registration_open === 'boolean') {
    isOpen = event.registration_open;
  } else if (!deadline) {
    isOpen = linkPresent;
  } else {
    isOpen = now.getTime() <= deadline.getTime();
  }

  return {
    requiresRegistration: true,
    linkPresent,
    deadline,
    isOpen,
  };
};
