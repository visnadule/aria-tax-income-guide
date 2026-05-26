import { useState, useEffect } from 'react';
import FormBox from './components/FormBox';
import {
  Briefcase,
  PenTool,
  Layers,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  FileText,
  Building,
  CreditCard,
  Percent,
  Calculator,
  HelpCircle,
  X,
  User,
  Wallet,
  Receipt,
  Clock,
} from 'lucide-react';

type ViewState =
  | 'entry'
  | 'w2'
  | 'freelance'
  | 'mixed'
  | 'investment'
  | 'form1099Tree'
  | 'scheduleC'
  | 'comparison';

function App() {
  const [view, setView] = useState<ViewState>('entry');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const navigate = (newView: ViewState) => {
    if (reducedMotion) {
      setView(newView);
    } else {
      setTimeout(() => setView(newView), 150);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-50 texture-paper">
      <header className="sticky top-0 bg-cream-50/95 backdrop-blur-sm border-b border-ink-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('entry')}
            className="focus-ring rounded-lg p-2 -ml-2 group flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif text-sm font-bold">A</span>
            </div>
            <span className="text-ink-700 font-serif text-lg hidden sm:block">Aria Tax Services</span>
          </button>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate('form1099Tree')}
              className="focus-ring rounded-lg text-sm text-ink-500 hover:text-ink-700 px-3 py-2 transition-colors"
            >
              1099 Family
            </button>
            <button
              onClick={() => navigate('scheduleC')}
              className="focus-ring rounded-lg text-sm text-ink-500 hover:text-ink-700 px-3 py-2 transition-colors"
            >
              Schedule C
            </button>
            <button
              onClick={() => navigate('comparison')}
              className="focus-ring rounded-lg text-sm text-ink-500 hover:text-ink-700 px-3 py-2 transition-colors"
            >
              Compare
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {view === 'entry' && <EntryScreen onNavigate={navigate} />}
        {view === 'w2' && <W2Roadmap onNavigate={navigate} />}
        {view === 'freelance' && <FreelanceRoadmap onNavigate={navigate} />}
        {view === 'mixed' && <MixedRoadmap onNavigate={navigate} />}
        {view === 'investment' && <InvestmentRoadmap onNavigate={navigate} />}
        {view === 'form1099Tree' && <Form1099Tree onNavigate={navigate} />}
        {view === 'scheduleC' && <ScheduleCView onNavigate={navigate} />}
        {view === 'comparison' && <ComparisonView onNavigate={navigate} />}
      </main>

      <footer className="border-t border-ink-100 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-center text-sm text-ink-400 max-w-xl mx-auto">
            This is an educational guide, not tax advice.
            No data is collected. Nothing is filed.
          </p>
          <p className="text-center text-xs text-ink-300 mt-4">
            Created by Aria Tax Services PA
          </p>
        </div>
      </footer>
    </div>
  );
}

function EntryScreen({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink-900 mb-6">
          What kind of earner are you?
        </h1>
        <p className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed">
          Income doesn't fit into two neat boxes.
          Find where you fit, and see how the tax system actually sees you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        <IncomeCard
          icon={<Briefcase className="w-8 h-8" />}
          title="I'm a W-2 employee"
          description="I get a paycheck with taxes already taken out."
          onClick={() => onNavigate('w2')}
        />
        <IncomeCard
          icon={<PenTool className="w-8 h-8" />}
          title="I do freelance or contract work"
          description="I'm paid directly by clients, customers, or platforms."
          onClick={() => onNavigate('freelance')}
        />
        <IncomeCard
          icon={<Layers className="w-8 h-8" />}
          title="I have a job AND side income"
          description="I'm an employee, but I also earn on the side."
          onClick={() => onNavigate('mixed')}
        />
        <IncomeCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="I have investment, interest, or retirement income"
          description="Money comes from accounts, not from work."
          onClick={() => onNavigate('investment')}
        />
      </div>
    </div>
  );
}

function IncomeCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="income-card focus-ring rounded-2xl bg-white border border-ink-100 p-8 text-left group hover:border-steel-300"
    >
      <div className="w-14 h-14 rounded-xl bg-steel-50 text-steel-600 flex items-center justify-center mb-6 group-hover:bg-steel-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-ink-800 mb-3 group-hover:text-ink-900 transition-colors">
        {title}
      </h3>
      <p className="text-ink-500 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center text-steel-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Explore this path
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="focus-ring rounded-lg inline-flex items-center text-ink-500 hover:text-ink-700 mb-8 transition-colors group"
    >
      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      Back to start
    </button>
  );
}

function W2Roadmap({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-steel-600 mb-4 bg-steel-50 px-4 py-2 rounded-full">
          <Briefcase className="w-4 h-4" />
          W-2 Employee
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          Your income follows a linear path
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed mb-4">
          As an employee, your income is reported through your employer's payroll system.
          Taxes are withheld before you ever see the money.
        </p>
        <p className="text-base text-ink-500 leading-relaxed italic">
          Most of your tax is handled before you file. Your employer withholds, deposits with the IRS,
          and reports the totals on your W-2. Filing reconciles the math.
        </p>
      </div>

      {/* Common Confusion Sidebar */}
      <div className="mb-12 bg-gradient-to-br from-sand-50 to-cream-50 rounded-xl border border-sand-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sand-200 text-sand-700 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-ink-800 mb-2">Understanding refunds</h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              A refund doesn't mean you didn't pay tax. It means you <span className="font-medium text-sand-700">overpaid</span> through
              the year and the IRS is returning the difference.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          {/* Employer */}
          <FlowNode
            icon={<Building className="w-6 h-6" />}
            title="Employer"
            description="Your company or organization"
            color="steel"
          />

          <FlowConnector />

          {/* Paycheck */}
          <FlowNode
            icon={<Wallet className="w-6 h-6" />}
            title="You receive a paycheck"
            description="Direct deposit or paper check"
            color="sage"
            detail="Payroll system processes your pay and withholds taxes automatically."
          >
            <div className="mt-4 p-4 bg-sage-50 rounded-lg border border-sage-200">
              <div className="text-sm text-ink-500 mb-3">Your pay stub shows:</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-500">Gross pay</span>
                  <span className="font-mono text-ink-700">Your full wages</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="text-ink-500">Pre-tax deductions</span>
                  <span className="font-mono">401k, health insurance</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="text-ink-500">Tax withholdings</span>
                  <span className="font-mono">Federal, state, FICA</span>
                </div>
                <div className="border-t border-sage-200 pt-2 mt-2 flex justify-between">
                  <span className="font-medium text-ink-700">Net pay</span>
                  <span className="font-mono font-medium text-sage-700">What hits your account</span>
                </div>
              </div>
            </div>
          </FlowNode>

          <FlowConnector />

          {/* W-2 Form */}
          <FlowNode
            icon={<FileText className="w-6 h-6" />}
            title="Form W-2"
            description="Arrives by January 31 of the following year"
            color="sand"
          >
            <FormW2Anatomy />
          </FlowNode>

          <FlowConnector />

          {/* Form 1040 */}
          <FlowNode
            icon={<ArrowDown className="w-6 h-6" />}
            title="Form 1040, Line 1"
            description="Wages, salaries, tips"
            color="steel"
          >
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-steel-50 rounded-lg text-sm text-steel-700 border border-steel-200">
                <X className="w-4 h-4" /> No Schedule C
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-steel-50 rounded-lg text-sm text-steel-700 border border-steel-200">
                <X className="w-4 h-4" /> No Schedule SE
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-steel-50 rounded-lg text-sm text-steel-700 border border-steel-200">
                <X className="w-4 h-4" /> No estimated payments
              </span>
            </div>
          </FlowNode>

          <FlowConnector />

          {/* Reconciliation */}
          <div className="p-8 border-t border-ink-100 bg-gradient-to-br from-steel-50 to-sage-50">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-steel-200 text-steel-600 mb-4">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-ink-800 mb-2">Reconciliation happens</h3>
              <p className="text-sm text-ink-500">The IRS compares what was withheld against what you owe</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-sage-200 text-center">
                <div className="text-sage-600 font-medium mb-1">Refund</div>
                <div className="text-sm text-ink-500">Withholding exceeded liability</div>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-sand-200 text-center">
                <div className="text-sand-700 font-medium mb-1">Balance due</div>
                <div className="text-sm text-ink-500">Underpaid during the year</div>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-steel-200 text-center">
                <div className="text-steel-600 font-medium mb-1">Even</div>
                <div className="text-sm text-ink-500">Withholding matched obligation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens After a Raise */}
      <RaiseVisualizer />

      {/* When This Gets More Complicated */}
      <div className="mb-12 bg-gradient-to-br from-sage-50 to-cream-50 rounded-xl border-2 border-sage-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sage-200 text-sage-700 flex items-center justify-center flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-ink-800 mb-2">When this gets more complicated</h3>
            <p className="text-sm text-ink-600 leading-relaxed mb-3">
              If you also have side income, your W-2 withholding usually isn't enough to cover
              the tax on that side income.
            </p>
            <button
              onClick={() => onNavigate('mixed')}
              className="text-link text-sm font-medium"
            >
              See mixed income path
            </button>
          </div>
        </div>
      </div>

      <InsightBox
        title="What makes W-2 different"
        content="Your employer acts as a tax collector. They calculate, withhold, and remit taxes on your behalf. You don't make estimated payments. Self-employment tax doesn't apply. Your responsibility begins when you file."
      />

      <div className="mt-12 p-6 bg-sand-50 rounded-2xl border border-sand-200">
        <p className="text-ink-600 mb-4">
          Curious how this compares to other income types?
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('freelance')}
            className="text-link px-4 py-2 rounded-lg focus-ring"
          >
            See freelance income path
          </button>
          <button
            onClick={() => onNavigate('comparison')}
            className="text-link px-4 py-2 rounded-lg focus-ring"
          >
            Compare income types
          </button>
        </div>
      </div>
    </div>
  );
}

function FreelanceRoadmap({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-sage-600 mb-4 bg-sage-50 px-4 py-2 rounded-full">
          <PenTool className="w-4 h-4" />
          Freelance / Contract
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          You're part of the tax system now
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          When you're paid directly by clients without an employer intermediary,
          the tax responsibilities shift entirely to you.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          {/* Payment Source */}
          <FlowNode
            icon={<User className="w-6 h-6" />}
            title="Client / Customer / Platform"
            description="A person or business pays you for your work"
            color="steel"
          />

          <FlowConnector />

          {/* Payment Receipt */}
          <div className="p-8 bg-gradient-to-b from-sage-50 to-white border-t border-ink-100">
            <div className="flex items-start gap-5">
              <div className={`w-14 h-14 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center flex-shrink-0`}>
                <Wallet className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif text-ink-800 mb-1">You're paid directly</h3>
                <p className="text-ink-500 mb-3">Deposit, transfer, check, cash, or app payout</p>
                <p className="text-sm text-sage-600 italic">No withholding. Gross payment arrives in your account.</p>
              </div>
            </div>
          </div>

          {/* Key Insight Before Flow */}
          <div className="p-6 bg-ink-50 border-t border-ink-100">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-sm text-ink-600 leading-relaxed">
                When you're paid directly, nothing is withheld. The income arrives gross.
                The responsibility for tax—and the timing of paying it—moves to you.
              </p>
            </div>
          </div>

          <FlowConnector />

          {/* 1099 Forms */}
          <FlowNode
            icon={<FileText className="w-6 h-6" />}
            title="Form you may receive"
            description="By January 31 of the following year"
            color="sand"
          >
            <div className="mt-4 space-y-3">
              <div className="mb-4">
                <div className="text-sm font-medium text-ink-700 mb-2">1099-NEC (Most common)</div>
                <p className="text-xs text-ink-500 mb-3">Client paid you $600+ for services</p>
                <Form1099NECAnatomy />
              </div>
              <div className="mb-4">
                <div className="text-sm font-medium text-ink-700 mb-2">1099-K (Platforms)</div>
                <p className="text-xs text-ink-500 mb-3">Payment processors, gig apps, marketplaces</p>
                <Form1099KAnatomy />
              </div>
              <div className="flex items-start gap-3 p-3 bg-ink-50 rounded-lg border border-ink-200">
                <span className="font-mono text-sm font-medium text-ink-500">Nothing</span>
                <div className="text-sm text-ink-600">
                  <span className="font-medium">Still report it.</span> Income is taxable whether you receive a form or not.
                </div>
              </div>
            </div>
          </FlowNode>

          <FlowConnector />

          {/* Schedule C */}
          <FlowNode
            icon={<Receipt className="w-6 h-6" />}
            title="Schedule C"
            description="Profit or Loss From Business (Sole Proprietorship)"
            color="sage"
          >
            <ScheduleCAnatomy />
          </FlowNode>

          <FlowConnector />

          {/* Flow to 1040 */}
          <FlowNode
            icon={<ArrowDown className="w-6 h-6" />}
            title="Schedule 1 → Form 1040"
            description="Net profit adds to your total income"
            color="steel"
          />

          <FlowConnector />

          {/* Two Taxes */}
          <div className="p-8 border-t border-ink-100 bg-gradient-to-br from-sage-50 to-sand-50">
            <div className="text-center mb-6">
              <h3 className="text-lg font-serif text-ink-800 mb-2">Two taxes apply to net profit</h3>
              <p className="text-sm text-ink-500">This is the key difference from W-2 income</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-sage-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-600 flex items-center justify-center">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-ink-800">Income tax</div>
                    <div className="text-sm text-ink-500">Federal + state</div>
                  </div>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Same tax that applies to W-2 wages. Rate depends on your bracket and filing status.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-sand-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sand-100 text-sand-700 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-ink-800">Self-employment tax</div>
                    <div className="text-sm text-sand-600 font-medium">15.3%</div>
                  </div>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed mb-3">
                  Both halves of Social Security (12.4%) and Medicare (2.9%). W-2 employees split this with their employer.
                </p>
                <FormScheduleSEAnatomy />
              </div>
            </div>
          </div>

          <FlowConnector />

          {/* Quarterly Payments */}
          <FlowNode
            icon={<Clock className="w-6 h-6" />}
            title="No one withheld anything"
            description="You may owe quarterly estimated payments"
            color="sand"
            highlight
          >
            <div className="mt-4 p-4 bg-sand-50 rounded-lg border border-sand-200">
              <div className="text-center mb-3">
                <span className="text-sm font-medium text-sand-700">Quarterly deadlines</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div className="p-2 bg-white rounded border border-ink-100">
                  <div className="text-ink-400">Q1</div>
                  <div className="font-medium text-ink-700">Apr 15</div>
                </div>
                <div className="p-2 bg-white rounded border border-ink-100">
                  <div className="text-ink-400">Q2</div>
                  <div className="font-medium text-ink-700">Jun 15</div>
                </div>
                <div className="p-2 bg-white rounded border border-ink-100">
                  <div className="text-ink-400">Q3</div>
                  <div className="font-medium text-ink-700">Sep 15</div>
                </div>
                <div className="p-2 bg-white rounded border border-ink-100">
                  <div className="text-ink-400">Q4</div>
                  <div className="font-medium text-ink-700">Jan 15</div>
                </div>
              </div>
            </div>
          </FlowNode>
        </div>
      </div>

      {/* Common Confusions */}
      <div className="mb-12">
        <h2 className="text-xl font-serif text-ink-800 mb-6">Common questions</h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-ink-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-sand-100 text-sand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-ink-800 mb-2">
                  "If I didn't receive a 1099, do I have to report the income?"
                </h3>
                <p className="text-ink-600 mb-3">
                  <span className="font-medium text-sage-700">Yes.</span> The 1099 is a copy sent to you and the IRS.
                  It's not what creates the obligation to report.
                </p>
                <p className="text-sm text-ink-500">
                  You're required to report all income regardless of whether you received a form.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-ink-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-sand-100 text-sand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-ink-800 mb-2">
                  "Is 1099 income the same as Schedule C income?"
                </h3>
                <p className="text-ink-600 mb-3">
                  <span className="font-medium text-sage-700">Not always.</span> 1099-NEC and most 1099-K income
                  land on Schedule C. Other 1099 forms don't.
                </p>
                <button
                  onClick={() => onNavigate('form1099Tree')}
                  className="text-link text-sm"
                >
                  See the complete 1099 family tree
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Bridge Callout */}
      <div className="bg-gradient-to-br from-sage-50 to-cream-50 rounded-2xl border-2 border-sage-200 p-8 mb-12">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-sage-200 text-sage-700 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-serif text-ink-800 mb-3">The quiet bridge</h3>
            <p className="text-ink-600 leading-relaxed mb-4">
              Many people don't realize when "a little side work" has quietly become
              "a small business." Schedule C is where that line becomes visible.
            </p>
            <button
              onClick={() => onNavigate('scheduleC')}
              className="text-link text-sm"
            >
              Learn more about Schedule C
            </button>
          </div>
        </div>
      </div>

      <InsightBox
        title="The key shift"
        content="You became your own payroll department. No employer to withhold for you. The responsibility—and the timing—changed. You may need to pay estimated taxes quarterly to avoid penalties."
      />

      <div className="mt-12 p-6 bg-steel-50 rounded-2xl border border-steel-200">
        <p className="text-ink-600 mb-4">
          Want to understand the different 1099 forms?
        </p>
        <button
          onClick={() => onNavigate('form1099Tree')}
          className="text-link px-4 py-2 rounded-lg focus-ring"
        >
          Explore the 1099 family
        </button>
      </div>
    </div>
  );
}

function FlowNode({
  icon,
  title,
  description,
  color,
  detail,
  highlight,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'steel' | 'sage' | 'sand';
  detail?: string;
  highlight?: boolean;
  children?: React.ReactNode;
}) {
  const colors = {
    steel: {
      bg: 'bg-steel-50',
      border: 'border-steel-200',
      iconBg: 'bg-steel-100',
      iconText: 'text-steel-600',
    },
    sage: {
      bg: 'bg-sage-50',
      border: 'border-sage-200',
      iconBg: 'bg-sage-100',
      iconText: 'text-sage-600',
    },
    sand: {
      bg: 'bg-sand-50',
      border: 'border-sand-200',
      iconBg: 'bg-sand-100',
      iconText: 'text-sand-700',
    },
  };

  const c = colors[color];

  return (
    <div className={`p-8 ${highlight ? 'bg-gradient-to-br from-sand-50 to-sand-100' : c.bg} ${highlight ? 'border-sand-300' : c.border} border-b`}>
      <div className="flex items-start gap-5">
        <div className={`w-14 h-14 rounded-xl ${c.iconBg} ${c.iconText} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-serif text-ink-800 mb-1">{title}</h3>
          <p className="text-ink-500">{description}</p>
          {detail && <p className="text-sm text-ink-400 mt-2 italic">{detail}</p>}
        </div>
      </div>
      {children && <div className="mt-6 ml-19">{children}</div>}
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flex justify-center py-4 bg-white">
      <div className="flex flex-col items-center">
        <div className="w-px h-6 bg-gradient-to-b from-ink-200 to-ink-100" />
        <ArrowDown className="w-5 h-5 text-ink-300" />
        <div className="w-px h-6 bg-gradient-to-b from-ink-100 to-ink-200" />
      </div>
    </div>
  );
}

function MixedRoadmap({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-sand-700 mb-4 bg-sand-100 px-4 py-2 rounded-full">
          <Layers className="w-4 h-4" />
          Mixed Income
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          Two systems, one return
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          This is increasingly common. You have a job with a W-2 and also earn money independently.
          Your tax return reflects both—and the side income can change your outcome.
        </p>
      </div>

      {/* Dual-Track Flow Diagram */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          {/* Two Starting Points */}
          <div className="grid md:grid-cols-2 divide-x divide-ink-100">
            {/* W-2 Side */}
            <div className="p-6 bg-steel-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-steel-100 text-steel-600 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-steel-500 uppercase tracking-wide">W-2 Side</div>
                  <div className="font-medium text-ink-800">Employer</div>
                </div>
              </div>
            </div>

            {/* Side Income Side */}
            <div className="p-6 bg-sage-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-sage-600 uppercase tracking-wide">Side Income Side</div>
                  <div className="font-medium text-ink-800">Clients, Platforms</div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Connectors */}
          <div className="grid md:grid-cols-2 divide-x divide-ink-100 bg-white">
            <div className="flex justify-center py-3">
              <ArrowDown className="w-5 h-5 text-steel-400" />
            </div>
            <div className="flex justify-center py-3">
              <ArrowDown className="w-5 h-5 text-sage-400" />
            </div>
          </div>

          {/* Payment Type */}
          <div className="grid md:grid-cols-2 divide-x divide-ink-100">
            <div className="p-6 bg-steel-50/50">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-steel-500" />
                <div>
                  <div className="font-medium text-ink-800">Paycheck</div>
                  <div className="text-sm text-ink-500">With taxes already withheld</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-sage-50/50">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-sage-500" />
                <div>
                  <div className="font-medium text-ink-800">Direct payment</div>
                  <div className="text-sm text-ink-500">Gross amount, no withholding</div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Connectors */}
          <div className="grid md:grid-cols-2 divide-x divide-ink-100 bg-white">
            <div className="flex justify-center py-3">
              <ArrowDown className="w-5 h-5 text-steel-400" />
            </div>
            <div className="flex justify-center py-3">
              <ArrowDown className="w-5 h-5 text-sage-400" />
            </div>
          </div>

          {/* Forms */}
          <div className="grid md:grid-cols-2 divide-x divide-ink-100">
            <div className="p-6 bg-steel-50/50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-steel-500" />
                <div>
                  <div className="font-mono font-medium text-steel-700">W-2</div>
                  <div className="text-sm text-ink-500">Arrives by January 31</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-sage-50/50">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-sage-500 mt-0.5" />
                <div>
                  <div className="font-medium text-ink-800 mb-2">1099-NEC / 1099-K / or nothing</div>
                  <div className="space-y-1.5">
                    <div className="inline-block text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded">
                      1099-NEC (most common)
                    </div>
                    <div className="inline-block text-xs bg-sand-100 text-sand-700 px-2 py-0.5 rounded ml-2">
                      1099-K (platforms)
                    </div>
                    <div className="inline-block text-xs bg-ink-100 text-ink-500 px-2 py-0.5 rounded ml-2">
                      Nothing (still report)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Connectors with Convergence hint */}
          <div className="bg-white">
            <div className="grid md:grid-cols-2 divide-x divide-ink-100">
              <div className="flex justify-center py-3">
                <ArrowDown className="w-5 h-5 text-steel-400" />
              </div>
              <div className="flex justify-center py-3">
                <ArrowDown className="w-5 h-5 text-sage-400" />
              </div>
            </div>
          </div>

          {/* Withholding Status */}
          <div className="grid md:grid-cols-2 divide-x divide-ink-100 border-t border-ink-100">
            <div className="p-6 bg-sage-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sage-200 text-sage-700 flex items-center justify-center">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-ink-800">Withholding done</div>
                  <div className="text-sm text-sage-600">Federal, state, FICA already taken</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-red-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-ink-800">Nothing withheld</div>
                  <div className="text-sm text-red-600">Full responsibility shifts to you</div>
                </div>
              </div>
            </div>
          </div>

          {/* Convergence Point */}
          <div className="p-8 bg-gradient-to-b from-white to-cream-100 border-t border-ink-100">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 mb-4">
                <ArrowDown className="w-5 h-5 text-steel-400 rotate-[-30deg]" />
                <ArrowDown className="w-5 h-5 text-sage-400 rotate-[30deg]" />
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-steel-100 to-sage-100 text-steel-700 mb-4">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-serif text-ink-800 text-center mb-2">Both land on Form 1040</h3>
              <p className="text-sm text-ink-500 text-center">W-2 wages + Schedule C net profit combined</p>
            </div>
          </div>

          {/* Side Income Extra Steps */}
          <div className="border-t border-ink-100 bg-gradient-to-b from-sage-50 to-white">
            <div className="p-8 flex flex-col items-center">
              <ArrowDown className="w-5 h-5 text-sage-400 mb-4" />
              <div className="text-center mb-6">
                <div className="text-sm text-sage-600 mb-1">Side income only:</div>
                <h3 className="text-lg font-serif text-ink-800">Flows through Schedule C first</h3>
              </div>

              <div className="w-full max-w-md space-y-3">
                <div className="bg-white rounded-xl p-4 border border-sage-200 flex items-center gap-4">
                  <Receipt className="w-5 h-5 text-sage-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink-800">Schedule C</div>
                    <div className="text-sm text-ink-500">Report income, expenses, calculate net profit</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-sage-300" />
                </div>

                <div className="bg-white rounded-xl p-4 border-2 border-sand-300 flex items-center gap-4">
                  <Calculator className="w-5 h-5 text-sand-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink-800">Self-employment tax applies</div>
                    <div className="text-sm text-sand-600 font-medium">15.3% on net profit</div>
                    <div className="text-xs text-ink-400 mt-1">In addition to income tax</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Surprise Moment */}
          <div className="border-t-2 border-sand-200 bg-gradient-to-br from-sand-50 to-sand-100 p-8">
            <div className="max-w-2xl mx-auto text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sand-200 text-sand-700 mb-4">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-ink-800 mb-3">
                Withholding from W-2 may not be enough
              </h3>
              <p className="text-ink-600 leading-relaxed">
                Your job's withholding was set for your W-2 income alone.
                Side income brings additional tax—with no withholding to cover it.
              </p>
            </div>

            <div className="max-w-xl mx-auto bg-white rounded-xl p-6 border-2 border-sand-300 shadow-sm">
              <div className="text-center mb-4">
                <div className="text-sm font-medium text-sand-700 mb-2">
                  This is why "I had a job AND a side gig"
                </div>
                <div className="text-lg font-serif text-ink-800">
                  can produce a surprise balance due
                </div>
              </div>
            </div>
          </div>

          {/* The Refund Disappeared Callout */}
          <div className="border-t border-ink-100 bg-white p-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-ink-50 to-sand-50 rounded-2xl p-6 border border-ink-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ink-100 text-ink-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-ink-800 mb-2">"My refund disappeared"</h4>
                    <p className="text-ink-600 leading-relaxed text-sm">
                      If you had a refund before you started a side gig—and now you don't—this is usually why.
                      The W-2 side hasn't changed. The side income brought its own taxes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="border-t border-ink-100 bg-gradient-to-b from-steel-50 to-white p-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-serif text-ink-800 text-center mb-6">
                Two valid approaches
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-steel-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-steel-100 text-steel-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="font-medium text-ink-800">Adjust W-4</div>
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Increase withholding from your paycheck to cover side income tax too.
                    One change, no extra forms. Set it and forget it.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-sage-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="font-medium text-ink-800">Quarterly payments</div>
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Make estimated tax payments on your side income using Form 1040-ES.
                    More bookkeeping, but keeps side and job separate.
                  </p>
                </div>
              </div>
              <p className="text-center text-sm text-ink-500 mt-6">
                Both are valid. Both prevent surprises.
              </p>
            </div>
          </div>
        </div>
      </div>

      <InsightBox
        title="You're running two tax profiles"
        content="The W-2 side is handled for you. The side-income side requires your attention. They meet on one 1040. Many people in this situation underwithhold because they don't account for self-employment tax on side income."
      />
    </div>
  );
}

function InvestmentRoadmap({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-sand-600 mb-4 bg-sand-50 px-4 py-2 rounded-full">
          <TrendingUp className="w-4 h-4" />
          Investment / Interest
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          Passive income has its own forms
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          When money comes from accounts—not from work—a different family of 1099s reports it.
          These are not self-employment. No Schedule C.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          {/* Account Source */}
          <FlowNode
            icon={<Building className="w-6 h-6" />}
            title="Account"
            description="Bank, brokerage, retirement account"
            color="sand"
          />

          <FlowConnector />

          {/* Distribution Type */}
          <FlowNode
            icon={<TrendingUp className="w-6 h-6" />}
            title="You receive..."
            description="Distribution, interest, dividend, or proceeds from a sale"
            color="sand"
          />

          <FlowConnector />

          {/* 1099 Forms */}
          <div className="p-8 bg-gradient-to-b from-sand-50 to-white border-t border-ink-100">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sand-200 text-sand-700 mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-ink-800 mb-2">Form you receive</h3>
              <p className="text-sm text-ink-500">Each type of income has its own 1099</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-sand-200">
                <div className="mb-2">
                  <span className="font-mono font-medium text-sand-700 bg-sand-100 px-2 py-0.5 rounded text-sm">1099-INT</span>
                </div>
                <div className="text-sm text-ink-600 mb-3">
                  <div className="font-medium text-ink-800 mb-1">Interest income</div>
                  <div className="text-ink-500">Bank accounts, savings, bonds</div>
                </div>
                <Form1099INTAnatomy />
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-sand-200">
                <div className="mb-2">
                  <span className="font-mono font-medium text-sand-700 bg-sand-100 px-2 py-0.5 rounded text-sm">1099-DIV</span>
                </div>
                <div className="text-sm text-ink-600 mb-3">
                  <div className="font-medium text-ink-800 mb-1">Dividends</div>
                  <div className="text-ink-500">Stocks, mutual funds</div>
                </div>
                <Form1099DIVAnatomy />
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-sand-200">
                <div className="mb-2">
                  <span className="font-mono font-medium text-sand-700 bg-sand-100 px-2 py-0.5 rounded text-sm">1099-B</span>
                </div>
                <div className="text-sm text-ink-600 mb-3">
                  <div className="font-medium text-ink-800 mb-1">Sale proceeds</div>
                  <div className="text-ink-500">Stocks, bonds, crypto sales</div>
                </div>
                <Form1099BAnatomy />
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-sand-200">
                <div className="mb-2">
                  <span className="font-mono font-medium text-sand-700 bg-sand-100 px-2 py-0.5 rounded text-sm">1099-R</span>
                </div>
                <div className="text-sm text-ink-600 mb-3">
                  <div className="font-medium text-ink-800 mb-1">Retirement distributions</div>
                  <div className="text-ink-500">401(k), IRA, pension</div>
                </div>
                <Form1099RAnatomy />
              </div>
            </div>
          </div>

          <FlowConnector />

          {/* Where They Land */}
          <div className="p-8 border-t border-ink-100 bg-gradient-to-br from-steel-50 to-sage-50">
            <div className="text-center mb-6">
              <h3 className="text-xl font-serif text-ink-800 mb-2">Each lands on a different part of the return</h3>
              <p className="text-sm text-ink-500">No Schedule C for any of these</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-steel-200 text-center">
                <div className="font-mono text-sm text-steel-600 mb-2">1099-INT / 1099-DIV</div>
                <div className="text-lg font-medium text-ink-800 mb-1">Schedule B</div>
                <div className="text-xs text-ink-400 mb-3">or directly on 1040 if under threshold</div>
                <div className="bg-cream-50 rounded-lg p-2 text-xs text-ink-600">
                  Schedule B: Interest & Ordinary Dividends
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-steel-200 text-center">
                <div className="font-mono text-sm text-steel-600 mb-2">1099-B</div>
                <div className="text-lg font-medium text-ink-800 mb-1">Schedule D</div>
                <div className="text-xs text-ink-400 mb-3">capital gains & losses</div>
                <div className="bg-cream-50 rounded-lg p-2 text-xs text-ink-600">
                  Schedule D: Capital Gains & Losses
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-steel-200 text-center">
                <div className="font-mono text-sm text-steel-600 mb-2">1099-R</div>
                <div className="text-lg font-medium text-ink-800 mb-1">Form 1040</div>
                <div className="text-xs text-ink-400">lines for pensions/IRAs</div>
              </div>
            </div>
          </div>

          {/* Key Distinction Box */}
          <div className="p-8 border-t-2 border-sage-200 bg-gradient-to-br from-sage-50 to-white">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
                    <X className="w-7 h-7" />
                  </div>
                  <div className="text-sm font-medium text-ink-800">None are Schedule C</div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
                    <X className="w-7 h-7" />
                  </div>
                  <div className="text-sm font-medium text-ink-800">None trigger SE tax</div>
                </div>
              </div>
              <p className="text-center text-sm text-ink-600 leading-relaxed">
                These forms report passive income—money from accounts, not from your work.
                No self-employment tax. No quarterly payments needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <InsightBox
        title="The important distinction"
        content="These 1099s report passive income—interest, dividends, capital gains, retirement. They are NOT the same as 1099-NEC which reports self-employment income. Different forms. Different lines on your return. Different tax treatment."
      />

      <div className="mt-8 p-4 bg-steel-50 rounded-lg">
        <p className="text-sm text-ink-600">
          <HelpCircle className="w-4 h-4 inline mr-2 -mt-0.5" />
          Confused by all the 1099s? You're not alone.{' '}
          <button onClick={() => onNavigate('form1099Tree')} className="text-link">
            See the complete 1099 family tree
          </button>
        </p>
      </div>
    </div>
  );
}

function Form1099Tree({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [selectedForm, setSelectedForm] = useState<string | null>('nec');

  const formTree = [
    {
      category: 'Self-Employment',
      forms: [
        {
          id: 'nec',
          name: '1099-NEC',
          fullName: 'Nonemployee Compensation',
          scheduleC: true,
          description: 'Reports payments to contractors, freelancers, and non-employees. This is the modern form for what used to be Box 7 of 1099-MISC.',
          landingSpot: 'Schedule C → Form 1040 Line 3',
          taxNotes: 'Self-employment tax (Schedule SE) applies.',
        },
        {
          id: 'k',
          name: '1099-K',
          fullName: 'Payment Card and Third Party Network Transactions',
          scheduleC: 'Usually',
          description: 'Reports payments received through payment apps (Venmo, PayPal) and platforms. Thresholds are changing.',
          landingSpot: 'Often Schedule C. Sometimes just gross receipts.',
          taxNotes: 'May indicate self-employment income. Context matters.',
        },
      ],
    },
    {
      category: 'Other Income (Not Self-Employment)',
      forms: [
        {
          id: 'misc',
          name: '1099-MISC',
          fullName: 'Miscellaneous Income',
          scheduleC: 'Depends',
          description: 'Reports rents, royalties, prizes, awards, medical payments, and other income types. Box 7 used to be for self-employment—that moved to 1099-NEC.',
          landingSpot: 'Depends on box. Rents → Schedule E. Royalties → Schedule E.',
          taxNotes: 'Not all 1099-MISC = Schedule C. Box matters.',
        },
        {
          id: 'g',
          name: '1099-G',
          fullName: 'Certain Government Payments',
          scheduleC: false,
          description: 'Reports government payments including unemployment compensation, state and local tax refunds, and other government payments such as agricultural payments.',
          landingSpot: 'Form 1040, Schedule 1 (unemployment). State refunds on Schedule 1 if previously deducted.',
          taxNotes: 'Unemployment is fully taxable as ordinary income. State tax refunds are taxable only if you deducted state taxes in the prior year.',
        },
      ],
    },
    {
      category: 'Investment, Interest, Passive Income',
      forms: [
        {
          id: 'int',
          name: '1099-INT',
          fullName: 'Interest Income',
          scheduleC: false,
          description: 'Bank interest, savings bonds, loans you made.',
          landingSpot: 'Form 1040 Schedule B',
          taxNotes: 'Ordinary income tax. No self-employment tax.',
        },
        {
          id: 'div',
          name: '1099-DIV',
          fullName: 'Dividends and Distributions',
          scheduleC: false,
          description: 'Stock and mutual fund dividends.',
          landingSpot: 'Form 1040 Schedule B',
          taxNotes: 'Qualified dividends have lower tax rates.',
        },
        {
          id: 'b',
          name: '1099-B',
          fullName: 'Proceeds from Broker Transactions',
          scheduleC: false,
          description: 'Stock, bond, mutual fund sales. Also crypto from some platforms.',
          landingSpot: 'Form 8949 → Schedule D',
          taxNotes: 'Capital gains tax. Short-term vs long-term.',
        },
      ],
    },
    {
      category: 'Retirement',
      forms: [
        {
          id: 'r',
          name: '1099-R',
          fullName: 'Distributions from Pensions, Annuities, IRAs',
          scheduleC: false,
          description: '401(k), IRA, pension, and other retirement plan distributions.',
          landingSpot: 'Form 1040 Lines 5a/5b',
          taxNotes: 'May be taxable, partially taxable, or nontaxable.',
        },
      ],
    },
  ];

  const allForms = formTree.flatMap(cat => cat.forms);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          The 1099 Family Tree
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed max-w-3xl">
          "1099" is a family of information returns, not a single form.
          Each reports different types of income and lands on different parts of your return.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {formTree.map((category) => (
            <div key={category.category} className="mb-8">
              <h2 className="text-sm font-medium text-ink-500 uppercase tracking-wide mb-3">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.forms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => setSelectedForm(selectedForm === form.id ? null : form.id)}
                    className={`w-full text-left rounded-xl border-2 transition-all p-4 ${
                      selectedForm === form.id
                        ? 'border-sage-500 bg-sage-50'
                        : 'border-ink-100 bg-white hover:border-steel-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-medium text-lg text-ink-800">
                          {form.name}
                        </span>
                        {form.scheduleC === true && (
                          <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                            Schedule C
                          </span>
                        )}
                        {form.scheduleC === 'Usually' && (
                          <span className="text-xs bg-sand-100 text-sand-700 px-2 py-0.5 rounded-full">
                            Usually Schedule C
                          </span>
                        )}
                        {form.scheduleC === 'Depends' && (
                          <span className="text-xs bg-steel-100 text-steel-700 px-2 py-0.5 rounded-full">
                            Depends on box
                          </span>
                        )}
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-ink-400 transition-transform ${
                          selectedForm === form.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    <p className="text-sm text-ink-500 mt-1">{form.fullName}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          {selectedForm ? (
            <div className="bg-white rounded-2xl border border-ink-100 p-6 animate-fade-in">
              <h3 className="font-mono text-xs text-ink-500 mb-1">
                {allForms.find(f => f.id === selectedForm)?.name}
              </h3>
              <h2 className="text-xl font-serif text-ink-800 mb-4">
                {allForms.find(f => f.id === selectedForm)?.fullName}
              </h2>
              <p className="text-ink-600 mb-6">
                {allForms.find(f => f.id === selectedForm)?.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-ink-500 mb-1">Where it lands</h4>
                  <p className="text-ink-700">
                    {allForms.find(f => f.id === selectedForm)?.landingSpot}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-ink-500 mb-1">Tax notes</h4>
                  <p className="text-ink-700">
                    {allForms.find(f => f.id === selectedForm)?.taxNotes}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-steel-50 rounded-2xl p-6 text-center">
              <p className="text-ink-500">
                Select a form to see details
              </p>
            </div>
          )}
        </div>
      </div>

      <InsightBox
        title="The biggest misconception"
        content="'I got a 1099, so I'm self-employed.' Not necessarily. 1099-INT, 1099-DIV, 1099-B, and 1099-R report passive income—not self-employment. Only certain 1099s connect to Schedule C."
      />
    </div>
  );
}

function ScheduleCView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>('what');

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-sage-600 mb-4 bg-sage-50 px-4 py-2 rounded-full">
          <FileText className="w-4 h-4" />
          Schedule C
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          The quiet bridge between side work and business
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          Schedule C is where the IRS asks you to describe your profit-seeking activity.
          It's where "I do some work on the side" becomes visible as a business.
        </p>
      </div>

      <div className="space-y-4 mb-12">
        <ExpandableSection
          id="what"
          title="What is Schedule C?"
          expanded={expandedSection === 'what'}
          onToggle={() => setExpandedSection(expandedSection === 'what' ? null : 'what')}
        >
          <p className="text-ink-600 mb-4">
            Schedule C is "Profit or Loss From Business (Sole Proprietorship)." It's a form where you report:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-600 ml-2">
            <li>All income from your self-employment or freelance work</li>
            <li>All ordinary and necessary business expenses</li>
            <li>The resulting net profit or loss</li>
          </ul>
          <p className="text-ink-600 mt-4">
            The net profit flows to your Form 1040 as income.
          </p>
        </ExpandableSection>

        <ExpandableSection
          id="when"
          title="When does Schedule C appear?"
          expanded={expandedSection === 'when'}
          onToggle={() => setExpandedSection(expandedSection === 'when' ? null : 'when')}
        >
          <p className="text-ink-600 mb-4">
            Schedule C applies when:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-600 ml-2">
            <li>You're self-employed (freelancer, contractor, consultant)</li>
            <li>You have a sole proprietorship</li>
            <li>You're a single-member LLC taxed as a disregarded entity</li>
            <li>You have a side business or gig work</li>
          </ul>
          <p className="text-ink-600 mt-4">
            Income type matters more than amount. If you earned $600 doing freelance graphic design, that's Schedule C. If you earned $600 in stock dividends, that's not Schedule C.
          </p>
        </ExpandableSection>

        <ExpandableSection
          id="line"
          title="The line between side income and business"
          expanded={expandedSection === 'line'}
          onToggle={() => setExpandedSection(expandedSection === 'line' ? null : 'line')}
        >
          <p className="text-ink-600 mb-4">
            From a tax perspective, there isn't a bright line. The IRS looks at whether you're:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-600 ml-2">
            <li>Operating with a profit motive (not just a hobby)</li>
            <li>Engaged in the activity regularly and continuously</li>
            <li>Depending on the income</li>
          </ul>
          <p className="text-ink-600 mt-4">
            You don't need an LLC, registered business name, or separate bank account to have Schedule C income. The form is filed based on how you earned the money, not how you're organized.
          </p>
        </ExpandableSection>

        <ExpandableSection
          id="expenses"
          title="What expenses can you deduct?"
          expanded={expandedSection === 'expenses'}
          onToggle={() => setExpandedSection(expandedSection === 'expenses' ? null : 'expenses')}
        >
          <p className="text-ink-600 mb-4">
            Ordinary and necessary business expenses. Common examples:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-600 ml-2">
            <li>Software, subscriptions, tools for your work</li>
            <li>Home office (portion of rent/mortgage, utilities)</li>
            <li>Travel, mileage, meals (partial)</li>
            <li>Professional development, books, courses</li>
            <li>Advertising, professional services</li>
          </ul>
          <p className="text-ink-600 mt-4">
            Record-keeping matters. The IRS can disallow deductions without documentation.
          </p>
        </ExpandableSection>

        <ExpandableSection
          id="selfemp"
          title="Self-employment tax"
          expanded={expandedSection === 'selfemp'}
          onToggle={() => setExpandedSection(expandedSection === 'selfemp' ? null : 'selfemp')}
        >
          <p className="text-ink-600 mb-4">
            When you have Schedule C net profit, Schedule SE follows. This is where you calculate:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-600 ml-2">
            <li>Social Security tax: 12.4%</li>
            <li>Medicare tax: 2.9%</li>
            <li>Additional Medicare: 0.9% above $200k ($250k joint)</li>
          </ul>
          <p className="text-ink-600 mt-4">
            As an employee, your employer paid half. When you're self-employed, you pay both halves—but you can deduct half on your 1040.
          </p>
        </ExpandableSection>
      </div>

      <InsightBox
        title="Schedule C is descriptive, not prescriptive"
        content="It doesn't create a business. It reports one that already exists because of how you're earning. You don't opt into Schedule C—the nature of your income determines whether it applies."
      />
    </div>
  );
}

function ComparisonView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const grossIncome = 100000;

  const employed = {
    gross: 100000,
    preTaxBenefits: 5000,
    grossTaxable: 100000 - 5000,
    socialSecurityYourHalf: 6200,
    medicareYourHalf: 1450,
    federalIncomeTax: 15000,
    stateIncomeTax: 4000,
    get totalDeductions() {
      return this.socialSecurityYourHalf + this.medicareYourHalf + this.federalIncomeTax + this.stateIncomeTax;
    },
    get takeHome() {
      return this.gross - this.preTaxBenefits - this.totalDeductions;
    },
  };

  const contracted = {
    gross: 100000,
    businessExpenses: 5000,
    netProfit: 100000 - 5000,
    get seIncomeBase() {
      return this.netProfit * 0.9235;
    },
    get seTaxAmount() {
      return Math.round(this.seIncomeBase * 0.153);
    },
    federalIncomeTax: 12500,
    stateIncomeTax: 3500,
    get totalDeductions() {
      return this.seTaxAmount + this.federalIncomeTax + this.stateIncomeTax;
    },
    get takeHome() {
      return this.gross - this.businessExpenses - this.totalDeductions;
    },
  };

  const soloOwner = {
    gross: 100000,
    businessExpenses: 25000,
    netProfit: 100000 - 25000,
    get seIncomeBase() {
      return this.netProfit * 0.9235;
    },
    get seTaxAmount() {
      return Math.round(this.seIncomeBase * 0.153);
    },
    federalIncomeTax: 9500,
    stateIncomeTax: 2600,
    get totalDeductions() {
      return this.seTaxAmount + this.federalIncomeTax + this.stateIncomeTax;
    },
    get takeHome() {
      return this.gross - this.businessExpenses - this.totalDeductions;
    },
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-4">
          Same work, different arrangement
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          Imagine the same person doing the same kind of work, earning the same $100,000—
          but arranged three different ways. The tax system treats each arrangement differently,
          and what reaches you at the end can be very different.
        </p>
      </div>

      {/* Three-Column Comparison */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <ThreeWayColumn
          title="Employed at a firm"
          subtitle="W-2"
          gross={employed.gross}
          rows={[
            { label: 'Gross salary', amount: employed.gross, isBold: true },
            { label: 'Pre-tax benefits', amount: -employed.preTaxBenefits, note: '401k, health insurance' },
            { label: 'SS (employee half)', amount: -employed.socialSecurityYourHalf },
            { label: 'Medicare (employee half)', amount: -employed.medicareYourHalf },
            { label: 'Federal income tax', amount: -employed.federalIncomeTax, note: 'illustrative' },
            { label: 'State income tax', amount: -employed.stateIncomeTax, note: 'illustrative' },
          ]}
          takeHome={employed.takeHome}
          savedAmount={employed.preTaxBenefits}
          savedLabel="spent or saved"
          icon={<Briefcase className="w-6 h-6" />}
          color="steel"
          notes="Employer pays the other half of FICA (7.65%). Benefits paid by employer. No Schedule C."
          structure={[
            'Employer provides office, equipment',
            'Some benefits (health insurance, 401k)',
            'Employer covers half of Social Security & Medicare',
          ]}
        />

        <ThreeWayColumn
          title="Contracted as hired expert"
          subtitle="1099-NEC → Schedule C"
          gross={contracted.gross}
          rows={[
            { label: 'Gross receipts', amount: contracted.gross, isBold: true },
            { label: 'Business expenses', amount: -contracted.businessExpenses, note: 'laptop, software, minor supplies' },
            { label: 'Net profit', amount: contracted.netProfit, isBold: true },
            { label: 'Self-employment tax', amount: -contracted.seTaxAmount, note: '15.3% on net profit' },
            { label: 'Federal income tax', amount: -contracted.federalIncomeTax, note: 'illustrative' },
            { label: 'State income tax', amount: -contracted.stateIncomeTax, note: 'illustrative' },
          ]}
          takeHome={contracted.takeHome}
          savedAmount={contracted.businessExpenses}
          savedLabel="business pays"
          icon={<PenTool className="w-6 h-6" />}
          color="sage"
          notes="You pay both halves of FICA. No employer benefits. Quarterly estimated payments may apply."
          structure={[
            'Minimal overhead',
            'You cover your own tools & software',
            'You pay full SE tax (no split)',
            'No employer benefits',
          ]}
        />

        <ThreeWayColumn
          title="Solo practice / small business"
          subtitle="Sometimes 1099, sometimes direct → Schedule C"
          gross={soloOwner.gross}
          rows={[
            { label: 'Gross revenue', amount: soloOwner.gross, isBold: true },
            { label: 'Business expenses', amount: -soloOwner.businessExpenses, note: 'office, software, insurance, marketing, supplies, CE' },
            { label: 'Net profit', amount: soloOwner.netProfit, isBold: true },
            { label: 'Self-employment tax', amount: -soloOwner.seTaxAmount, note: '15.3% on net profit' },
            { label: 'Federal income tax', amount: -soloOwner.federalIncomeTax, note: 'illustrative' },
            { label: 'State income tax', amount: -soloOwner.stateIncomeTax, note: 'illustrative' },
          ]}
          takeHome={soloOwner.takeHome}
          savedAmount={soloOwner.businessExpenses}
          savedLabel="business pays"
          icon={<Receipt className="w-6 h-6" />}
          color="sand"
          notes="Real business overhead. You deduct the actual cost of running it. Quarterly payments likely."
          structure={[
            'Your business pays for infrastructure',
            'Office or home office expense',
            'Professional insurance & tools',
            'Marketing & business development',
          ]}
        />
      </div>

      {/* What the Structure Provides */}
      <div className="bg-gradient-to-br from-cream-50 to-white rounded-2xl border border-ink-100 p-8 mb-12">
        <h2 className="text-2xl font-serif text-ink-800 mb-8 text-center">What each structure provides</h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-steel-200">
            <h3 className="font-serif text-lg text-steel-700 mb-4">Employed</h3>
            <ul className="space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-2">
                <span className="text-steel-600 font-bold mt-0.5">•</span>
                <span>Employer provides office, equipment, workspace</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-steel-600 font-bold mt-0.5">•</span>
                <span>Employer benefits (health insurance, 401k match)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-steel-600 font-bold mt-0.5">•</span>
                <span>Employer covers half of FICA taxes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-steel-600 font-bold mt-0.5">•</span>
                <span>Employer withholds taxes throughout year</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sage-200">
            <h3 className="font-serif text-lg text-sage-700 mb-4">Contracted Expert</h3>
            <ul className="space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-2">
                <span className="text-sage-600 font-bold mt-0.5">•</span>
                <span>Minimal overhead (mostly tools & software)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 font-bold mt-0.5">•</span>
                <span>Personal costs remain personal (health, retirement)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 font-bold mt-0.5">•</span>
                <span>You pay full SE tax (no employer split)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-600 font-bold mt-0.5">•</span>
                <span>No withholding; you manage tax timing</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sand-200">
            <h3 className="font-serif text-lg text-sand-700 mb-4">Solo Practice / Business</h3>
            <ul className="space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-2">
                <span className="text-sand-600 font-bold mt-0.5">•</span>
                <span>Your business pays for infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sand-600 font-bold mt-0.5">•</span>
                <span>Real overhead: office, software, insurance, marketing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sand-600 font-bold mt-0.5">•</span>
                <span>You deduct actual costs of running it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sand-600 font-bold mt-0.5">•</span>
                <span>You pay full SE tax and manage quarterly payments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-br from-sage-50 to-cream-50 rounded-2xl border-2 border-sage-200 p-8 mb-12">
        <h3 className="text-xl font-serif text-ink-800 mb-4">The real difference</h3>
        <p className="text-ink-600 leading-relaxed mb-4">
          Columns 2 and 3 use the same tax forms (1099, Schedule C, Schedule SE). The difference isn't the tax rules.
          It's the <span className="font-medium text-sage-700">expense profile</span>.
        </p>
        <p className="text-ink-600 leading-relaxed">
          A contracted expert usually has minimal overhead. A solo practice or small business—whether you offer
          services, sell goods, or run an operation—has the costs of actually running it: workspace, tools, insurance,
          marketing, dues, supplies.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-white rounded-2xl border border-ink-100 p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-ink-600 mb-4">
            <strong className="text-ink-800">All numbers are illustrative.</strong> Real outcomes depend on your filing status,
            state, family situation, actual expenses, pre-tax contributions, credits, and many other factors.
          </p>
          <p className="text-sm text-ink-600">
            This is a conceptual comparison of how the same gross income is treated under three structures—not a calculator,
            and not a recommendation for which structure is "best" for you. Each has legitimate use cases. The structure
            you choose changes what you can deduct, which changes what gets taxed, which changes what reaches you.
          </p>
        </div>
      </div>
    </div>
  );
}

function ThreeWayColumn({
  title,
  subtitle,
  gross,
  rows,
  takeHome,
  icon,
  color,
  notes,
  structure,
  savedAmount = 0,
  savedLabel = 'spent or saved',
}: {
  title: string;
  subtitle: string;
  gross: number;
  rows: Array<{ label: string; amount: number; note?: string; isBold?: boolean }>;
  takeHome: number;
  icon: React.ReactNode;
  color: 'steel' | 'sage' | 'sand';
  notes: string;
  structure: string[];
  savedAmount?: number;
  savedLabel?: string;
}) {
  const colorMap = {
    steel: { bg: 'bg-steel-50', border: 'border-steel-200', iconBg: 'bg-steel-100', iconText: 'text-steel-600', accent: 'text-steel-700', takeHomeBg: 'bg-emerald-100', takeHomeText: 'text-emerald-700' },
    sage: { bg: 'bg-sage-50', border: 'border-sage-200', iconBg: 'bg-sage-100', iconText: 'text-sage-600', accent: 'text-sage-700', takeHomeBg: 'bg-emerald-100', takeHomeText: 'text-emerald-700' },
    sand: { bg: 'bg-sand-50', border: 'border-sand-200', iconBg: 'bg-sand-100', iconText: 'text-sand-700', accent: 'text-sand-700', takeHomeBg: 'bg-emerald-100', takeHomeText: 'text-emerald-700' },
  };

  const c = colorMap[color];

  // Calculate segments for stacked bar — all three must sum to exactly gross
  const totalTaxes = gross - takeHome - savedAmount;

  const takeHomePercent = (takeHome / gross) * 100;
  const taxPercent = (totalTaxes / gross) * 100;
  const savedPercent = (savedAmount / gross) * 100;

  return (
    <div className={`${c.bg} rounded-2xl border-2 ${c.border} overflow-hidden`}>
      <div className="p-6 border-b-2 border-inherit bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg ${c.iconBg} ${c.iconText} flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-serif text-ink-800">{title}</h3>
            <p className="text-xs text-ink-400 font-mono">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Stacked bar visualization — vertical, bottom-to-top: green → red → gray */}
      <div className="px-6 pb-4">
        <div className="flex flex-col w-full rounded-xl overflow-hidden border border-ink-100" style={{ height: '240px' }}>
          {/* Top: gray — smallest, but always min 40px so label fits */}
          {savedAmount > 0 && (
            <div
              className="bg-ink-200 flex items-center justify-center text-center px-2 transition-all flex-shrink-0"
              style={{ height: `${savedPercent}%`, minHeight: '40px' }}
            >
              <div className="text-xs text-ink-600 font-medium leading-tight text-center">
                <div className="font-semibold">${Math.round(savedAmount).toLocaleString()}</div>
                <div className="text-ink-500">{savedLabel}</div>
              </div>
            </div>
          )}
          {/* Middle: red/pink — taxes */}
          <div
            className="bg-red-100 flex items-center justify-center text-center px-2 transition-all flex-shrink-0"
            style={{ height: `${taxPercent}%` }}
          >
            <div className="text-xs text-red-700 font-medium leading-tight text-center">
              <div className="font-semibold">${Math.round(totalTaxes).toLocaleString()}</div>
              <div className="text-red-500">taxes</div>
            </div>
          </div>
          {/* Bottom: green — reaches you, always the largest */}
          <div
            className="bg-emerald-100 flex items-center justify-center text-center px-2 transition-all flex-grow"
          >
            <div className="text-xs text-emerald-700 font-medium leading-tight text-center">
              <div className="font-semibold">${Math.round(takeHome).toLocaleString()}</div>
              <div className="text-emerald-600">reaches you</div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="p-6 space-y-2 bg-white">
        {rows.map((row, idx) => (
          <div key={idx} className={`flex justify-between items-start ${row.isBold ? 'font-bold text-ink-800 py-1' : 'py-0.5'}`}>
            <div className="text-sm">
              <span>{row.label}</span>
              {row.note && (
                <span className="text-ink-400 block text-xs font-normal">{row.note}</span>
              )}
            </div>
            <span className={`font-mono text-sm ${!row.isBold && row.amount < 0 ? 'text-red-600' : ''}`}>
              {row.amount >= 0 && !row.isBold ? '+' : ''}{Math.round(row.amount).toLocaleString()}
            </span>
          </div>
        ))}

        <div className={`border-t-2 ${c.border} pt-4 mt-4`}>
          <div className="flex justify-between items-center">
            <span className={`font-medium ${c.accent}`}>Estimated take-home</span>
            <span className={`font-mono text-lg font-bold ${c.accent}`}>
              ${Math.round(takeHome).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className={`p-4 ${c.bg} border-t-2 ${c.border}`}>
        <p className="text-xs text-ink-500 mb-3">{notes}</p>
      </div>
    </div>
  );
}

function ComparisonColumn({
  title,
  gross,
  items,
  takeHome,
  icon,
  notes,
}: {
  title: string;
  gross: number;
  items: Array<{ label: string; amount: number; note?: string }>;
  takeHome: number;
  icon: React.ReactNode;
  notes: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="p-6 border-b border-ink-100 bg-cream-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-steel-100 text-steel-600 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-serif text-ink-800">{title}</h3>
        </div>
        <p className="text-sm text-ink-500">Gross: ${gross.toLocaleString()}</p>
      </div>

      <div className="p-6 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div className="text-sm">
              <span className="text-ink-700">{item.label}</span>
              {item.note && (
                <span className="text-ink-400 block text-xs">{item.note}</span>
              )}
            </div>
            <span className={`font-mono text-sm ${item.amount < 0 ? 'text-red-600' : 'text-ink-700'}`}>
              {item.amount >= 0 ? '+' : ''}{item.amount.toLocaleString()}
            </span>
          </div>
        ))}

        <div className="border-t border-ink-100 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-ink-800">Estimated take-home</span>
            <span className="font-mono text-xl font-bold text-sage-700">
              ${takeHome.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-sand-50 border-t border-sand-100">
        <p className="text-xs text-ink-500">{notes}</p>
      </div>
    </div>
  );
}

function ComparisonRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex-1 flex items-center gap-3">
        <Briefcase className="w-4 h-4 text-steel-500 flex-shrink-0" />
        <span className="text-sm text-ink-600">{left}</span>
      </div>
      <div className="hidden sm:block w-px h-6 bg-ink-100" />
      <div className="flex-1 flex items-center gap-3">
        <PenTool className="w-4 h-4 text-sage-500 flex-shrink-0" />
        <span className="text-sm text-ink-600">{right}</span>
      </div>
    </div>
  );
}

function RoadmapStep({
  number,
  title,
  description,
  expanded,
  onToggle,
  details,
}: {
  number: number;
  title: string;
  description: string;
  expanded: boolean;
  onToggle: () => void;
  details: React.ReactNode;
}) {
  return (
    <div className="roadmap-step active">
      <button
        onClick={onToggle}
        className="focus-ring rounded-lg -ml-8 p-2 group"
      >
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-steel-100 text-steel-600 text-sm font-medium inline-flex items-center justify-center">
            {number}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-ink-800 text-left">{title}</h3>
              <ChevronDown
                className={`w-5 h-5 text-ink-400 transition-transform ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </div>
            <p className="text-ink-500 text-sm mt-1 text-left">{description}</p>
          </div>
        </div>
      </button>
      <div
        className={`expandable-content transition-all duration-300 ease-out ${
          expanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-8 p-4 bg-cream-50 rounded-lg border border-ink-100">
          {details}
        </div>
      </div>
    </div>
  );
}

function ExpandableSection({
  id,
  title,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 hover:bg-cream-50 transition-colors focus-ring"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-ink-800">{title}</h2>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            expanded ? 'bg-sage-100 text-sage-700' : 'bg-ink-50 text-ink-400'
          }`}>
            {expanded ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </button>
      <div
        className={`expandable-content ${
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Schedule C Anatomy — section-grouped interactive component
function ScheduleCAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const sections: Array<{
    name: string;
    items: Array<{ line: string; label: string; value: string; desc: string; where: string }>;
  }> = [
    {
      name: 'Part I — Income',
      items: [
        {
          line: 'Line 1',
          label: 'Gross receipts or sales',
          value: '$42,500',
          desc: 'Total income received from your business before any deductions. Includes all 1099-NEC amounts, 1099-K amounts, direct payments, and any other business revenue — whether or not you received a form.',
          where: 'Starting point for Schedule C income. Platform fees and refunds are deducted as Part II expenses.',
        },
        {
          line: 'Line 7',
          label: 'Gross income',
          value: '$42,500',
          desc: 'Gross receipts minus cost of goods sold (if applicable). For most service-based freelancers, this equals Line 1 — cost of goods sold only applies if you sell physical products.',
          where: 'Carries into Part II as the income figure against which expenses are subtracted.',
        },
      ],
    },
    {
      name: 'Part II — Expenses',
      items: [
        {
          line: 'Line 8',
          label: 'Advertising',
          value: '$600',
          desc: 'Business promotion costs — website hosting, paid ads, business cards, social media promotion, print materials. Must be ordinary and necessary for the business.',
          where: 'Part II total → subtracted from Line 7 to reach net profit on Line 31.',
        },
        {
          line: 'Line 18',
          label: 'Office expense',
          value: '$840',
          desc: 'Office supplies used directly in your business — printer paper, pens, folders, toner. Separate from home office (Line 30) and from equipment over $2,500 (which may need depreciation).',
          where: 'Part II total → subtracted from Line 7 to reach net profit on Line 31.',
        },
        {
          line: 'Line 22',
          label: 'Supplies',
          value: '$1,200',
          desc: 'Materials and supplies used in delivering your service — tools, client materials, project-specific purchases. The line between Line 18 and Line 22 is fuzzy; the IRS cares more that you claim it somewhere than exactly which line.',
          where: 'Part II total → subtracted from Line 7 to reach net profit on Line 31.',
        },
        {
          line: 'Line 25',
          label: 'Utilities',
          value: '$480',
          desc: 'Business-portion utility costs — phone (business use percentage), internet (business use percentage), electricity for a dedicated home office. You may need to allocate based on square footage or usage.',
          where: 'Part II total → subtracted from Line 7 to reach net profit on Line 31.',
        },
        {
          line: 'Line 27a',
          label: 'Other expenses',
          value: '$920',
          desc: 'Ordinary and necessary business expenses not listed on Lines 8–26 — software subscriptions, professional dues, continuing education, bank fees, business books, reference materials.',
          where: 'Part II total → subtracted from Line 7 to reach net profit on Line 31.',
        },
      ],
    },
    {
      name: 'Part II — Bottom Line',
      items: [
        {
          line: 'Line 28',
          label: 'Total expenses',
          value: '$4,040',
          desc: 'Sum of all business expenses from Lines 8 through 27b. This is the total deductible amount against your gross income — every dollar here reduces your taxable profit.',
          where: 'Subtracted from Line 7 (gross income) to calculate net profit on Line 31.',
        },
        {
          line: 'Line 31',
          label: 'Net profit or (loss)',
          value: '$38,460',
          desc: 'Your business bottom line — gross income minus total expenses. This single number does two things: it flows to Schedule 1 as ordinary income (subject to income tax), and it also becomes the base for Schedule SE (self-employment tax). Every dollar of legitimate expense reduces both taxes simultaneously.',
          where: 'Schedule 1, Line 3 → Form 1040, Line 8 (ordinary income). Also base for Schedule SE self-employment tax.',
        },
      ],
    },
  ];

  const allItems = sections.flatMap(s => s.items);
  const activeTipData = activeTip ? allItems.find(i => i.line === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any line to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sage-200 overflow-hidden mb-4">
        <div className="bg-sage-50 px-4 py-3 border-b border-sage-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">Schedule C · Profit or Loss From Business</span>
          <span className="text-xs text-ink-400">Filed with Form 1040</span>
        </div>

        {sections.map((section) => (
          <div key={section.name}>
            <div className="px-4 py-1.5 bg-sage-50 border-y border-sage-100">
              <span className="text-xs font-semibold text-sage-700 uppercase tracking-wide">{section.name}</span>
            </div>
            <div className="divide-y divide-sage-50">
              {section.items.map((item) => (
                <button
                  key={item.line}
                  onMouseEnter={() => setActiveTip(item.line)}
                  onFocus={() => setActiveTip(item.line)}
                  onClick={() => setActiveTip(item.line)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${
                    activeTip === item.line ? 'bg-sage-100' : 'bg-white hover:bg-sage-50'
                  }`}
                >
                  <div className="text-xs text-sage-600 font-semibold w-14 flex-shrink-0">{item.line}</div>
                  <div className="text-sm text-ink-700 flex-1 leading-tight">{item.label}</div>
                  <div className="text-xs text-ink-500 font-mono ml-2 flex-shrink-0">{item.value}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-sage-50 rounded-xl p-4 border border-sage-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a line above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sage-600 uppercase tracking-wide">
              {activeTipData.line} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sage-200">
              <div className="text-xs font-medium text-sage-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Form Anatomy Components with Interactive Tooltips
interface FormBoxData {
  box: string;
  label: string;
  value: string;
  desc: string;
  where: string;
}

function FormW2Anatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1',
      label: 'Wages, tips, other compensation',
      value: '$52,400.00',
      desc: 'Your taxable wages — gross pay reduced by 401(k), HSA, and pre-tax health insurance.',
      where: 'Form 1040, line 1a (wages, salaries, tips)',
    },
    {
      box: 'Box 2',
      label: 'Federal income tax withheld',
      value: '$5,234.00',
      desc: 'Federal income tax already paid to the IRS on your behalf. Counts against what you owe at filing.',
      where: 'Form 1040, line 25a (federal tax withheld)',
    },
    {
      box: 'Box 3',
      label: 'Social Security wages',
      value: '$54,000.00',
      desc: 'Wages subject to Social Security tax. Usually equals gross pay minus pre-tax health insurance. 401(k) does NOT reduce this.',
      where: 'Internal — basis for Box 4 calculation',
    },
    {
      box: 'Box 4',
      label: 'Social Security tax withheld',
      value: '$3,348.00',
      desc: 'Social Security tax already withheld — your half of the 12.4% SS tax (6.2% of Box 3).',
      where: 'Internal — already remitted by employer',
    },
    {
      box: 'Box 5',
      label: 'Medicare wages and tips',
      value: '$54,000.00',
      desc: 'Wages subject to Medicare tax. Like Box 3, but no wage cap applies.',
      where: 'Internal — basis for Box 6 calculation',
    },
    {
      box: 'Box 6',
      label: 'Medicare tax withheld',
      value: '$783.00',
      desc: 'Medicare tax already withheld — your half of the 2.9% Medicare tax (1.45% of Box 5).',
      where: 'Internal — already remitted by employer',
    },
    {
      box: 'Box 17',
      label: 'State income tax',
      value: '$1,623.00',
      desc: 'State income tax already withheld and remitted by your employer.',
      where: 'Your state tax return — state tax withheld line',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands on your return.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">Wage and Tax Statement</span>
          <span className="text-xs text-ink-400">Arrives by January 31</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sand-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-xs text-sand-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Form1099NECAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1',
      label: 'Nonemployee compensation',
      value: '$8,750.00',
      desc: 'Gross amount paid to you for services. Your client sends this when they paid you $600 or more during the year — it arrives by January 31. This number goes directly to Schedule C, Part I, Line 1 as gross receipts before any expense deductions.',
      where: 'Schedule C, Part I, Line 1 (gross receipts or sales)',
    },
    {
      box: 'Box 4',
      label: 'Federal income tax withheld',
      value: '$0.00',
      desc: 'Backup withholding — nearly always $0 for 1099-NEC. You receive the full payment amount and are responsible for estimating and paying your own taxes quarterly. If you see a non-zero amount here, it means your tax ID was flagged for backup withholding.',
      where: 'Form 1040, Line 25a (federal tax withheld) — offsets what you owe at filing',
    },
    {
      box: 'Box 5',
      label: 'State tax withheld',
      value: '$0.00',
      desc: 'State income tax withheld by the payer, if any. Nearly always $0 — self-employed workers are responsible for paying their own state estimated taxes.',
      where: 'Your state income tax return — state tax withheld line',
    },
    {
      box: 'Box 6',
      label: "State / Payer's state no.",
      value: 'FL / —',
      desc: "The state where the income was earned and the payer's state tax ID number. Used to match the income to the correct state filing jurisdiction.",
      where: 'State return — identifies the filing state',
    },
    {
      box: 'Box 7',
      label: 'State income',
      value: '$8,750.00',
      desc: 'The amount of compensation attributable to the state listed in Box 6. Usually equals Box 1 if you work in a single state.',
      where: 'State income tax return — same figure as Box 1 in single-state situations',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sage-200 overflow-hidden mb-4">
        <div className="bg-sage-50 px-4 py-3 border-b border-sage-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">1099-NEC · Nonemployee Compensation</span>
          <span className="text-xs text-ink-400">Arrives by Jan 31</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sage-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sage-100' : 'bg-white hover:bg-sage-50'
              }`}
            >
              <div className="text-xs text-sage-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sage-50 rounded-xl p-4 border border-sage-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sage-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sage-200">
              <div className="text-xs font-medium text-sage-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Form1099KAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1a',
      label: 'Gross amount of payment card/third party network transactions',
      value: '$24,300.00',
      desc: 'Total gross receipts reported to the IRS — this is before platform fees, refunds, chargebacks, or any deductions. Your actual taxable amount on Schedule C will usually be lower: you deduct platform fees and other expenses in Part II. Do not assume Box 1a equals your profit.',
      where: 'Schedule C, Part I, Line 1 (gross receipts) — then deduct fees and refunds as expenses in Part II',
    },
    {
      box: 'Box 4',
      label: 'Federal income tax withheld',
      value: '$0.00',
      desc: 'Backup withholding — nearly always $0. You are responsible for paying your own taxes through quarterly estimated payments (April 15, June 16, Sept 15, Jan 15).',
      where: 'Form 1040, Line 25a — offsets what you owe at filing',
    },
    {
      box: 'Box 5a',
      label: 'January transactions',
      value: '$1,840.00',
      desc: 'Gross payment volume processed in January. Boxes 5a–5l break down the annual Box 1a total by month — useful for estimating quarterly tax payments.',
      where: 'Reference — the 12-month total (5a through 5l) equals Box 1a',
    },
    {
      box: 'Box 5b',
      label: 'February transactions',
      value: '$2,100.00',
      desc: 'Gross payment volume processed in February.',
      where: 'Reference — the 12-month total equals Box 1a',
    },
    {
      box: 'Box 5c',
      label: 'March transactions',
      value: '$1,950.00',
      desc: 'Gross payment volume for March. Q1 total (5a + 5b + 5c) helps you estimate how much to pay by April 15 for your first quarterly payment.',
      where: 'Reference — the 12-month total equals Box 1a',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">1099-K · Payment Card & Third Party Network</span>
          <span className="text-xs text-ink-400">Arrives by Jan 31</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sand-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-xs text-sand-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Form1099BAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1a',
      label: 'Description of property',
      value: '100 sh XYZ Corp',
      desc: 'What was sold — typically the security name and number of shares, units of crypto, or description of property.',
      where: 'Schedule D, Part I or Part II (description column)',
    },
    {
      box: 'Box 1c',
      label: 'Date sold or disposed',
      value: '08/14/2024',
      desc: 'The date of the sale. Combined with the purchase date, this determines whether the gain or loss is short-term (held 1 year or less) or long-term (held more than 1 year).',
      where: 'Schedule D — determines which section (short vs. long-term) and applicable tax rate',
    },
    {
      box: 'Box 1d',
      label: 'Proceeds',
      value: '$4,820.00',
      desc: 'The amount you received from the sale — your gross selling price. Gain or loss = Proceeds (Box 1d) minus Basis (Box 1e). If Box 1e is blank, you must determine your own cost basis.',
      where: 'Schedule D, Proceeds column → Form 8949 if adjustments needed',
    },
    {
      box: 'Box 1e',
      label: 'Cost or other basis',
      value: '$3,100.00',
      desc: 'What you originally paid for the asset (purchase price + commissions). If this box is blank or shows $0, the broker did not have basis information on file — you must look up your original purchase price and report the correct basis yourself.',
      where: 'Schedule D, Cost/Basis column — subtracted from Box 1d to get your gain or loss',
    },
    {
      box: 'Box 2',
      label: 'Type of gain or loss',
      value: 'Long-term',
      desc: 'Short-term = held 1 year or less → taxed at ordinary income rates. Long-term = held more than 1 year → taxed at preferential capital gains rates (0%, 15%, or 20% depending on income).',
      where: 'Schedule D, Part I (short-term) or Part II (long-term)',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">1099-B · Proceeds from Broker Transactions</span>
          <span className="text-xs text-ink-400">From your brokerage</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sand-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-xs text-sand-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Form1099RAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1',
      label: 'Gross distribution',
      value: '$12,000.00',
      desc: 'Total amount distributed from your retirement account before any withholding or taxes. This is the full amount that left the account.',
      where: 'Form 1040, Line 5a (pension/annuity total) — Box 2a is the taxable portion',
    },
    {
      box: 'Box 2a',
      label: 'Taxable amount',
      value: '$12,000.00',
      desc: 'The portion of the distribution subject to income tax. Usually equals Box 1 for traditional 401(k) and IRA distributions. May be less than Box 1 if you made after-tax (non-deductible) contributions.',
      where: 'Form 1040, Line 5b (pension/annuity taxable amount) → added to ordinary income',
    },
    {
      box: 'Box 4',
      label: 'Federal income tax withheld',
      value: '$2,400.00',
      desc: 'Federal income tax withheld from your distribution — typically 20% for most retirement plan withdrawals, or 10% for IRA distributions (both are adjustable). This counts as a payment toward your tax bill.',
      where: 'Form 1040, Line 25b (federal tax withheld) — reduces what you owe at filing',
    },
    {
      box: 'Box 7',
      label: 'Distribution code(s)',
      value: '1',
      desc: 'The most important box on the form — even though it is just a letter or number. Code 1 = early distribution (under 59½), may trigger 10% penalty. Code 2 = early, exception applies. Code 7 = normal distribution (59½ or older). Code G = direct rollover (not taxable). The code determines whether you owe a penalty.',
      where: 'Determines Form 5329 (additional taxes) — penalty applies if Code 1 with no exception',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">1099-R · Distributions from Retirement Plans</span>
          <span className="text-xs text-ink-400">From your plan administrator</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sand-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-xs text-sand-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FormScheduleSEAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const steps: Array<{ id: string; label: string; value: string; desc: string; where: string }> = [
    {
      id: 'net',
      label: 'Net SE earnings',
      value: 'From Schedule C, Line 31',
      desc: 'Your net profit from Schedule C — gross receipts minus all allowable business expenses. This is the starting number for the entire self-employment tax calculation.',
      where: 'Schedule SE, Line 2 or Line 3 (depending on method)',
    },
    {
      id: 'adjustment',
      label: '× 92.35%',
      value: 'SE income reduction',
      desc: 'Multiply net earnings by 92.35% (that is, 100% minus 7.65%). This removes the employer-equivalent half of SE tax from the taxable base — mirroring how W-2 employees are not taxed on the employer share of FICA that their employer pays on their behalf.',
      where: 'Schedule SE, Line 4a — this becomes your SE income subject to tax',
    },
    {
      id: 'rate',
      label: '× 15.3%',
      value: '12.4% SS + 2.9% Medicare',
      desc: 'This is the combined employee AND employer share of FICA. A W-2 employee pays 7.65% and their employer quietly pays the other 7.65% — but as self-employed you pay both halves yourself. The rate applies to the 92.35%-adjusted amount, not your full net profit.',
      where: 'Schedule SE, Line 12 (SS) + Line 13 (Medicare) = Line 15 total → Form 1040 Schedule 2, Line 4',
    },
    {
      id: 'deductible',
      label: '÷ 2 = Deductible half',
      value: 'Above-the-line deduction',
      desc: 'Half of your SE tax is deductible as an above-the-line adjustment on Schedule 1. This partially compensates for paying both halves of FICA — it reduces your adjusted gross income and therefore your income tax base, even though the SE tax itself is still fully owed.',
      where: 'Schedule 1, Line 15 → reduces Form 1040 adjusted gross income before the standard deduction',
    },
  ];

  const activeTipData = activeTip ? steps.find(s => s.id === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any step to see how the calculation works.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-300 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">Schedule SE · Self-Employment Tax</span>
          <span className="text-xs text-ink-400">Calculated on Schedule SE</span>
        </div>

        <div className="divide-y divide-sand-100">
          {steps.map((step) => (
            <button
              key={step.id}
              onMouseEnter={() => setActiveTip(step.id)}
              onFocus={() => setActiveTip(step.id)}
              onClick={() => setActiveTip(step.id)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-colors ${
                activeTip === step.id ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-sm font-bold text-sand-700 w-28 flex-shrink-0 font-mono">{step.label}</div>
              <div className="text-sm text-ink-500 flex-1 leading-tight">{step.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a step above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Form1099INTAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1',
      label: 'Interest income',
      value: '$340.00',
      desc: 'Total taxable interest earned from bank accounts, savings accounts, CDs, and bonds. If your total interest income from all sources is $1,500 or less, you can report it directly on Form 1040. If over $1,500, you must also complete Schedule B.',
      where: 'Schedule B, Part I → Form 1040, Line 2b (taxable interest)',
    },
    {
      box: 'Box 2',
      label: 'Early withdrawal penalty',
      value: '$28.00',
      desc: 'Penalty you paid for withdrawing from a time deposit (like a CD) before maturity. Even though it reduces your actual return, you still report the full interest in Box 1 — then deduct this penalty separately as an above-the-line adjustment.',
      where: 'Schedule 1, Line 18 (Penalty on early withdrawal of savings) — reduces your AGI',
    },
    {
      box: 'Box 3',
      label: 'Interest on U.S. Savings Bonds and Treasury obligations',
      value: '$125.00',
      desc: 'Interest from federal government securities — U.S. Savings Bonds (like Series EE or I), Treasury bills, notes, and bonds. This interest is exempt from state and local income tax, but is fully taxable for federal purposes.',
      where: 'Form 1040, Line 2b (federal) — exempt from state return',
    },
    {
      box: 'Box 4',
      label: 'Federal income tax withheld',
      value: '$0.00',
      desc: 'Backup withholding applied if your tax ID was missing or flagged. Rare for most bank accounts — but if you see a non-zero amount, it means the bank has already sent that money to the IRS on your behalf.',
      where: 'Form 1040, Line 25a (federal tax withheld) — reduces what you owe at filing',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">1099-INT · Interest Income</span>
          <span className="text-xs text-ink-400">From banks, CDs, bonds</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sand-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-xs text-sand-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Form1099DIVAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1a',
      label: 'Total ordinary dividends',
      value: '$820.00',
      desc: 'All dividends received from stocks and mutual funds. This is your total dividend income — but not all of it is taxed the same way. Box 1b (below) shows the portion that qualifies for lower rates.',
      where: 'Schedule B, Part II (if over $1,500 total) → Form 1040, Line 3b',
    },
    {
      box: 'Box 1b',
      label: 'Qualified dividends',
      value: '$680.00',
      desc: 'The most misunderstood box on this form. Qualified dividends are a subset of Box 1a — they come from U.S. corporations (or qualifying foreign ones) and you held the stock long enough. They are taxed at preferential long-term capital gains rates (0%, 15%, or 20%) instead of your ordinary income tax rate. A dividend is not automatically qualified just because a company declared it.',
      where: 'Form 1040, Line 3a — taxed at capital gains rates, not ordinary income rates',
    },
    {
      box: 'Box 2a',
      label: 'Total capital gain distributions',
      value: '$145.00',
      desc: 'Gains distributed by mutual funds and ETFs from selling securities inside the fund during the year. You receive this even if you never sold your fund shares. Treated as long-term capital gain regardless of how long you held the fund.',
      where: 'Schedule D, Part II (long-term) → Form 1040, Line 13',
    },
    {
      box: 'Box 4',
      label: 'Federal income tax withheld',
      value: '$0.00',
      desc: 'Backup withholding on dividends — rare for most investors. If non-zero, the brokerage sent this amount directly to the IRS and it counts as a tax payment you already made.',
      where: 'Form 1040, Line 25a (federal tax withheld) — offsets what you owe',
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">Hover or focus any box to see what it reports and where it lands.</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">1099-DIV · Dividends and Distributions</span>
          <span className="text-xs text-ink-400">From your brokerage</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-sand-200">
          {boxes.map((box) => (
            <button
              key={box.box}
              onMouseEnter={() => setActiveTip(box.box)}
              onFocus={() => setActiveTip(box.box)}
              onClick={() => setActiveTip(box.box)}
              className={`text-left p-3 transition-colors ${
                activeTip === box.box ? 'bg-sand-100' : 'bg-white hover:bg-sand-50'
              }`}
            >
              <div className="text-xs text-sand-600 font-medium uppercase tracking-wide mb-1">{box.box}</div>
              <div className="text-sm font-medium text-ink-700 leading-tight mb-1">{box.label}</div>
              <div className="text-xs text-ink-500 font-mono">{box.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
        {!activeTip ? (
          <p className="text-sm text-ink-400 italic text-center py-4">Hover or focus a box above</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">Where it lands</div>
              <p className="text-sm text-ink-600">{activeTipData.where}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RaiseVisualizer() {
  const [salary, setSalary] = useState(73000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'mfj' | 'mfs' | 'hoh'>('single');
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [prevSalary, setPrevSalary] = useState(60000);

  const taxBrackets = {
    single: [
      { threshold: 0, rate: 0.10, limit: 11925 },
      { threshold: 11925, rate: 0.12, limit: 48475 },
      { threshold: 48475, rate: 0.22, limit: 103350 },
      { threshold: 103350, rate: 0.24, limit: 197300 },
    ],
    mfj: [
      { threshold: 0, rate: 0.10, limit: 23850 },
      { threshold: 23850, rate: 0.12, limit: 96950 },
      { threshold: 96950, rate: 0.22, limit: 206700 },
      { threshold: 206700, rate: 0.24, limit: 394600 },
    ],
    mfs: [
      { threshold: 0, rate: 0.10, limit: 11925 },
      { threshold: 11925, rate: 0.12, limit: 48475 },
      { threshold: 48475, rate: 0.22, limit: 103350 },
      { threshold: 103350, rate: 0.24, limit: 197300 },
    ],
    hoh: [
      { threshold: 0, rate: 0.10, limit: 17000 },
      { threshold: 17000, rate: 0.12, limit: 64850 },
      { threshold: 64850, rate: 0.22, limit: 103350 },
      { threshold: 103350, rate: 0.24, limit: 197300 },
    ],
  };

  const standardDeductions = {
    single: 15750,
    mfj: 31500,
    mfs: 15750,
    hoh: 23625,
  };

  const calculateTax = (grossSalary: number) => {
    const brackets = taxBrackets[filingStatus];
    const standardDeduction = standardDeductions[filingStatus];
    const taxableIncome = Math.max(0, grossSalary - standardDeduction);

    let tax = 0;
    let layers: Array<{ income: number; rate: number }> = [];

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      const nextThreshold = i < brackets.length - 1 ? brackets[i + 1].threshold : taxableIncome;
      const incomeInBracket = Math.min(taxableIncome, bracket.limit) - bracket.threshold;

      if (incomeInBracket > 0) {
        tax += incomeInBracket * bracket.rate;
        layers.push({ income: incomeInBracket, rate: bracket.rate });
      }
    }

    const effectiveRate = grossSalary > 0 ? (tax / grossSalary) * 100 : 0;
    const marginalRate = brackets.find(b => b.threshold < taxableIncome && taxableIncome <= b.limit)?.rate || brackets[brackets.length - 1].rate;

    return { tax, layers, effectiveRate, marginalRate, taxableIncome };
  };

  const current = calculateTax(salary);
  const previous = showBeforeAfter ? calculateTax(prevSalary) : null;

  return (
    <div className="mb-16 bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-steel-50 to-sage-50 border-b border-ink-100">
        <h2 className="text-2xl font-serif text-ink-800 mb-2">What happens after a raise?</h2>
        <p className="text-ink-600 mb-6 leading-relaxed">
          Sometimes a raise feels smaller than it looks. People often hear "I moved into the 22% bracket" and assume
          the new rate now applies to all their income. It doesn't. The US uses a progressive system—income is stacked
          into layers, and each layer is taxed at its own rate. Only the portion above the bracket boundary gets the
          new rate. The rest stays where it was.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Your salary:</label>
            <div className="flex gap-3">
              <input
                type="range"
                min="20000"
                max="250000"
                step="1000"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="flex-1"
              />
              <div className="w-32">
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-ink-200 rounded-lg text-sm font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Filing status:</label>
            <div className="flex gap-2">
              {(['single', 'mfj', 'mfs', 'hoh'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilingStatus(status)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    filingStatus === status
                      ? 'bg-steel-600 text-white'
                      : 'bg-steel-100 text-steel-700 hover:bg-steel-200'
                  }`}
                >
                  {status === 'single' && 'Single'}
                  {status === 'mfj' && 'MFJ'}
                  {status === 'mfs' && 'MFS'}
                  {status === 'hoh' && 'HOH'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-lg text-ink-800 mb-4">Tax brackets (stacked)</h3>

            <div className="space-y-2 mb-6">
              {[...current.layers].reverse().map((layer, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-gradient-to-r from-sage-100 to-sage-200 rounded-lg flex items-center justify-center text-xs font-medium text-sage-700">
                    ${Math.round(layer.income).toLocaleString()} @ {Math.round(layer.rate * 100)}%
                  </div>
                  <div className="w-20 text-right font-mono text-sm text-ink-700">
                    ${Math.round(layer.income * layer.rate).toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-8 bg-gradient-to-r from-ink-100 to-ink-200 rounded-lg flex items-center justify-center text-xs font-medium text-ink-500">
                  ${standardDeductions[filingStatus].toLocaleString()} — Standard deduction (0%)
                </div>
                <div className="w-20 text-right font-mono text-sm text-ink-400">$0</div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-1 border-t border-ink-100">
                <span className="text-xs text-ink-500">Total: ${salary.toLocaleString()} = your gross salary</span>
              </div>
            </div>

            <div className="bg-cream-50 rounded-xl p-4 border border-ink-100">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-600">Gross salary:</span>
                  <span className="font-mono font-medium text-ink-800">${salary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-600">Standard deduction:</span>
                  <span className="font-mono text-ink-600">${standardDeductions[filingStatus].toLocaleString()}</span>
                </div>
                <div className="border-t border-ink-200 pt-2 flex justify-between text-sm">
                  <span className="text-ink-600">Taxable income:</span>
                  <span className="font-mono font-medium text-ink-800">${Math.round(current.taxableIncome).toLocaleString()}</span>
                </div>
                <div className="border-t border-ink-200 pt-2 flex justify-between">
                  <span className="font-medium text-ink-800">Federal income tax:</span>
                  <span className="font-mono font-bold text-steel-700">${Math.round(current.tax).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-ink-800 mb-4">Key rates</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-sage-50 rounded-xl p-4 border border-sage-200">
                <div className="text-sm text-sage-600 mb-1">Marginal rate (rate on next dollar)</div>
                <div className="text-3xl font-bold text-sage-700">{Math.round(current.marginalRate * 100)}%</div>
                <div className="text-xs text-sage-600 mt-2">This is the bracket people talk about</div>
              </div>

              <div className="bg-steel-50 rounded-xl p-4 border border-steel-200">
                <div className="text-sm text-steel-600 mb-1">Effective rate (overall burden)</div>
                <div className="text-3xl font-bold text-steel-700">{current.effectiveRate.toFixed(1)}%</div>
                <div className="text-xs text-steel-600 mt-2">Total tax ÷ gross salary</div>
              </div>
            </div>

            <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
              <p className="text-sm text-ink-600 mb-3">
                <span className="font-medium text-sand-700">Why the difference?</span> You don't pay 22% on your entire salary.
                Most of it is in lower brackets. Only the money above the $48,475 threshold is taxed at 22%.
              </p>
            </div>
          </div>
        </div>

        {/* Before/After Toggle */}
        <div className="mt-8 border-t border-ink-100 pt-8">
          <button
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showBeforeAfter
                ? 'bg-sage-600 text-white'
                : 'bg-steel-100 text-steel-700 hover:bg-steel-200'
            }`}
          >
            {showBeforeAfter ? '✓ Before/After enabled' : 'Show me before/after a raise'}
          </button>

          {showBeforeAfter && (
            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-ink-700 mb-2">Before (previous salary):</label>
                <input
                  type="number"
                  value={prevSalary}
                  onChange={(e) => setPrevSalary(Number(e.target.value))}
                  className="px-3 py-2 border border-ink-200 rounded-lg text-sm font-mono w-40"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-steel-50 rounded-xl p-5 border border-steel-200">
                  <h4 className="font-medium text-ink-800 mb-3">Before: ${prevSalary.toLocaleString()}</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      {[...calculateTax(prevSalary).layers].reverse().map((layer, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="flex-1 h-6 bg-gradient-to-r from-steel-100 to-steel-200 rounded flex items-center justify-center font-medium text-steel-700">
                            ${Math.round(layer.income).toLocaleString()} @ {Math.round(layer.rate * 100)}%
                          </div>
                          <div className="w-16 text-right font-mono text-ink-600">
                            ${Math.round(layer.income * layer.rate).toLocaleString()}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex-1 h-6 bg-ink-100 rounded flex items-center justify-center font-medium text-ink-500">
                          ${standardDeductions[filingStatus].toLocaleString()} — Std deduction (0%)
                        </div>
                        <div className="w-16 text-right font-mono text-ink-400">$0</div>
                      </div>
                      <div className="pt-0.5 text-right">
                        <span className="text-xs text-ink-400">Total: ${prevSalary.toLocaleString()} = gross salary</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-steel-300 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-600">Taxable income:</span>
                        <span className="font-mono">${Math.round(calculateTax(prevSalary).taxableIncome).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-600">Federal tax:</span>
                        <span className="font-mono font-bold text-steel-700">${Math.round(calculateTax(prevSalary).tax).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-sage-50 rounded-xl p-5 border border-sage-200">
                  <h4 className="font-medium text-ink-800 mb-3">After: ${salary.toLocaleString()}</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      {[...current.layers].reverse().map((layer, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="flex-1 h-6 bg-gradient-to-r from-sage-100 to-sage-200 rounded flex items-center justify-center font-medium text-sage-700">
                            ${Math.round(layer.income).toLocaleString()} @ {Math.round(layer.rate * 100)}%
                          </div>
                          <div className="w-16 text-right font-mono text-ink-600">
                            ${Math.round(layer.income * layer.rate).toLocaleString()}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex-1 h-6 bg-ink-100 rounded flex items-center justify-center font-medium text-ink-500">
                          ${standardDeductions[filingStatus].toLocaleString()} — Std deduction (0%)
                        </div>
                        <div className="w-16 text-right font-mono text-ink-400">$0</div>
                      </div>
                      <div className="pt-0.5 text-right">
                        <span className="text-xs text-ink-400">Total: ${salary.toLocaleString()} = gross salary</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-sage-300 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-600">Taxable income:</span>
                        <span className="font-mono">${Math.round(current.taxableIncome).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-600">Federal tax:</span>
                        <span className="font-mono font-bold text-sage-700">${Math.round(current.tax).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-steel-50 to-sage-50 rounded-xl p-6 border border-ink-200">
                <h4 className="font-medium text-ink-800 mb-4">What changed</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-600">Salary increase:</span>
                    <span className="font-mono font-bold text-sage-700">+${(salary - prevSalary).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">Additional federal tax:</span>
                    <span className="font-mono text-red-600">+${Math.round(current.tax - calculateTax(prevSalary).tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">Estimated take-home increase:</span>
                    <span className="font-mono font-bold text-sage-700">+${Math.round((salary - prevSalary) - (current.tax - calculateTax(prevSalary).tax)).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-ink-200">
                  <p className="text-xs text-ink-500 italic">
                    Your raise kept ~{Math.round(((salary - prevSalary) - (current.tax - calculateTax(prevSalary).tax)) / (salary - prevSalary) * 100)}% of itself after federal income tax.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-sand-50 border-t border-sand-100">
        <p className="text-xs text-ink-600">
          <strong className="text-sand-700">Disclaimer:</strong> This shows federal income tax only for 2025 tax year estimates.
          It excludes FICA (7.65%), state tax, pre-tax deductions, and credits. Your actual take-home will be lower.
        </p>
      </div>
    </div>
  );
}


function InsightBox({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="mt-12 bg-sage-50 border border-sage-200 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-ink-800 mb-2">{title}</h3>
          <p className="text-ink-600 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
