import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import glossaryRu from '../i18n/glossary/ru.json';

type GlossaryKey = keyof typeof glossaryRu;

interface GlossaryTermProps {
  term: GlossaryKey;
  children?: React.ReactNode;
}

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);

  const definition = glossaryRu[term];
  const isRu = i18n.language.startsWith('ru');

  if (!isRu || !definition) {
    return <span>{children ?? term}</span>;
  }

  return (
    <span className="relative inline">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onClick={() => setShow(s => !s)}
        className="border-b border-dotted border-ink-600 cursor-help leading-none"
      >
        {children ?? term}
      </button>
      {show && (
        <span className="absolute left-0 top-full mt-1 z-30 bg-ink-800 text-white text-xs rounded-xl p-3 shadow-xl w-72 leading-relaxed pointer-events-none block">
          <span className="font-semibold">{term}</span> — {definition}
        </span>
      )}
    </span>
  );
}
