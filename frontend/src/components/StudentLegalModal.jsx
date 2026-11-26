import { useEffect } from 'react';
import { FileText, X } from 'lucide-react';

const LEGAL_COPY = {
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Account Use.',
        body: 'Your CareLink account is intended for your own student clinic transactions and health-service access.',
      },
      {
        heading: 'Accurate Information.',
        body: 'Submitted identity, academic, contact, and health details should be truthful and match your current university records.',
      },
      {
        heading: 'Account Security.',
        body: 'Keep your credentials private and do not allow anyone else to use your account.',
      },
      {
        heading: 'Clinic Services.',
        body: 'Appointment bookings, QR check-in, queueing, and health records are subject to clinic procedures and availability.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information Collected.',
        body: 'CareLink may process identity, contact details, academic information, appointments, and clinic-related health records to provide campus health services.',
      },
      {
        heading: 'Purpose & Data Privacy (RA 10173).',
        body: 'Information is processed in accordance with the Data Privacy Act of 2012 (RA 10173) for account verification, appointments, check-in, queue management, notifications, and authorized clinic documentation.',
      },
      {
        heading: 'Access.',
        body: 'Records are accessible only to you and authorized clinic personnel according to system permissions.',
      },
      {
        heading: 'Accuracy.',
        body: 'Keep your information updated where permitted by the system.',
      },
    ],
  },
};

/**
 * Shared Terms of Service / Privacy Policy dialog used by Student Register and Health Profile.
 */
export default function StudentLegalModal({ kind, onClose }) {
  const entry = kind ? LEGAL_COPY[kind] : null;

  useEffect(() => {
    if (!entry) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        className="flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h2
            id="legal-title"
            className="flex items-center gap-2 text-base font-extrabold text-gray-900 dark:text-gray-100"
          >
            <FileText size={19} className="text-maroon-800 dark:text-rose-300" />
            {entry.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-[10px] p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <X size={19} />
          </button>
        </div>
        <div className="space-y-4 overflow-y-auto p-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {entry.sections.map((section) => (
            <p key={section.heading}>
              <strong className="text-gray-900 dark:text-gray-100">{section.heading}</strong>{' '}
              {section.body}
            </p>
          ))}
        </div>
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[10px] bg-maroon-800 py-2.5 text-sm font-bold text-white transition-colors hover:bg-maroon-900 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
