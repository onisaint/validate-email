import { isString } from "./assert.ts";
import { isEmail } from "./isEmail.ts";

const _MAIL_IP = "1.1.1.1";

export async function isEmailReachable(
  email: string,
  options: { skipValidityTest?: boolean } = { skipValidityTest: false }
) {
  isString(email);

  if (!options.skipValidityTest) {
    if (!isEmail(email)) {
      throw new Error("Invalid email");
    }
  }

  try {
    const [_, domain] = email.split("@");

    const mxRecords = await Deno.resolveDns(domain, "MX", {
      nameServer: { ipAddr: _MAIL_IP },
    });

    if (Array.isArray(mxRecords) && mxRecords.length > 2) {
      if (mxRecords.every((record) => record.exchange)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}
