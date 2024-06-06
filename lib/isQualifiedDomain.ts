import { isString } from "./assert.ts";

export function isQualifiedDomain(
  domain: string,
  options: { ignoreMaxLength?: boolean } = { ignoreMaxLength: false }
) {
  isString(domain);

  const parts = domain.split(".");
  const tld = parts[parts.length - 1];

  // without tld
  if (parts.length < 2) {
    return false;
  }

  // disallow spaces
  if (/\s/.test(tld)) {
    return false;
  }

  return parts.every((part) => {
    if (part.length > 63 && !options.ignoreMaxLength) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }

    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    // disallow parts starting or ending with hyphen
    if (/^-|-$/.test(part)) {
      return false;
    }

    return true;
  });
}
