export function isString(str: unknown): str is string {
  const _isString = typeof str === "string" || str instanceof String;

  if (!_isString) {
    throw new TypeError("Expected a string");
  }

  return true;
}
