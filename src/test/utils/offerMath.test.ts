import { describe, expect, it } from 'vitest';
import { applyDiscount } from '../../utils/offerMath';

describe('applyDiscount', () => {
  it('reduces fixed pricing by the discount amount', () => {
    const result = applyDiscount({ kind: 'fixed', amount: 220 }, 50);
    expect(result.adjusted.kind).toBe('fixed');
    expect(result.adjusted).toEqual({ kind: 'fixed', amount: 170 });
  });

  it('clamps fixed pricing at zero when discount exceeds price', () => {
    const result = applyDiscount({ kind: 'fixed', amount: 40 }, 50);
    expect(result.adjusted).toEqual({ kind: 'fixed', amount: 0 });
  });

  it('reduces range pricing across min and max values', () => {
    const result = applyDiscount({ kind: 'range', min: 220, max: 330 }, 50);
    expect(result.adjusted).toEqual({ kind: 'range', min: 170, max: 280 });
  });

  it('clamps range pricing to zero when discount exceeds the minimum', () => {
    const result = applyDiscount({ kind: 'range', min: 40, max: 90 }, 75);
    expect(result.adjusted).toEqual({ kind: 'range', min: 0, max: 15 });
  });

  it('treats negative discount values as zero', () => {
    const result = applyDiscount({ kind: 'fixed', amount: 100 }, -30);
    expect(result.adjusted).toEqual({ kind: 'fixed', amount: 100 });
  });
});
