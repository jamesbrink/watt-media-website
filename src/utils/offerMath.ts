import type { PriceValue } from '../data/pricing';

export interface DiscountOutcome {
  adjusted: PriceValue;
}

export function applyDiscount(price: PriceValue, discount: number): DiscountOutcome {
  const safeDiscount = Number.isFinite(discount) && discount > 0 ? discount : 0;

  if (price.kind === 'fixed') {
    const adjustedAmount = Math.max(0, price.amount - safeDiscount);
    return {
      adjusted: { kind: 'fixed', amount: adjustedAmount }
    };
  }

  const adjustedMin = Math.max(0, price.min - safeDiscount);
  const adjustedMax = Math.max(0, price.max - safeDiscount);

  return {
    adjusted: {
      kind: 'range',
      min: adjustedMin,
      max: adjustedMax
    }
  };
}
