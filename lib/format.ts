// The one place that knows the business's locale, currency and time zone.
// Today these are Laguna Escondida's; with multi-tenancy they come from the
// signed-in organization (ai-plan/multi-tenancy/README.md, phase 1).
export const formatSettings = {
  locale: "es-CO",
  currency: "COP",
  timeZone: "America/Bogota",
};

type DateInput = string | number | Date;

const toDate = (value: DateInput) =>
  value instanceof Date ? value : new Date(value);

// Money in the business currency, whole units by default. Unparseable input
// shows as zero rather than "NaN".
export function formatMoney(
  value: string | number,
  options?: Intl.NumberFormatOptions
): string {
  const num = typeof value === "number" ? value : parseFloat(value);
  return new Intl.NumberFormat(formatSettings.locale, {
    style: "currency",
    currency: formatSettings.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(isNaN(num) ? 0 : num);
}

// A plain number in the business locale (thousands separators, decimals).
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(formatSettings.locale, options);
}

export const LONG_DATE: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const LONG_DATE_TIME: Intl.DateTimeFormatOptions = {
  ...LONG_DATE,
  hour: "2-digit",
  minute: "2-digit",
};

// "22/10/2026, 14:30:00"
export const NUMERIC_DATE_TIME: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

// The date and time helpers render in the browser's time zone unless the
// caller passes timeZone (see inBusinessTimeZone).

// "22 oct 2026"
export function formatDate(
  value: DateInput,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  return toDate(value).toLocaleDateString(formatSettings.locale, options);
}

// "22 oct 2026, 02:30 p. m."
export function formatDateTime(
  value: DateInput,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
): string {
  return toDate(value).toLocaleString(formatSettings.locale, options);
}

// "02:30 p. m."
export function formatTime(
  value: DateInput,
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
): string {
  return toDate(value).toLocaleTimeString(formatSettings.locale, options);
}

// Adds the business time zone to a set of format options, for screens that
// must show the restaurant's clock whatever the device's (kitchen).
export function inBusinessTimeZone(
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormatOptions {
  return { ...options, timeZone: formatSettings.timeZone };
}

// Today's business day as YYYY-MM-DD (en-CA formats dates that way).
export function todayInBusinessTz(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: formatSettings.timeZone,
  }).format(now);
}
