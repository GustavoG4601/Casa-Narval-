import React, { useState } from 'react';

export default function FaqAccordion({ faqs = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="faq-container py-5">
            <div className="text-center mb-5">
                <span className="badge-soft px-3 py-2 rounded-pill small fw-bold text-brand mb-3 d-inline-block">
                    <i className="bi bi-patch-question-fill me-2"></i>RESOLVEMOS TUS DUDAS
                </span>
                <h2 className="display-6 fw-bold text-dark-blue">Preguntas Frecuentes</h2>
            </div>

            <div className="max-w-800 mx-auto">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className={`card border-0 mb-3 shadow-sm rounded-4 overflow-hidden transition-all ${activeIndex === idx ? 'shadow-md ring-1 ring-brand' : ''}`}
                        style={{ border: activeIndex === idx ? '1px solid var(--brand)' : '1px solid transparent' }}
                    >
                        <div
                            className="card-header bg-white p-4 cursor-pointer d-flex justify-content-between align-items-center"
                            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                        >
                            <h6 className={`m-0 fw-bold transition-all ${activeIndex === idx ? 'text-brand' : 'text-dark-blue'}`}>
                                {faq.question}
                            </h6>
                            <i className={`bi bi-chevron-down transition-all ${activeIndex === idx ? 'rotate-180 text-brand' : 'text-muted'}`} />
                        </div>

                        <div
                            className="overflow-hidden transition-all"
                            style={{
                                maxHeight: activeIndex === idx ? '300px' : '0',
                                opacity: activeIndex === idx ? 1 : 0,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <div className="card-body p-4 pt-0 text-muted lh-base">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .rotate-180 { transform: rotate(180deg); }
        .max-w-800 { max-width: 800px; }
        .shadow-md { box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; }
      `}</style>
        </div>
    );
}
