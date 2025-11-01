export interface SeasonalOfferConfig {
  prefix: string;
  minDiscount: number;
  maxDiscount: number;
  successMessage: string;
  neutralMessage: string;
  invalidMessage: string;
  exampleCode: string;
}

export interface ParsedSeasonalOfferCode {
  code: string;
  discount: number;
}

export const offersEnabled = true;

export const seasonalOfferConfig: SeasonalOfferConfig = {
  prefix: 'SEASONSGREETINGS',
  minDiscount: 1,
  maxDiscount: 500,
  successMessage: 'Seasonal savings unlocked.',
  neutralMessage: 'Enter the code from your printed card to check your savings.',
  invalidMessage: 'That code is not recognised. Double-check the card and try again.',
  exampleCode: 'SEASONSGREETINGS25'
};

export const normalizeOfferCode = (value: string): string =>
  value.trim().toUpperCase().replace(/\s+/g, '');

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const parseSeasonalOfferCode = (
  value: string,
  config: SeasonalOfferConfig = seasonalOfferConfig
): ParsedSeasonalOfferCode | undefined => {
  const normalized = normalizeOfferCode(value);
  if (!normalized) return undefined;

  const pattern = new RegExp(`^${escapeRegex(config.prefix.toUpperCase())}(\\d+)$`, 'i');
  const match = normalized.match(pattern);
  if (!match) return undefined;

  const segment = match[1];
  if (typeof segment !== 'string') {
    return undefined;
  }

  const amount = Number.parseInt(segment, 10);
  if (!Number.isFinite(amount) || amount < config.minDiscount || amount > config.maxDiscount) {
    return undefined;
  }

  return {
    code: normalized,
    discount: amount
  };
};
