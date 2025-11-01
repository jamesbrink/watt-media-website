import { describe, expect, it } from 'vitest';
import { parseSeasonalOfferCode, seasonalOfferConfig } from '../../data/offers';

describe('parseSeasonalOfferCode', () => {
  it('extracts the numeric discount from a matching code', () => {
    const parsed = parseSeasonalOfferCode('SEASONSGREETINGS40');
    expect(parsed).toEqual({ code: 'SEASONSGREETINGS40', discount: 40 });
  });

  it('normalises whitespace and casing', () => {
    const parsed = parseSeasonalOfferCode('seasonsgreetings15 ');
    expect(parsed).toEqual({ code: 'SEASONSGREETINGS15', discount: 15 });
  });

  it('rejects codes with non-numeric suffix', () => {
    const parsed = parseSeasonalOfferCode('SEASONSGREETINGSXX');
    expect(parsed).toBeUndefined();
  });

  it('enforces configured bounds', () => {
    const parsed = parseSeasonalOfferCode(
      `${seasonalOfferConfig.prefix}${seasonalOfferConfig.maxDiscount + 1}`
    );
    expect(parsed).toBeUndefined();
  });
});
