'use client';

import { useState } from 'react';
import ChatBot from '@/components/chatbot';

export default function OndersteuningPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const supportEmail = 'support@example.com';
  const mailSubject = 'SDG Dashboard - Ondersteuning';
  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(mailSubject)}`;

  const faqItems = [
    {
      question: "Hoe gebruik ik het SDG dashboard?",
      answer: "Het dashboard is intuïtief opgebouwd. Begin bij 'Overzicht' voor een algemeen beeld, en gebruik de filters om specifieke doelen of regio's te bekijken."
    },
    {
      question: "Waar komt de data vandaan?",
      answer: "Onze data wordt gehaald uit officiële bronnen zoals de VN, Wereldbank, en nationale statistische bureaus. Alle data is geverifieerd en up-to-date."
    },
    {
      question: "Kan ik de data exporteren?",
      answer: "Ja, je kunt data exporteren in CSV en PDF formaat. Klik op het export icoontje bij elke grafiek of tabel."
    },
    {
      question: "Hoe vaak wordt de data bijgewerkt?",
      answer: "Data wordt maandelijks bijgewerkt. Real-time data is beschikbaar voor bepaalde indicatoren."
    },
    {
      question: "Is er een mobiele app?",
      answer: "Onze website is volledig responsive en werkt perfect op alle devices. Een dedicated mobiele app is in ontwikkeling."
    }
  ];

  const supportChannels = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "Live Chat",
      description: "Direct contact met ons team",
      availability: "Beschikbaar 9:00 - 17:00",
      action: "Start Chat",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "E-mail Support",
      description: "Gedetailleerde ondersteuning",
      availability: "Reactie binnen 24 uur",
      action: "Mail Ons",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Documentatie",
      description: "Uitgebreide handleidingen",
      availability: "Altijd beschikbaar",
      action: "Bekijk Docs",
      color: "from-purple-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-light mb-4">
            Ondersteuning
          </h1>
          <p className="text-xl text-navy-200 max-w-3xl mx-auto light-text">
            Hier vind je alle hulp die je nodig hebt om het SDG dashboard optimaal te gebruiken.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-dark-glass rounded-2xl p-8 border border-purple-600/30 shadow-dark-xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                {channel.icon}
              </div>

              <h3 className="text-xl font-bold light-text mb-3">{channel.title}</h3>
              <p className="text-navy-200 mb-4 light-text">{channel.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-purple-300 text-sm light-text">{channel.availability}</span>
              </div>

              {channel.title === 'E-mail Support' ? (
                <button
                  onClick={() => setShowEmailModal(true)}
                  className={`w-full bg-gradient-to-r ${channel.color} light-text font-semibold py-3 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105`}
                >
                  {channel.action}
                </button>
              ) : channel.title === 'Documentatie' ? (
                <a
                  href="/docs/documentation.md"
                  download
                  className={`w-full inline-block text-center bg-gradient-to-r ${channel.color} light-text font-semibold py-3 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105`}
                >
                  {channel.action}
                </a>
              ) : (
                <button
                  onClick={() => {
                    if (channel.title === 'Live Chat') {
                      setChatOpen(true);
                    }
                  }}
                  className={`w-full bg-gradient-to-r ${channel.color} light-text font-semibold py-3 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105`}
                >
                  {channel.action}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-dark-glass rounded-2xl p-8 border border-purple-600/30">
          <h2 className="text-2xl font-bold light-text mb-6">Veelgestelde Vragen</h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-navy-900/50 rounded-xl p-6 hover:bg-navy-900/70 transition-all duration-300">
                <h3 className="font-semibold light-text mb-2">{item.question}</h3>
                <p className="text-navy-200 text-sm light-text">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEmailModal(false)} />
          <div className="relative bg-navy-900 rounded-xl p-6 w-96 border border-purple-600/30">
            <h3 className="text-lg font-semibold mb-2">E-mail Support</h3>
            <p className="text-sm text-navy-200 mb-4">Vul je e-mailadres en bericht in. Wij sturen een reactie binnen 24 uur.</p>

            <label className="block text-sm mb-1">Jouw e-mail</label>
            <input id="support-from" className="w-full mb-3 p-2 rounded bg-navy-800 text-white text-sm" placeholder="jij@voorbeeld.nl" />

            <label className="block text-sm mb-1">Bericht</label>
            <textarea id="support-body" className="w-full mb-3 p-2 rounded bg-navy-800 text-white text-sm h-28" placeholder="Beschrijf je probleem..."></textarea>

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const from = (document.getElementById('support-from') as HTMLInputElement)?.value || '';
                  const body = (document.getElementById('support-body') as HTMLTextAreaElement)?.value || '';
                  const subject = mailSubject;
                  try {
                    const res = await fetch('/api/support', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ fromEmail: from, subject, body }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      alert('Bericht verzonden, we nemen snel contact op.');
                      setShowEmailModal(false);
                    } else {
                      alert('Versturen mislukt: ' + (data.error || res.statusText));
                    }
                  } catch (err) {
                    alert('Versturen mislukt. Controleer server en SMTP instellingen.');
                  }
                }}
                className="flex-1 bg-purple-600 text-white py-2 rounded"
              >
                Verstuur bericht
              </button>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(supportEmail);
                    alert('E-mailadres gekopieerd');
                  } catch (e) {
                    alert('Kopieer niet mogelijk, kopieer handmatig: ' + supportEmail);
                  }
                }}
                className="flex-1 bg-navy-800 text-white py-2 rounded border border-purple-600/30"
              >
                Kopieer e-mail
              </button>
            </div>
            <button onClick={() => setShowEmailModal(false)} className="mt-4 text-sm text-cyan-300">Sluiten</button>
          </div>
        </div>
      )}
    </div>
  );
}