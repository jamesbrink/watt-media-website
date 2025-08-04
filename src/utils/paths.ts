/**
 * Utility functions for handling paths and URLs
 */

/**
 * Remove trailing slash from a path if present
 */
export function removeTrailingSlash(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * Get the base path without trailing slash
 */
export function getBasePath(): string {
  const basePath = import.meta.env.BASE_URL;
  return removeTrailingSlash(basePath);
}

/**
 * Check if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Check if a URL is a special type (mailto, tel, etc.)
 */
export function isSpecialUrl(url: string): boolean {
  return url.startsWith('mailto:') || url.startsWith('tel:');
}

/**
 * Check if a URL is a hash link
 */
export function isHashLink(url: string): boolean {
  return url.startsWith('#');
}

/**
 * Add base path to internal URLs
 */
export function addBasePath(url: string): string {
  if (isExternalUrl(url) || isSpecialUrl(url) || isHashLink(url) || !url.startsWith('/')) {
    return url;
  }
  
  const basePath = getBasePath();
  return basePath + url;
}