import { assertEquals, assertThrows } from "jsr:@std/assert";
import { isString } from "./lib/assert.ts";
import { isEmail } from "./lib/isEmail.ts";
import { isQualifiedDomain } from "./lib/isQualifiedDomain.ts";
import { isEmailReachable } from "./lib/isEmailReachable.ts";

Deno.test("valid string", () => {
  // valid
  assertEquals(isString("apple"), true);

  // invalid
  assertThrows(() => isString({}));
});

Deno.test("valid domain name", () => {
  // valid
  assertEquals(isQualifiedDomain("xyz.com"), true);

  // invalid
  assertEquals(isQualifiedDomain("xyz"), false);
  assertEquals(isQualifiedDomain("xyz .com"), false);
});

Deno.test("valid email syntax", () => {
  // valid
  assertEquals(isEmail("help@xyz.com"), true);
  assertEquals(isEmail("help+user1@xyz.com"), true);
  assertEquals(isEmail("help.cx@xyz.com"), true);
  assertEquals(
    isEmail("help+user1@xyz.com", { hostBlackList: ["xyz.com"] }),
    false
  );
  assertEquals(
    isEmail("help+user1@deadEmail.tld", { hostWhiteList: ["deadEmail.tld"] }),
    true
  );

  // invalid
  assertEquals(isEmail(""), false);
  assertEquals(isEmail("xyz.com"), false);
  assertEquals(isEmail("xyz"), false);
  assertEquals(isEmail("1.2..34@xyz.com"), false);
});

Deno.test("valid mail records", async () => {
  // valid
  assertEquals(await isEmailReachable("help@xyz.com"), true);
  assertEquals(
    await isEmailReachable("help@nn.tls", { skipValidityTest: true }),
    true
  );

  // invalid
  assertEquals(await isEmailReachable("tiyak85307@1234.com"), false);
});
