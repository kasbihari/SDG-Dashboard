export function Footer() {
  return (
    <footer className="bg-navy-950 mt-auto border-t border-purple-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="rounded-xl overflow-hidden">
            <div className="px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Section */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow-md">
                      <span className="light-text font-bold text-sm">SDG</span>
                    </div>
                    <div>
                      <h3 className="font-bold light-text text-lg">Bienderen SDG Dashboard</h3>
                      <p className="text-navy-200 text-sm light-text">Sustainable Development Goals</p>
                    </div>
                  </div>
                  <p className="text-navy-200 text-sm max-w-md light-text">
                    Educatief platform voor het volgen van de 17 Duurzame Ontwikkelingsdoelen.
                  </p>
                </div>
                
                {/* Quick Links */}
                <div className="text-center">
                  <h3 className="font-semibold light-text mb-4">Snelkoppelingen</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="/overview" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 light-text">
                        Overzicht
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 light-text">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="/ondersteuning" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 light-text">
                        Ondersteuning
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/* Resources */}
                <div className="text-center md:text-right">
                  <h3 className="font-semibold light-text mb-4">Bronnen</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a
                        href="https://sdgs.un.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 light-text"
                      >
                        VN SDG's
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://unstats.un.org/sdgs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 light-text"
                      >
                        SDG Indicatoren
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-8 pt-8 border-t border-purple-600/20 text-center">
                <p className="text-purple-300 text-sm light-text">
                  © {new Date().getFullYear()} Bienderen SDG Dashboard. Gebouwd voor educatieve doeleinden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}