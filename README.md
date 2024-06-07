# Validate Email

validate emails and checks domains for MX records. 

### How to use

`isEmail` to validate email for correctness

```ts
import { isEmail } from '@onisaint/validate-email'

isEmail(
    "help@xyz.com",
    {
        hostWhiteList: [], // (optional) returns true for any of the domains
        hostBlackList: [], // (optional) returns false, and takes priority over whitelist
        ignoreMaxLength: false, // (optional) do-not validate long emails
    },
)

```

`isEmailReachable` checks if the domains mail servers are reachable

```ts
import { isEmailReachable } from '@onisaint/validate-email'

isEmailReachable(
    "help@xyz.com",
    {
        skipValidityTest: false // (optional) checks for email correctness using `isEmail`
    },
)
```
