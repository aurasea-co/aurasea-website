// One switch for every price on this site. Same variable name across all five
// deployments, default OFF. Nothing is deleted; flipping
// NEXT_PUBLIC_SHOW_PRICING to 'true' restores everything.
export function showPricing(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_PRICING === 'true'
}
