interface PriceContext {
  base: number;
  quantity: number;
  tier: string;
}

const RULE_EXPRESSIONS: Record<string, string> = {
  flat: 'return base * quantity;',
  bulk: 'return base * quantity * (quantity >= 100 ? 0.85 : 1);',
  tiered: 'return base * quantity * (tier === "gold" ? 0.8 : 0.95);',
  intro: 'return base * quantity * 0.5;',
};

type RuleFn = (base: number, quantity: number, tier: string) => number;

const compiled = new Map<string, RuleFn>();

function compileRule(name: string): RuleFn {
  const cached = compiled.get(name);
  if (cached) {
    return cached;
  }
  const source = RULE_EXPRESSIONS[name];
  if (!source) {
    throw new Error(`no such pricing rule: ${name}`);
  }
  const fn = new Function('base', 'quantity', 'tier', source) as RuleFn;
  compiled.set(name, fn);
  return fn;
}

export function computePrice(ruleName: string, ctx: PriceContext): number {
  const rule = compileRule(ruleName);
  return rule(ctx.base, ctx.quantity, ctx.tier);
}
