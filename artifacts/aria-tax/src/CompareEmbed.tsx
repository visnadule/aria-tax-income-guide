export default function CompareEmbed() {
  const employed = {
    gross: 100_000,
    preTaxBenefits: 5_000,
    socialSecurityYourHalf: 6_200,
    medicareYourHalf: 1_450,
    federalIncomeTax: 15_000,
    stateIncomeTax: 4_000,
    get takeHome() {
      return (
        this.gross -
        this.preTaxBenefits -
        this.socialSecurityYourHalf -
        this.medicareYourHalf -
        this.federalIncomeTax -
        this.stateIncomeTax
      );
    },
  };

  const contracted = {
    gross: 100_000,
    businessExpenses: 5_000,
    get netProfit() { return this.gross - this.businessExpenses; },
    get seTaxAmount() { return Math.round(this.netProfit * 0.9235 * 0.153); },
    federalIncomeTax: 12_500,
    stateIncomeTax: 3_500,
    get takeHome() {
      return (
        this.gross -
        this.businessExpenses -
        this.seTaxAmount -
        this.federalIncomeTax -
        this.stateIncomeTax
      );
    },
  };

  const soloOwner = {
    gross: 100_000,
    businessExpenses: 25_000,
    get netProfit() { return this.gross - this.businessExpenses; },
    get seTaxAmount() { return Math.round(this.netProfit * 0.9235 * 0.153); },
    federalIncomeTax: 9_500,
    stateIncomeTax: 2_600,
    get takeHome() {
      return (
        this.gross -
        this.businessExpenses -
        this.seTaxAmount -
        this.federalIncomeTax -
        this.stateIncomeTax
      );
    },
  };

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-cream-100 font-sans py-10 px-4">
      <div className="max-w-[860px] mx-auto">

        {/* Header */}
        <div className="text-center mb-9">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-steel-400 mb-2">
            Aria Tax Services PA — Educational Guide
          </p>
          <h1 className="font-serif text-[26px] font-bold text-ink-900 leading-snug mb-2">
            Same income. Three ways to earn it.
          </h1>
          <p className="text-[15px] text-ink-500 leading-relaxed max-w-[560px] mx-auto">
            The same $100,000 income is taxed very differently depending on how you
            earn it. Structure changes what you can deduct, which changes what gets
            taxed, which changes what reaches you.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

          {/* ── Employed (steel) ───────────────────────────── */}
          <div className="bg-steel-50 border border-steel-200 rounded-xl p-5 flex flex-col">
            <span className="inline-flex w-fit text-[10px] font-semibold tracking-[0.08em] uppercase bg-steel-100 text-steel-700 rounded-full px-3 py-0.5 mb-2">
              Employed at a firm
            </span>
            <h2 className="font-serif text-[15px] font-bold text-ink-900 leading-snug mb-1">
              W-2 Employee
            </h2>
            <p className="text-[22px] font-semibold text-ink-800 tracking-tight mb-4">
              {fmt(employed.gross)}
            </p>

            <div className="space-y-1 mb-3">
              <Row label="Gross salary" amount={employed.gross} bold />
              <Row label="Pre-tax benefits" sub="401k, health insurance" amount={-employed.preTaxBenefits} />
              <Row label="SS tax (employee half)" amount={-employed.socialSecurityYourHalf} />
              <Row label="Medicare (employee half)" amount={-employed.medicareYourHalf} />
              <Row label="Federal income tax" sub="illustrative" amount={-employed.federalIncomeTax} />
              <Row label="State income tax" sub="illustrative" amount={-employed.stateIncomeTax} />
            </div>

            <TakeHome amount={employed.takeHome} />

            <ul className="mt-4 pt-3 border-t border-steel-200 space-y-1">
              <Note>Employer pays the other half of FICA (7.65%)</Note>
              <Note>Benefits and workspace provided by employer</Note>
              <Note>Taxes withheld automatically — no quarterly payments</Note>
              <Note>No Schedule C, no SE tax</Note>
            </ul>
          </div>

          {/* ── Contracted (sage) ──────────────────────────── */}
          <div className="bg-sage-50 border border-sage-200 rounded-xl p-5 flex flex-col">
            <span className="inline-flex w-fit text-[10px] font-semibold tracking-[0.08em] uppercase bg-sage-100 text-sage-700 rounded-full px-3 py-0.5 mb-2">
              Contracted expert
            </span>
            <h2 className="font-serif text-[15px] font-bold text-ink-900 leading-snug mb-1">
              1099 / Freelance
            </h2>
            <p className="text-[22px] font-semibold text-ink-800 tracking-tight mb-4">
              {fmt(contracted.gross)}
            </p>

            <div className="space-y-1 mb-3">
              <Row label="Gross receipts" amount={contracted.gross} bold />
              <Row label="Business expenses" sub="laptop, software, supplies" amount={-contracted.businessExpenses} />
              <Row label="Net profit" amount={contracted.netProfit} bold />
              <Row label="SE tax (15.3%)" sub="both halves of FICA" amount={-contracted.seTaxAmount} />
              <Row label="Federal income tax" sub="illustrative" amount={-contracted.federalIncomeTax} />
              <Row label="State income tax" sub="illustrative" amount={-contracted.stateIncomeTax} />
            </div>

            <TakeHome amount={contracted.takeHome} />

            <ul className="mt-4 pt-3 border-t border-sage-200 space-y-1">
              <Note>You pay both halves of SE tax — no employer split</Note>
              <Note>No employer-provided benefits</Note>
              <Note>Nothing withheld — quarterly payments required</Note>
              <Note>Income flows through Schedule C → Schedule SE</Note>
            </ul>
          </div>

          {/* ── Solo practice (sand) ───────────────────────── */}
          <div className="bg-sand-50 border border-sand-200 rounded-xl p-5 flex flex-col">
            <span className="inline-flex w-fit text-[10px] font-semibold tracking-[0.08em] uppercase bg-sand-100 text-sand-800 rounded-full px-3 py-0.5 mb-2">
              Solo practice
            </span>
            <h2 className="font-serif text-[15px] font-bold text-ink-900 leading-snug mb-1">
              Small Business
            </h2>
            <p className="text-[22px] font-semibold text-ink-800 tracking-tight mb-4">
              {fmt(soloOwner.gross)}
            </p>

            <div className="space-y-1 mb-3">
              <Row label="Gross revenue" amount={soloOwner.gross} bold />
              <Row label="Business expenses" sub="office, software, insurance, marketing" amount={-soloOwner.businessExpenses} />
              <Row label="Net profit" amount={soloOwner.netProfit} bold />
              <Row label="SE tax (15.3%)" sub="applied to net profit" amount={-soloOwner.seTaxAmount} />
              <Row label="Federal income tax" sub="illustrative" amount={-soloOwner.federalIncomeTax} />
              <Row label="State income tax" sub="illustrative" amount={-soloOwner.stateIncomeTax} />
            </div>

            <TakeHome amount={soloOwner.takeHome} />

            <ul className="mt-4 pt-3 border-t border-sand-200 space-y-1">
              <Note>Real overhead is deductible — lowers the taxable base</Note>
              <Note>Higher expenses = lower net profit = lower SE tax</Note>
              <Note>SE tax applies to net profit, not gross revenue</Note>
              <Note>Quarterly payments required</Note>
            </ul>
          </div>

        </div>{/* /columns */}

        {/* Tagline */}
        <p className="text-center font-serif text-[17px] font-light text-ink-600 tracking-[0.01em] mb-7">
          <strong className="font-bold text-ink-800">Same income.</strong>{' '}
          Different structure.{' '}
          <strong className="font-bold text-ink-800">Different outcome.</strong>
        </p>

        {/* CTA */}
        <div className="text-center mb-6">
          <a
            href="https://learn.ariataxpa.com"
            className="inline-block bg-sage-600 hover:bg-sage-700 text-white font-semibold text-[15px] px-7 py-3.5 rounded-lg tracking-[0.01em] transition-colors"
          >
            Explore the full interactive comparison →
          </a>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-ink-400 leading-relaxed">
          All figures are illustrative. See full tool for assumptions. &nbsp;·&nbsp;
          This is an educational guide, not tax advice. &nbsp;·&nbsp;
          <a href="https://ariataxpa.com" className="text-steel-400 hover:underline">
            ariataxpa.com
          </a>
        </p>

      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

function Row({
  label,
  sub,
  amount,
  bold,
}: {
  label: string;
  sub?: string;
  amount: number;
  bold?: boolean;
}) {
  const isNeg = amount < 0;
  const display = isNeg
    ? `−${Math.abs(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}`
    : amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="flex justify-between items-baseline gap-2 py-0.5">
      <span className={`text-[12px] leading-snug flex-1 ${bold ? 'font-semibold text-ink-800 text-[13px]' : 'text-ink-600'}`}>
        {label}
        {sub && <span className="block text-[10px] text-ink-400 mt-0.5">{sub}</span>}
      </span>
      <span className={`text-[12px] font-medium whitespace-nowrap ${bold ? 'font-semibold text-ink-800 text-[13px]' : isNeg ? 'text-ink-500' : 'text-ink-800'}`}>
        {display}
      </span>
    </div>
  );
}

function TakeHome({ amount }: { amount: number }) {
  const display = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return (
    <div className="mt-auto bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-3 text-center">
      <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-emerald-700 mb-0.5">
        Estimated take-home
      </p>
      <p className="text-[22px] font-bold text-emerald-900 tracking-tight">{display}</p>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-1.5 text-[11px] text-ink-400 leading-relaxed">
      <span className="text-ink-300 mt-px">·</span>
      <span>{children}</span>
    </li>
  );
}
