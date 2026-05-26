import { useState } from 'react';

export default function FormBox({
  box,
  label,
  tooltip,
}: {
  box: string;
  label: string;
  tooltip: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-start gap-2 p-2 rounded-lg bg-white border border-sand-200 cursor-help hover:border-sand-400 transition-colors"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(s => !s)}
    >
      <span className="font-mono text-xs text-sand-700 font-semibold whitespace-nowrap bg-sand-50 px-1.5 py-0.5 rounded border border-sand-200">
        {box}
      </span>
      <span className="text-xs text-ink-700 leading-tight pt-0.5">{label}</span>
      {show && (
        <div className="absolute left-0 top-full mt-1 z-20 bg-ink-800 text-white text-xs rounded-xl p-3 shadow-xl max-w-xs leading-relaxed pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  );
}
