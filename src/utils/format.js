/**
 * Truncate Ethereum address for display.
 * @param {string} address
 * @param {number} [chars=4]
 * @returns {string}
 */
export function truncateAddress(address, chars = 4) {
  if (!address || address.length < chars * 2 + 1) return address;
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}

/**
 * Copy text to clipboard and return success.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
