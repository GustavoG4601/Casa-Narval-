import React, { useContext } from 'react';
import FaqAccordion from '../components/FaqAccordion.jsx';
import { AdminContext } from '../context/AdminContext.jsx';

export default function Faq() {
    const { siteData } = useContext(AdminContext);

    return (
        <main className="py-5 bg-light-soft min-vh-100 mt-4 animate-fade-in">
            <div className="container">
                <FaqAccordion faqs={siteData?.faqs} />

                <div className="text-center mt-5">
                    <p className="text-muted">¿Aún tienes dudas?</p>
                    <a
                        href={`https://wa.me/${siteData?.contact?.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-brand text-white px-5 py-3 rounded-pill fw-bold shadow-sm"
                    >
                        <i className="bi bi-whatsapp me-2"></i>Chatea con nosotros
                    </a>
                </div>
            </div>
        </main>
    );
}
