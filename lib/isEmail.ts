import { isString } from "./assert.ts";
import { isQualifiedDomain } from "./isQualifiedDomain.ts";

const _DEFAULT_MAX_EMAIL_LENGTH = 254;
const _USER_NAME_REGEXP = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))$/
);

export function isEmail(
  email: string,
  options: {
    hostWhiteList?: string[];
    hostBlackList?: string[];
    ignoreMaxLength?: boolean;
  } = {
    hostBlackList: [],
    hostWhiteList: [],
    ignoreMaxLength: false,
  }
) {
  isString(email);

  if (!options?.ignoreMaxLength && email.length > _DEFAULT_MAX_EMAIL_LENGTH) {
    return false;
  }

  const [user, domain] = email.split("@");

  if (!user || !domain) {
    return false;
  }

  if (
    (options?.hostBlackList ?? []).length > 0 &&
    options?.hostBlackList?.includes(domain)
  ) {
    return false;
  }

  if (
    (options?.hostWhiteList ?? []).length > 0 &&
    options?.hostWhiteList?.includes(domain)
  ) {
    return true;
  }

  if (
    !isQualifiedDomain(domain, { ignoreMaxLength: options.ignoreMaxLength })
  ) {
    return false;
  }

  if (!_USER_NAME_REGEXP.test(user)) {
    return false;
  }

  return true;
}
