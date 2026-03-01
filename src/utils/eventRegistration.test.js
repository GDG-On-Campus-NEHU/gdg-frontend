import { describe, expect, it } from 'vitest';
import { formatDateTime, resolveRegistrationState } from './eventRegistration';

describe('event registration state', () => {
  it('keeps registration open for future deadlines', () => {
    const now = new Date('2026-03-01T10:00:00.000Z');
    const event = {
      requires_registration: true,
      registration_link: 'https://example.com/register',
      registration_deadline: '2026-03-02T10:00:00.000Z',
      registration_open: true,
    };

    const state = resolveRegistrationState(event, now);

    expect(state.requiresRegistration).toBe(true);
    expect(state.isOpen).toBe(true);
    expect(state.linkPresent).toBe(true);
  });

  it('closes registration for past deadlines when registration_open is missing', () => {
    const now = new Date('2026-03-01T10:00:00.000Z');
    const event = {
      requires_registration: true,
      registration_link: 'https://example.com/register',
      registration_deadline: '2026-02-27T10:00:00.000Z',
    };

    const state = resolveRegistrationState(event, now);

    expect(state.isOpen).toBe(false);
    expect(formatDateTime(event.registration_deadline)).not.toBe('');
  });

  it('hides registration when no registration is required', () => {
    const state = resolveRegistrationState({
      requires_registration: false,
      registration_link: 'https://example.com/register',
      registration_deadline: null,
    });

    expect(state.requiresRegistration).toBe(false);
    expect(state.isOpen).toBe(false);
  });

  it('falls back to open when required + link exists + deadline is null', () => {
    const state = resolveRegistrationState({
      requires_registration: true,
      registration_link: 'https://example.com/register',
      registration_deadline: null,
    });

    expect(state.requiresRegistration).toBe(true);
    expect(state.isOpen).toBe(true);
  });

  it('prefers registration_open over derived fallback', () => {
    const now = new Date('2026-03-01T10:00:00.000Z');
    const event = {
      requires_registration: true,
      registration_link: 'https://example.com/register',
      registration_deadline: '2026-02-27T10:00:00.000Z',
      registration_open: true,
    };

    const state = resolveRegistrationState(event, now);
    expect(state.isOpen).toBe(true);
  });
});
