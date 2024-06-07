import { isString } from "./assert.ts";
import { isQualifiedDomain } from "./isQualifiedDomain.ts";

const _DEFAULT_MAX_EMAIL_LENGTH = 250;
const _USER_NAME_REGEXP = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))$/
);

/**
 * validate correctness of email
 *
 * @example
 * ```ts
 * isEmail("help+user1@xyz.tld", { hostWhiteList: ["xyz.tld"] })
 * ```
 */
export function isEmail(
  email: string,
  options: {
    /**
     * returns `true` if domain matches the list
     */
    hostWhiteList?: string[];
    /**
     * returns `false` if domain matches the list. Takes priority over `options.hostWhiteList`
     */
    hostBlackList?: string[];
    /**
     * validates long email bigger than 250 characters
     */
    ignoreMaxLength?: boolean;
  } = {
    hostBlackList: [],
    hostWhiteList: [],
    ignoreMaxLength: false,
  }
): boolean {
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
