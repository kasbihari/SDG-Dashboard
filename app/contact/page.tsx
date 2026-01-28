export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-light mb-4">
            Neem Contact Op
          </h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto light-text">
            Heb je vragen over de SDG's of ons dashboard? We helpen je graag verder.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-dark-glass rounded-2xl p-8 border border-purple-600/30 shadow-dark-xl">
            <h2 className="text-2xl font-bold light-text mb-6">Stuur ons een bericht</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-200 mb-2 light-text">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-navy-900/70 border border-purple-600/30 rounded-lg light-text placeholder-navy-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Je volledige naam"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-200 mb-2 light-text">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-navy-900/70 border border-purple-600/30 rounded-lg light-text placeholder-navy-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="je@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-navy-200 mb-2 light-text">
                  Onderwerp
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-navy-900/70 border border-purple-600/30 rounded-lg light-text focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Kies een onderwerp</option>
                  <option value="technical">Technische ondersteuning</option>
                  <option value="content">Inhoudelijke vragen</option>
                  <option value="partnership">Samenwerking</option>
                  <option value="other">Overige</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy-200 mb-2 light-text">
                  Bericht
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-navy-900/70 border border-purple-600/30 rounded-lg light-text placeholder-navy-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Je bericht..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 light-text font-semibold py-3 px-6 rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
              >
                Verstuur Bericht
              </button>
            </form>
          </div>

          
          <div className="space-y-8">
            <div className="bg-dark-glass rounded-2xl p-8 border border-purple-600/30 shadow-dark-xl">
              <h2 className="text-2xl font-bold light-text mb-6">Contactgegevens</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-navy-900/50 rounded-lg hover:bg-navy-900/70 transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy-200 text-sm light-text">E-mail</p>
                    <p className="light-text font-medium">info@bienderen-sdg.nl</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-navy-900/50 rounded-lg hover:bg-navy-900/70 transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy-200 text-sm light-text">Telefoon</p>
                    <p className="light-text font-medium">+31 (0)20 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-navy-900/50 rounded-lg hover:bg-navy-900/70 transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy-200 text-sm light-text">Adres</p>
                    <p className="light-text font-medium">SDG Straat 123<br />1234 AB Amsterdam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-dark-glass rounded-2xl p-8 border border-purple-600/30 shadow-dark-xl">
              <h2 className="text-2xl font-bold light-text mb-6">Veelgestelde Vragen</h2>
              
              <div className="space-y-4">
                <div className="bg-navy-900/50 rounded-lg p-4 hover:bg-navy-900/70 transition-all duration-300">
                  <h3 className="font-semibold light-text mb-2">Wat zijn de SDG's?</h3>
                  <p className="text-navy-200 text-sm light-text">
                    De Sustainable Development Goals (SDG's) zijn 17 doelen voor duurzame ontwikkeling van de Verenigde Naties.
                  </p>
                </div>

                <div className="bg-navy-900/50 rounded-lg p-4 hover:bg-navy-900/70 transition-all duration-300">
                  <h3 className="font-semibold light-text mb-2">Is de data real-time?</h3>
                  <p className="text-navy-200 text-sm light-text">
                    Onze data wordt regelmatig bijgewerkt met de laatste beschikbare informatie van officiële bronnen.
                  </p>
                </div>

                <div className="bg-navy-900/50 rounded-lg p-4 hover:bg-navy-900/70 transition-all duration-300">
                  <h3 className="font-semibold light-text mb-2">Kan ik bijdragen aan het dashboard?</h3>
                  <p className="text-navy-200 text-sm light-text">
                    Ja! Neem contact met ons op voor mogelijkheden tot samenwerking en data-bijdragen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm light-text">We reageren meestal binnen 24 uur</span>
          </div>
        </div>
      </div>
    </div>
  );
}