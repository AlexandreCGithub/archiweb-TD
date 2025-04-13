/**
 * Removes accents from a given string by normalizing it to its decomposed form
 * and removing diacritical marks.
 *
 * @param str - The input string from which accents will be removed.
 * @returns A new string with accents removed.
 */
export function removeAccents(str: string): string {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
