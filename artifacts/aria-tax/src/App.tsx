import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  return (
    <div className="flex items-center gap-1 ml-2 pl-2 border-l border-ink-200">
      <button
        onClick={() => i18n.changeLanguage(isEn ? 'ru' : 'en')}
        className="focus-ring rounded-lg px-2 py-1 text-xs flex items-center gap-1 transition-colors"
        title="Switch language / Сменить язык"
      >
        <span className={isEn ? 'font-bold text-ink-700' : 'text-ink-400 hover:text-ink-600'}>EN</span>
        <span className="text-ink-300 mx-0.5">|</span>
        <span className={!isEn ? 'font-bold text-ink-700' : 'text-ink-400 hover:text-ink-600'}>RU</span>
      </button>
    </div>
  );
}

function App() {
  const [view, setView] = useState<ViewState>('entry');
  const [reducedMotion, setReducedMotion] = useState(false);
  const { t } = useTranslation();

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
          <div className="flex items-center gap-1 -ml-2">
            <a
              href="https://ariataxpa.com"
              target="_self"
              rel="noopener"
              className="focus-ring rounded-lg p-2 group flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif text-sm font-bold">A</span>
              </div>
              <span className="text-ink-700 font-serif text-lg hidden sm:block">Aria Tax Services</span>
            </a>
            <button
              onClick={() => navigate('entry')}
              className="focus-ring rounded-lg px-2 py-1 text-xs text-ink-400 hover:text-ink-600 transition-colors hidden sm:block"
              title={t('nav.guideTitle')}
            >
              {t('nav.guide')}
            </button>
          </div>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate('form1099Tree')}
              className="focus-ring rounded-lg text-sm text-ink-500 hover:text-ink-700 px-3 py-2 transition-colors"
            >
              {t('nav.family1099')}
            </button>
            <button
              onClick={() => navigate('scheduleC')}
              className="focus-ring rounded-lg text-sm text-ink-500 hover:text-ink-700 px-3 py-2 transition-colors"
            >
              {t('nav.scheduleC')}
            </button>
            <button
              onClick={() => navigate('comparison')}
              className="focus-ring rounded-lg text-sm text-ink-500 hover:text-ink-700 px-3 py-2 transition-colors"
            >
              {t('nav.compare')}
            </button>
            <LanguageToggle />
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
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-3">
          <p className="text-center text-sm text-ink-400 max-w-xl mx-auto">
            {t('footer.disclaimer')}
          </p>
          <p className="text-center text-xs text-ink-400">
            <a href="https://ariataxpa.com" target="_self" rel="noopener" className="hover:text-ink-600 transition-colors underline-offset-2 hover:underline">
              {t('footer.about')}
            </a>
            <span className="mx-2 text-ink-300">|</span>
            <a href="https://ariataxpa.com" target="_self" rel="noopener" className="hover:text-ink-600 transition-colors underline-offset-2 hover:underline">
              {t('footer.contact')}
            </a>
          </p>
          <p className="text-center text-xs text-ink-300">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  );
}

function EntryScreen({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink-900 mb-6">
          {t('entry.header')}
        </h1>
        <p className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed">
          {t('entry.subhead')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        <IncomeCard
          icon={<Briefcase className="w-8 h-8" />}
          title={t('entry.cards.w2.title')}
          description={t('entry.cards.w2.subtitle')}
          onClick={() => onNavigate('w2')}
        />
        <IncomeCard
          icon={<PenTool className="w-8 h-8" />}
          title={t('entry.cards.freelance.title')}
          description={t('entry.cards.freelance.subtitle')}
          onClick={() => onNavigate('freelance')}
        />
        <IncomeCard
          icon={<Layers className="w-8 h-8" />}
          title={t('entry.cards.mixed.title')}
          description={t('entry.cards.mixed.subtitle')}
          onClick={() => onNavigate('mixed')}
        />
        <IncomeCard
          icon={<TrendingUp className="w-8 h-8" />}
          title={t('entry.cards.investment.title')}
          description={t('entry.cards.investment.subtitle')}
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
  const { t } = useTranslation();
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
        {t('common.explorePath')}
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="focus-ring rounded-lg inline-flex items-center text-ink-500 hover:text-ink-700 mb-8 transition-colors group"
    >
      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      {t('common.backToStart')}
    </button>
  );
}

function W2Roadmap({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-steel-600 mb-4 bg-steel-50 px-4 py-2 rounded-full">
          <Briefcase className="w-4 h-4" />
          {t('pathA.badge')}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          {t('pathA.header')}
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed mb-4">
          {t('pathA.intro')}
        </p>
        <p className="text-base text-ink-500 leading-relaxed italic">
          {t('pathA.introItalic')}
        </p>
      </div>

      {/* Common Confusion Sidebar */}
      <div className="mb-12 bg-gradient-to-br from-sand-50 to-cream-50 rounded-xl border border-sand-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sand-200 text-sand-700 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-ink-800 mb-2">{t('pathA.confusion.title')}</h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              {t('pathA.confusion.body')} <span className="font-medium text-sand-700">{t('pathA.confusion.overpaid')}</span> {t('pathA.confusion.bodyEnd')}
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
            title={t('pathA.flow.employer.title')}
            description={t('pathA.flow.employer.desc')}
            color="steel"
          />

          <FlowConnector />

          {/* Paycheck */}
          <FlowNode
            icon={<Wallet className="w-6 h-6" />}
            title={t('pathA.flow.paycheck.title')}
            description={t('pathA.flow.paycheck.desc')}
            color="sage"
            detail={t('pathA.flow.paycheck.detail')}
          >
            <div className="mt-4 p-4 bg-sage-50 rounded-lg border border-sage-200">
              <div className="text-sm text-ink-500 mb-3">{t('pathA.flow.paycheck.paystub')}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-500">{t('pathA.flow.paycheck.grossPay')}</span>
                  <span className="font-mono text-ink-700">{t('pathA.flow.paycheck.grossPayValue')}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="text-ink-500">{t('pathA.flow.paycheck.preTaxDeductions')}</span>
                  <span className="font-mono">{t('pathA.flow.paycheck.preTaxValue')}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="text-ink-500">{t('pathA.flow.paycheck.taxWithholdings')}</span>
                  <span className="font-mono">{t('pathA.flow.paycheck.taxWithholdingsValue')}</span>
                </div>
                <div className="border-t border-sage-200 pt-2 mt-2 flex justify-between">
                  <span className="font-medium text-ink-700">{t('pathA.flow.paycheck.netPay')}</span>
                  <span className="font-mono font-medium text-sage-700">{t('pathA.flow.paycheck.netPayValue')}</span>
                </div>
              </div>
            </div>
          </FlowNode>

          <FlowConnector />

          {/* W-2 Form */}
          <FlowNode
            icon={<FileText className="w-6 h-6" />}
            title={t('pathA.flow.w2Form.title')}
            description={t('pathA.flow.w2Form.desc')}
            color="sand"
          >
            <FormW2Anatomy />
          </FlowNode>

          <FlowConnector />

          {/* Form 1040 */}
          <FlowNode
            icon={<ArrowDown className="w-6 h-6" />}
            title={t('pathA.flow.form1040.title')}
            description={t('pathA.flow.form1040.desc')}
            color="steel"
          >
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-steel-50 rounded-lg text-sm text-steel-700 border border-steel-200">
                <X className="w-4 h-4" /> {t('pathA.flow.form1040.noScheduleC')}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-steel-50 rounded-lg text-sm text-steel-700 border border-steel-200">
                <X className="w-4 h-4" /> {t('pathA.flow.form1040.noScheduleSE')}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-steel-50 rounded-lg text-sm text-steel-700 border border-steel-200">
                <X className="w-4 h-4" /> {t('pathA.flow.form1040.noEstimated')}
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
              <h3 className="text-xl font-serif text-ink-800 mb-2">{t('pathA.flow.reconciliation.title')}</h3>
              <p className="text-sm text-ink-500">{t('pathA.flow.reconciliation.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-sage-200 text-center">
                <div className="text-sage-600 font-medium mb-1">{t('pathA.flow.reconciliation.refund')}</div>
                <div className="text-sm text-ink-500">{t('pathA.flow.reconciliation.refundDesc')}</div>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-sand-200 text-center">
                <div className="text-sand-700 font-medium mb-1">{t('pathA.flow.reconciliation.balanceDue')}</div>
                <div className="text-sm text-ink-500">{t('pathA.flow.reconciliation.balanceDueDesc')}</div>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-steel-200 text-center">
                <div className="text-steel-600 font-medium mb-1">{t('pathA.flow.reconciliation.even')}</div>
                <div className="text-sm text-ink-500">{t('pathA.flow.reconciliation.evenDesc')}</div>
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
            <h3 className="font-medium text-ink-800 mb-2">{t('pathA.complicated.title')}</h3>
            <p className="text-sm text-ink-600 leading-relaxed mb-3">
              {t('pathA.complicated.body')}
            </p>
            <button
              onClick={() => onNavigate('mixed')}
              className="text-link text-sm font-medium"
            >
              {t('pathA.complicated.link')}
            </button>
          </div>
        </div>
      </div>

      <InsightBox
        title={t('pathA.insight.title')}
        content={t('pathA.insight.content')}
      />

      <div className="mt-12 p-6 bg-sand-50 rounded-2xl border border-sand-200">
        <p className="text-ink-600 mb-4">
          {t('pathA.compare.prompt')}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('freelance')}
            className="text-link px-4 py-2 rounded-lg focus-ring"
          >
            {t('pathA.compare.freelanceLink')}
          </button>
          <button
            onClick={() => onNavigate('comparison')}
            className="text-link px-4 py-2 rounded-lg focus-ring"
          >
            {t('pathA.compare.compareLink')}
          </button>
        </div>
      </div>
    </div>
  );
}

function FreelanceRoadmap({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <BackButton onClick={() => onNavigate('entry')} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-sage-600 mb-4 bg-sage-50 px-4 py-2 rounded-full">
          <PenTool className="w-4 h-4" />
          {t('pathB.badge')}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 mb-6">
          {t('pathB.header')}
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          {t('pathB.intro')}
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          {/* Payment Source */}
          <FlowNode
            icon={<User className="w-6 h-6" />}
            title={t('pathB.flow.client.title')}
            description={t('pathB.flow.client.desc')}
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
                <h3 className="text-xl font-serif text-ink-800 mb-1">{t('pathB.flow.directPayment.title')}</h3>
                <p className="text-ink-500 mb-3">{t('pathB.flow.directPayment.desc')}</p>
                <p className="text-sm text-sage-600 italic">{t('pathB.flow.directPayment.noWithholding')}</p>
              </div>
            </div>
          </div>

          {/* Key Insight Before Flow */}
          <div className="p-6 bg-ink-50 border-t border-ink-100">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-sm text-ink-600 leading-relaxed">
                {t('pathB.flow.keyInsight')}
              </p>
            </div>
          </div>

          <FlowConnector />

          {/* 1099 Forms */}
          <FlowNode
            icon={<FileText className="w-6 h-6" />}
            title={t('pathB.flow.forms.title')}
            description={t('pathB.flow.forms.desc')}
            color="sand"
          >
            <div className="mt-4 space-y-3">
              <div className="mb-4">
                <p className="text-xs text-ink-500 italic mb-3">{t('pathB.flow.forms.notAllNote')}</p>
                <div className="text-sm font-medium text-ink-700 mb-2">{t('pathB.flow.forms.necLabel')}</div>
                <p className="text-xs text-ink-500 mb-3">{t('pathB.flow.forms.necDesc')}</p>
                <Form1099NECAnatomy />
              </div>
              <div className="mb-4">
                <div className="text-sm font-medium text-ink-700 mb-2">{t('pathB.flow.forms.kLabel')}</div>
                <p className="text-xs text-ink-500 mb-1">{t('pathB.flow.forms.kDesc')}</p>
                <p className="text-xs text-sand-700 italic mb-3">{t('pathB.flow.forms.kNote')}</p>
                <Form1099KAnatomy />
              </div>
              <div className="flex items-start gap-3 p-3 bg-ink-50 rounded-lg border border-ink-200">
                <span className="font-mono text-sm font-medium text-ink-500">{t('pathB.flow.forms.nothing')}</span>
                <div className="text-sm text-ink-600">
                  <span className="font-medium">{t('pathB.flow.forms.stillReport')}</span> {t('pathB.flow.forms.stillReportDesc')}
                </div>
              </div>
            </div>
          </FlowNode>

          <FlowConnector />

          {/* Schedule C */}
          <FlowNode
            icon={<Receipt className="w-6 h-6" />}
            title={t('pathB.flow.scheduleC.title')}
            description={t('pathB.flow.scheduleC.desc')}
            color="sage"
          >
            <ScheduleCAnatomy />
          </FlowNode>

          <FlowConnector />

          {/* Flow to 1040 */}
          <FlowNode
            icon={<ArrowDown className="w-6 h-6" />}
            title={t('pathB.flow.schedule1.title')}
            description={t('pathB.flow.schedule1.desc')}
            color="steel"
          />

          <FlowConnector />

          {/* Two Taxes */}
          <div className="p-8 border-t border-ink-100 bg-gradient-to-br from-sage-50 to-sand-50">
            <div className="text-center mb-6">
              <h3 className="text-lg font-serif text-ink-800 mb-2">{t('pathB.flow.twoTaxes.title')}</h3>
              <p className="text-sm text-ink-500">{t('pathB.flow.twoTaxes.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-sage-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-600 flex items-center justify-center">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-ink-800">{t('pathB.flow.twoTaxes.incomeTax')}</div>
                    <div className="text-sm text-ink-500">{t('pathB.flow.twoTaxes.incomeTaxSub')}</div>
                  </div>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed">
                  {t('pathB.flow.twoTaxes.incomeTaxBody')}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-sand-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sand-100 text-sand-700 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-ink-800">{t('pathB.flow.twoTaxes.seTax')}</div>
                    <div className="text-sm text-sand-600 font-medium">{t('pathB.flow.twoTaxes.seTaxRate')}</div>
                  </div>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed mb-3">
                  {t('pathB.flow.twoTaxes.seTaxBody')}
                </p>
                <FormScheduleSEAnatomy />
              </div>
            </div>
          </div>

          <FlowConnector />

          {/* Quarterly Payments */}
          <FlowNode
            icon={<Clock className="w-6 h-6" />}
            title={t('pathB.flow.quarterly.title')}
            description={t('pathB.flow.quarterly.desc')}
            color="sand"
            highlight
          >
            <QuarterlyPaymentsDetail />
          </FlowNode>
        </div>
      </div>

      {/* Common Confusions */}
      <div className="mb-12">
        <h2 className="text-xl font-serif text-ink-800 mb-6">{t('pathB.questions.header')}</h2>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-ink-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-sand-100 text-sand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-ink-800 mb-2">
                  {t('pathB.questions.q1.title')}
                </h3>
                <p className="text-ink-600 mb-3">
                  <span className="font-medium text-sage-700">{t('pathB.questions.q1.yes')}</span> {t('pathB.questions.q1.yesDetail')}
                </p>
                <p className="text-sm text-ink-500">
                  {t('pathB.questions.q1.note')}
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
                  {t('pathB.questions.q2.title')}
                </h3>
                <p className="text-ink-600 mb-3">
                  <span className="font-medium text-sage-700">{t('pathB.questions.q2.notAlways')}</span> {t('pathB.questions.q2.notAlwaysDetail')}
                </p>
                <button
                  onClick={() => onNavigate('form1099Tree')}
                  className="text-link text-sm"
                >
                  {t('pathB.questions.q2.link')}
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
            <h3 className="text-lg font-serif text-ink-800 mb-3">{t('pathB.quietBridge.title')}</h3>
            <p className="text-ink-600 leading-relaxed mb-4">
              {t('pathB.quietBridge.body')}
            </p>
            <button
              onClick={() => onNavigate('scheduleC')}
              className="text-link text-sm"
            >
              {t('pathB.quietBridge.link')}
            </button>
          </div>
        </div>
      </div>

      <InsightBox
        title={t('pathB.insight.title')}
        content={t('pathB.insight.content')}
      />

      <div className="mt-12 p-6 bg-steel-50 rounded-2xl border border-steel-200">
        <p className="text-ink-600 mb-4">
          {t('pathB.explore1099.prompt')}
        </p>
        <button
          onClick={() => onNavigate('form1099Tree')}
          className="text-link px-4 py-2 rounded-lg focus-ring"
        >
          {t('pathB.explore1099.link')}
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
                  <div className="text-sm text-ink-500">Generally issued by January 31</div>
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
          Investment &amp; retirement income has its own forms
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
              <p className="text-sm text-ink-500">Usually no Schedule C</p>
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
                These forms report investment and account income—money from accounts, not from your work.
                No self-employment tax. No quarterly payments needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <InsightBox
        title="The important distinction"
        content="These 1099s report investment and account income—interest, dividends, capital gains, retirement. They are NOT the same as 1099-NEC which reports self-employment income. Different forms. Different lines on your return. Different tax treatment."
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
                  <div key={form.id}>
                    <button
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
                    {selectedForm === form.id && (
                      <div className="lg:hidden mt-2 bg-white rounded-2xl border border-ink-100 p-5 animate-fade-in">
                        <h3 className="font-mono text-xs text-ink-500 mb-1">{form.name}</h3>
                        <h2 className="text-xl font-serif text-ink-800 mb-3">{form.fullName}</h2>
                        <p className="text-ink-600 mb-4">{form.description}</p>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-ink-500 mb-1">Where it lands</h4>
                            <p className="text-ink-700">{form.landingSpot}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-ink-500 mb-1">Tax notes</h4>
                            <p className="text-ink-700">{form.taxNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
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
        content="'I got a 1099, so I'm self-employed.' Not necessarily. 1099-INT, 1099-DIV, 1099-B, and 1099-R report investment and account income—not self-employment. Only certain 1099s connect to Schedule C."
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
  const { t } = useTranslation();
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
          {t('comparison.header')}
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          {t('comparison.intro')}
        </p>
      </div>

      {/* Three-Column Comparison */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <ThreeWayColumn
          title={t('comparison.columns.employed.title')}
          subtitle="W-2"
          gross={employed.gross}
          rows={[
            { label: t('comparison.rows.grossSalary'), amount: employed.gross, isBold: true },
            { label: t('comparison.rows.preTaxBenefits'), amount: -employed.preTaxBenefits, note: t('comparison.rows.preTaxBenefitsNote') },
            { label: t('comparison.rows.ssEmployeeHalf'), amount: -employed.socialSecurityYourHalf },
            { label: t('comparison.rows.medicareEmployeeHalf'), amount: -employed.medicareYourHalf },
            { label: t('comparison.rows.federalIncomeTax'), amount: -employed.federalIncomeTax, note: t('comparison.rows.federalNote') },
            { label: t('comparison.rows.stateIncomeTax'), amount: -employed.stateIncomeTax, note: t('comparison.rows.stateNote') },
          ]}
          takeHome={employed.takeHome}
          savedAmount={employed.preTaxBenefits}
          savedLabel={t('comparison.columns.employed.savedLabel')}
          icon={<Briefcase className="w-6 h-6" />}
          color="steel"
          notes={t('comparison.columns.employed.notes')}
          structure={t('comparison.columns.employed.structure', { returnObjects: true }) as string[]}
        />

        <ThreeWayColumn
          title={t('comparison.columns.contracted.title')}
          subtitle="1099-NEC → Schedule C"
          gross={contracted.gross}
          rows={[
            { label: t('comparison.rows.grossReceipts'), amount: contracted.gross, isBold: true },
            { label: t('comparison.rows.businessExpenses'), amount: -contracted.businessExpenses, note: t('comparison.rows.businessExpensesNote1') },
            { label: t('comparison.rows.netProfit'), amount: contracted.netProfit, isBold: true },
            { label: t('comparison.rows.seTax'), amount: -contracted.seTaxAmount, note: t('comparison.rows.seTaxNote') },
            { label: t('comparison.rows.federalIncomeTax'), amount: -contracted.federalIncomeTax, note: t('comparison.rows.federalNote') },
            { label: t('comparison.rows.stateIncomeTax'), amount: -contracted.stateIncomeTax, note: t('comparison.rows.stateNote') },
          ]}
          takeHome={contracted.takeHome}
          savedAmount={contracted.businessExpenses}
          savedLabel={t('comparison.columns.contracted.savedLabel')}
          icon={<PenTool className="w-6 h-6" />}
          color="sage"
          notes={t('comparison.columns.contracted.notes')}
          structure={t('comparison.columns.contracted.structure', { returnObjects: true }) as string[]}
        />

        <ThreeWayColumn
          title={t('comparison.columns.solo.title')}
          subtitle="Sometimes 1099, sometimes direct → Schedule C"
          gross={soloOwner.gross}
          rows={[
            { label: t('comparison.rows.grossRevenue'), amount: soloOwner.gross, isBold: true },
            { label: t('comparison.rows.businessExpenses'), amount: -soloOwner.businessExpenses, note: t('comparison.rows.businessExpensesNote2') },
            { label: t('comparison.rows.netProfit'), amount: soloOwner.netProfit, isBold: true },
            { label: t('comparison.rows.seTax'), amount: -soloOwner.seTaxAmount, note: t('comparison.rows.seTaxNote') },
            { label: t('comparison.rows.federalIncomeTax'), amount: -soloOwner.federalIncomeTax, note: t('comparison.rows.federalNote') },
            { label: t('comparison.rows.stateIncomeTax'), amount: -soloOwner.stateIncomeTax, note: t('comparison.rows.stateNote') },
          ]}
          takeHome={soloOwner.takeHome}
          savedAmount={soloOwner.businessExpenses}
          savedLabel={t('comparison.columns.solo.savedLabel')}
          icon={<Receipt className="w-6 h-6" />}
          color="sand"
          notes={t('comparison.columns.solo.notes')}
          structure={t('comparison.columns.solo.structure', { returnObjects: true }) as string[]}
        />
      </div>

      {/* What the Structure Provides */}
      <div className="bg-gradient-to-br from-cream-50 to-white rounded-2xl border border-ink-100 p-8 mb-12">
        <h2 className="text-2xl font-serif text-ink-800 mb-8 text-center">{t('comparison.whatStructureProvides')}</h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-steel-200">
            <h3 className="font-serif text-lg text-steel-700 mb-4">{t('comparison.employedLabel')}</h3>
            <ul className="space-y-3 text-sm text-ink-600">
              {(t('comparison.whatProvides.employed', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-steel-600 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sage-200">
            <h3 className="font-serif text-lg text-sage-700 mb-4">{t('comparison.contractedLabel')}</h3>
            <ul className="space-y-3 text-sm text-ink-600">
              {(t('comparison.whatProvides.contracted', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sage-600 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sand-200">
            <h3 className="font-serif text-lg text-sand-700 mb-4">{t('comparison.soloLabel')}</h3>
            <ul className="space-y-3 text-sm text-ink-600">
              {(t('comparison.whatProvides.solo', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sand-600 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-br from-sage-50 to-cream-50 rounded-2xl border-2 border-sage-200 p-8 mb-12">
        <h3 className="text-xl font-serif text-ink-800 mb-4">{t('comparison.realDifference.title')}</h3>
        <p className="text-ink-600 leading-relaxed mb-4">
          {t('comparison.realDifference.body1')} <span className="font-medium text-sage-700">{t('comparison.realDifference.expenseProfile')}</span>{t('comparison.realDifference.body1end')}
        </p>
        <p className="text-ink-600 leading-relaxed">
          {t('comparison.realDifference.body2')}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-white rounded-2xl border border-ink-100 p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-ink-600 mb-4">
            <strong className="text-ink-800">{t('comparison.disclaimer.label')}</strong> {t('comparison.disclaimer.body1')}
          </p>
          <p className="text-sm text-ink-600">
            {t('comparison.disclaimer.body2')}
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

// Quarterly Payments Detail — expandable self-contained component
function QuarterlyPaymentsDetail() {
  const [showSafeHarbor, setShowSafeHarbor] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="mt-4 space-y-4">
      {/* Level 1 — The threshold */}
      <div className="p-4 bg-sand-50 rounded-lg border border-sand-200">
        <div className="text-sm font-semibold text-sand-700 mb-2">{t('quarterly.thresholdTitle')}</div>
        <p className="text-sm text-ink-700 leading-relaxed">
          {t('quarterly.thresholdBody')}
        </p>
        <p className="text-sm text-ink-600 mt-2 leading-relaxed">
          {t('quarterly.thresholdNote')}
        </p>
      </div>

      {/* Quarterly deadlines grid */}
      <div className="p-4 bg-sand-50 rounded-lg border border-sand-200">
        <div className="text-center mb-3">
          <span className="text-sm font-medium text-sand-700">{t('quarterly.deadlinesTitle')}</span>
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
            <div className="font-medium text-ink-700">Jan 15 (following year)</div>
          </div>
        </div>
      </div>

      {/* Level 2 — Safe harbor (expandable) */}
      <div className="rounded-lg border border-sand-200 overflow-hidden">
        <button
          onClick={() => setShowSafeHarbor(!showSafeHarbor)}
          className="w-full flex items-center justify-between px-4 py-3 bg-sand-50 hover:bg-sand-100 transition-colors text-left"
        >
          <span className="text-sm font-medium text-sand-800">{t('quarterly.safeHarborTitle')}</span>
          <ChevronDown className={`w-4 h-4 text-sand-600 transition-transform duration-200 ${showSafeHarbor ? 'rotate-180' : ''}`} />
        </button>
        {showSafeHarbor && (
          <div className="px-4 py-4 bg-white border-t border-sand-200 space-y-3">
            <p className="text-sm text-ink-700 leading-relaxed">
              {t('quarterly.safeHarborIntro')}
            </p>
            <ul className="space-y-2 text-sm text-ink-700">
              <li className="flex items-start gap-2">
                <span className="text-sand-500 font-bold flex-shrink-0 mt-0.5">•</span>
                <span><span className="font-semibold">{t('quarterly.safeHarbor90')}</span>{t('quarterly.safeHarborOr')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sand-500 font-bold flex-shrink-0 mt-0.5">•</span>
                <span>
                  <span className="font-semibold">{t('quarterly.safeHarbor100')}</span>{' '}
                  <span className="text-ink-500">{t('quarterly.safeHarborNote')}</span>
                </span>
              </li>
            </ul>
            <p className="text-sm text-ink-500 italic">{t('quarterly.safeHarborSmaller')}</p>
            <p className="text-sm text-ink-600 leading-relaxed pt-1 border-t border-sand-100">
              {t('quarterly.safeHarborW2Note')}
            </p>
          </div>
        )}
      </div>

      {/* Level 3 — Common confusion callout */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="text-sm font-semibold text-amber-800 mb-2">{t('quarterly.confusionTitle')}</div>
        <p className="text-sm text-ink-600 italic mb-2 leading-relaxed">
          {t('quarterly.confusionQ')}
        </p>
        <p className="text-sm text-ink-700 leading-relaxed">
          {t('quarterly.confusionA')}{' '}
          <span className="font-semibold">{t('quarterly.afterWithholding')}</span>{t('quarterly.confusionAEnd')}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-ink-400 italic leading-relaxed">
        {t('quarterly.disclaimer')}
      </p>
    </div>
  );
}

// Schedule C Anatomy — section-grouped interactive component
function ScheduleCAnatomy() {
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const { t } = useTranslation();

  const sections: Array<{
    name: string;
    items: Array<{ line: string; label: string; value: string; desc: string; where: string }>;
  }> = [
    {
      name: t('anatomy.scheduleC.partI'),
      items: [
        {
          line: 'Line 1',
          label: t('anatomy.scheduleC.line1.label'),
          value: '$42,500',
          desc: t('anatomy.scheduleC.line1.desc'),
          where: t('anatomy.scheduleC.line1.where'),
        },
        {
          line: 'Line 7',
          label: t('anatomy.scheduleC.line7.label'),
          value: '$42,500',
          desc: t('anatomy.scheduleC.line7.desc'),
          where: t('anatomy.scheduleC.line7.where'),
        },
      ],
    },
    {
      name: t('anatomy.scheduleC.partII'),
      items: [
        {
          line: 'Line 8',
          label: t('anatomy.scheduleC.line8.label'),
          value: '$600',
          desc: t('anatomy.scheduleC.line8.desc'),
          where: t('anatomy.scheduleC.line8.where'),
        },
        {
          line: 'Line 18',
          label: t('anatomy.scheduleC.line18.label'),
          value: '$840',
          desc: t('anatomy.scheduleC.line18.desc'),
          where: t('anatomy.scheduleC.line18.where'),
        },
        {
          line: 'Line 22',
          label: t('anatomy.scheduleC.line22.label'),
          value: '$1,200',
          desc: t('anatomy.scheduleC.line22.desc'),
          where: t('anatomy.scheduleC.line22.where'),
        },
        {
          line: 'Line 25',
          label: t('anatomy.scheduleC.line25.label'),
          value: '$480',
          desc: t('anatomy.scheduleC.line25.desc'),
          where: t('anatomy.scheduleC.line25.where'),
        },
        {
          line: 'Line 27a',
          label: t('anatomy.scheduleC.line27a.label'),
          value: '$920',
          desc: t('anatomy.scheduleC.line27a.desc'),
          where: t('anatomy.scheduleC.line27a.where'),
        },
      ],
    },
    {
      name: t('anatomy.scheduleC.partIIBottom'),
      items: [
        {
          line: 'Line 28',
          label: t('anatomy.scheduleC.line28.label'),
          value: '$4,040',
          desc: t('anatomy.scheduleC.line28.desc'),
          where: t('anatomy.scheduleC.line28.where'),
        },
        {
          line: 'Line 31',
          label: t('anatomy.scheduleC.line31.label'),
          value: '$38,460',
          desc: t('anatomy.scheduleC.line31.desc'),
          where: t('anatomy.scheduleC.line31.where'),
        },
      ],
    },
  ];

  const allItems = sections.flatMap(s => s.items);
  const activeTipData = activeTip ? allItems.find(i => i.line === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">{t('anatomy.scheduleC.hoverPrompt')}</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sage-200 overflow-hidden mb-4">
        <div className="bg-sage-50 px-4 py-3 border-b border-sage-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">{t('anatomy.scheduleC.formTitle')}</span>
          <span className="text-xs text-ink-400">{t('anatomy.scheduleC.filedWith')}</span>
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
          <p className="text-sm text-ink-400 italic text-center py-4">{t('anatomy.hoverCtaLine')}</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sage-600 uppercase tracking-wide">
              {activeTipData.line} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sage-200">
              <div className="text-xs font-medium text-sage-700 uppercase tracking-wide mb-1">{t('anatomy.whereItLands')}</div>
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
  const { t } = useTranslation();

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1',
      label: t('anatomy.w2.box1.label'),
      value: '$52,400.00',
      desc: t('anatomy.w2.box1.desc'),
      where: t('anatomy.w2.box1.where'),
    },
    {
      box: 'Box 2',
      label: t('anatomy.w2.box2.label'),
      value: '$5,234.00',
      desc: t('anatomy.w2.box2.desc'),
      where: t('anatomy.w2.box2.where'),
    },
    {
      box: 'Box 3',
      label: t('anatomy.w2.box3.label'),
      value: '$54,000.00',
      desc: t('anatomy.w2.box3.desc'),
      where: t('anatomy.w2.box3.where'),
    },
    {
      box: 'Box 4',
      label: t('anatomy.w2.box4.label'),
      value: '$3,348.00',
      desc: t('anatomy.w2.box4.desc'),
      where: t('anatomy.w2.box4.where'),
    },
    {
      box: 'Box 5',
      label: t('anatomy.w2.box5.label'),
      value: '$54,000.00',
      desc: t('anatomy.w2.box5.desc'),
      where: t('anatomy.w2.box5.where'),
    },
    {
      box: 'Box 6',
      label: t('anatomy.w2.box6.label'),
      value: '$783.00',
      desc: t('anatomy.w2.box6.desc'),
      where: t('anatomy.w2.box6.where'),
    },
    {
      box: 'Box 17',
      label: t('anatomy.w2.box17.label'),
      value: '$1,623.00',
      desc: t('anatomy.w2.box17.desc'),
      where: t('anatomy.w2.box17.where'),
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">{t('anatomy.hoverPromptReturn')}</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">{t('anatomy.w2.formTitle')}</span>
          <span className="text-xs text-ink-400">{t('anatomy.w2.arrivesBy')}</span>
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
          <p className="text-sm text-ink-400 italic text-center py-4">{t('anatomy.hoverCta')}</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">{t('anatomy.whereItLands')}</div>
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
  const { t } = useTranslation();

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1',
      label: t('anatomy.1099nec.box1.label'),
      value: '$8,750.00',
      desc: t('anatomy.1099nec.box1.desc'),
      where: t('anatomy.1099nec.box1.where'),
    },
    {
      box: 'Box 4',
      label: t('anatomy.1099nec.box4.label'),
      value: '$0.00',
      desc: t('anatomy.1099nec.box4.desc'),
      where: t('anatomy.1099nec.box4.where'),
    },
    {
      box: 'Box 5',
      label: t('anatomy.1099nec.box5.label'),
      value: '$0.00',
      desc: t('anatomy.1099nec.box5.desc'),
      where: t('anatomy.1099nec.box5.where'),
    },
    {
      box: 'Box 6',
      label: t('anatomy.1099nec.box6.label'),
      value: 'FL / —',
      desc: t('anatomy.1099nec.box6.desc'),
      where: t('anatomy.1099nec.box6.where'),
    },
    {
      box: 'Box 7',
      label: t('anatomy.1099nec.box7.label'),
      value: '$8,750.00',
      desc: t('anatomy.1099nec.box7.desc'),
      where: t('anatomy.1099nec.box7.where'),
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">{t('anatomy.hoverPrompt')}</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sage-200 overflow-hidden mb-4">
        <div className="bg-sage-50 px-4 py-3 border-b border-sage-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">{t('anatomy.1099nec.formTitle')}</span>
          <span className="text-xs text-ink-400">{t('anatomy.1099nec.arrivesBy')}</span>
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
          <p className="text-sm text-ink-400 italic text-center py-4">{t('anatomy.hoverCta')}</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sage-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sage-200">
              <div className="text-xs font-medium text-sage-700 uppercase tracking-wide mb-1">{t('anatomy.whereItLands')}</div>
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
  const { t } = useTranslation();

  const boxes: FormBoxData[] = [
    {
      box: 'Box 1a',
      label: t('anatomy.1099k.box1a.label'),
      value: '$24,300.00',
      desc: t('anatomy.1099k.box1a.desc'),
      where: t('anatomy.1099k.box1a.where'),
    },
    {
      box: 'Box 4',
      label: t('anatomy.1099k.box4.label'),
      value: '$0.00',
      desc: t('anatomy.1099k.box4.desc'),
      where: t('anatomy.1099k.box4.where'),
    },
    {
      box: 'Box 5a',
      label: t('anatomy.1099k.box5a.label'),
      value: '$1,840.00',
      desc: t('anatomy.1099k.box5a.desc'),
      where: t('anatomy.1099k.box5a.where'),
    },
    {
      box: 'Box 5b',
      label: t('anatomy.1099k.box5b.label'),
      value: '$2,100.00',
      desc: t('anatomy.1099k.box5b.desc'),
      where: t('anatomy.1099k.box5b.where'),
    },
    {
      box: 'Box 5c',
      label: t('anatomy.1099k.box5c.label'),
      value: '$1,950.00',
      desc: t('anatomy.1099k.box5c.desc'),
      where: t('anatomy.1099k.box5c.where'),
    },
  ];

  const activeTipData = activeTip ? boxes.find(b => b.box === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">{t('anatomy.hoverPrompt')}</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-200 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">{t('anatomy.1099k.formTitle')}</span>
          <span className="text-xs text-ink-400">{t('anatomy.1099k.arrivesBy')}</span>
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
          <p className="text-sm text-ink-400 italic text-center py-4">{t('anatomy.hoverCta')}</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.box} · {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">{t('anatomy.whereItLands')}</div>
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

  const { t } = useTranslation();

  const steps: Array<{ id: string; label: string; value: string; desc: string; where: string }> = [
    {
      id: 'net',
      label: t('anatomy.scheduleSE.net.label'),
      value: t('anatomy.scheduleSE.net.value'),
      desc: t('anatomy.scheduleSE.net.desc'),
      where: t('anatomy.scheduleSE.net.where'),
    },
    {
      id: 'adjustment',
      label: '× 92.35%',
      value: t('anatomy.scheduleSE.adjustment.value'),
      desc: t('anatomy.scheduleSE.adjustment.desc'),
      where: t('anatomy.scheduleSE.adjustment.where'),
    },
    {
      id: 'rate',
      label: '× 15.3%',
      value: '12.4% SS + 2.9% Medicare',
      desc: t('anatomy.scheduleSE.rate.desc'),
      where: t('anatomy.scheduleSE.rate.where'),
    },
    {
      id: 'deductible',
      label: t('anatomy.scheduleSE.deductible.label'),
      value: t('anatomy.scheduleSE.deductible.value'),
      desc: t('anatomy.scheduleSE.deductible.desc'),
      where: t('anatomy.scheduleSE.deductible.where'),
    },
  ];

  const activeTipData = activeTip ? steps.find(s => s.id === activeTip) : null;

  return (
    <div className="mt-4">
      <p className="text-xs text-ink-500 mb-3">{t('anatomy.hoverPromptCalc')}</p>

      <div className="bg-cream-50 rounded-xl border-2 border-sand-300 overflow-hidden mb-4">
        <div className="bg-sand-50 px-4 py-3 border-b border-sand-200 flex justify-between items-baseline">
          <span className="text-sm font-medium text-ink-700">{t('anatomy.scheduleSE.formTitle')}</span>
          <span className="text-xs text-ink-400">{t('anatomy.scheduleSE.calculated')}</span>
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
          <p className="text-sm text-ink-400 italic text-center py-4">{t('anatomy.hoverCtaStep')}</p>
        ) : activeTipData ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-sand-600 uppercase tracking-wide">
              {activeTipData.label}
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{activeTipData.desc}</p>
            <div className="pt-3 border-t border-sand-200">
              <div className="text-xs font-medium text-sand-700 uppercase tracking-wide mb-1">{t('anatomy.whereItLands')}</div>
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
  const { t } = useTranslation();
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
    <div id="raise-calculator" className="mb-16 bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-steel-50 to-sage-50 border-b border-ink-100">
        <h2 className="text-2xl font-serif text-ink-800 mb-2">{t('raiseCalc.header')}</h2>
        <p className="text-ink-600 mb-6 leading-relaxed">
          {t('raiseCalc.subtitle')}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">{t('raiseCalc.salaryLabel')}</label>
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
            <label className="block text-sm font-medium text-ink-700 mb-2">{t('raiseCalc.filingStatusLabel')}</label>
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
            <h3 className="font-serif text-lg text-ink-800 mb-4">{t('raiseCalc.bracketsHeader')}</h3>

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
                  ${standardDeductions[filingStatus].toLocaleString()} — {t('raiseCalc.stdDeductionBar')}
                </div>
                <div className="w-20 text-right font-mono text-sm text-ink-400">$0</div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-1 border-t border-ink-100">
                <span className="text-xs text-ink-500">{t('raiseCalc.totalLabel', { amount: salary.toLocaleString() })}</span>
              </div>
            </div>

            <div className="bg-cream-50 rounded-xl p-4 border border-ink-100">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-600">{t('raiseCalc.grossSalaryLabel')}</span>
                  <span className="font-mono font-medium text-ink-800">${salary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-600">{t('raiseCalc.stdDeductionLabel')}</span>
                  <span className="font-mono text-ink-600">${standardDeductions[filingStatus].toLocaleString()}</span>
                </div>
                <div className="border-t border-ink-200 pt-2 flex justify-between text-sm">
                  <span className="text-ink-600">{t('raiseCalc.taxableIncomeLabel')}</span>
                  <span className="font-mono font-medium text-ink-800">${Math.round(current.taxableIncome).toLocaleString()}</span>
                </div>
                <div className="border-t border-ink-200 pt-2 flex justify-between">
                  <span className="font-medium text-ink-800">{t('raiseCalc.federalIncomeTaxLabel')}</span>
                  <span className="font-mono font-bold text-steel-700">${Math.round(current.tax).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-ink-800 mb-4">{t('raiseCalc.keyRatesHeader')}</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-sage-50 rounded-xl p-4 border border-sage-200">
                <div className="text-sm text-sage-600 mb-1">{t('raiseCalc.marginalRateLabel')}</div>
                <div className="text-3xl font-bold text-sage-700">{Math.round(current.marginalRate * 100)}%</div>
                <div className="text-xs text-sage-600 mt-2">{t('raiseCalc.marginalRateNote')}</div>
              </div>

              <div className="bg-steel-50 rounded-xl p-4 border border-steel-200">
                <div className="text-sm text-steel-600 mb-1">{t('raiseCalc.effectiveRateLabel')}</div>
                <div className="text-3xl font-bold text-steel-700">{current.effectiveRate.toFixed(1)}%</div>
                <div className="text-xs text-steel-600 mt-2">{t('raiseCalc.effectiveRateNote')}</div>
              </div>
            </div>

            <div className="bg-sand-50 rounded-xl p-4 border border-sand-200">
              <p className="text-sm text-ink-600 mb-3">
                <span className="font-medium text-sand-700">{t('raiseCalc.whyDiff')}</span> {t('raiseCalc.whyDiffBody')}
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
            {showBeforeAfter ? t('raiseCalc.beforeAfterEnabled') : t('raiseCalc.showBeforeAfter')}
          </button>

          {showBeforeAfter && (
            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-ink-700 mb-2">{t('raiseCalc.beforeLabel')}</label>
                <input
                  type="number"
                  value={prevSalary}
                  onChange={(e) => setPrevSalary(Number(e.target.value))}
                  className="px-3 py-2 border border-ink-200 rounded-lg text-sm font-mono w-40"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-steel-50 rounded-xl p-5 border border-steel-200">
                  <h4 className="font-medium text-ink-800 mb-3">{t('raiseCalc.beforeHeader', { amount: prevSalary.toLocaleString() })}</h4>
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
                          ${standardDeductions[filingStatus].toLocaleString()} — {t('raiseCalc.stdDeductionBar')}
                        </div>
                        <div className="w-16 text-right font-mono text-ink-400">$0</div>
                      </div>
                      <div className="pt-0.5 text-right">
                        <span className="text-xs text-ink-400">{t('raiseCalc.totalLabel', { amount: prevSalary.toLocaleString() })}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-steel-300 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-600">{t('raiseCalc.taxableIncome')}</span>
                        <span className="font-mono">${Math.round(calculateTax(prevSalary).taxableIncome).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-600">{t('raiseCalc.federalTax')}</span>
                        <span className="font-mono font-bold text-steel-700">${Math.round(calculateTax(prevSalary).tax).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-sage-50 rounded-xl p-5 border border-sage-200">
                  <h4 className="font-medium text-ink-800 mb-3">{t('raiseCalc.afterHeader', { amount: salary.toLocaleString() })}</h4>
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
                          ${standardDeductions[filingStatus].toLocaleString()} — {t('raiseCalc.stdDeductionBar')}
                        </div>
                        <div className="w-16 text-right font-mono text-ink-400">$0</div>
                      </div>
                      <div className="pt-0.5 text-right">
                        <span className="text-xs text-ink-400">{t('raiseCalc.totalLabel', { amount: salary.toLocaleString() })}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-sage-300 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-600">{t('raiseCalc.taxableIncome')}</span>
                        <span className="font-mono">${Math.round(current.taxableIncome).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-600">{t('raiseCalc.federalTax')}</span>
                        <span className="font-mono font-bold text-sage-700">${Math.round(current.tax).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-steel-50 to-sage-50 rounded-xl p-6 border border-ink-200">
                <h4 className="font-medium text-ink-800 mb-4">{t('raiseCalc.whatChanged')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-600">{t('raiseCalc.salaryIncrease')}</span>
                    <span className="font-mono font-bold text-sage-700">+${(salary - prevSalary).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">{t('raiseCalc.additionalTax')}</span>
                    <span className="font-mono text-red-600">+${Math.round(current.tax - calculateTax(prevSalary).tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">{t('raiseCalc.takeHomeIncrease')}</span>
                    <span className="font-mono font-bold text-sage-700">+${Math.round((salary - prevSalary) - (current.tax - calculateTax(prevSalary).tax)).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-ink-200">
                  <p className="text-xs text-ink-500 italic">
                    {t('raiseCalc.keptPercent', { pct: Math.round(((salary - prevSalary) - (current.tax - calculateTax(prevSalary).tax)) / (salary - prevSalary) * 100) })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-sand-50 border-t border-sand-100">
        <p className="text-xs text-ink-600">
          <strong className="text-sand-700">{t('raiseCalc.disclaimerLabel')}</strong> {t('raiseCalc.disclaimer')}
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
