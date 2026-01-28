// app/overview/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card'
import { FavoriteButton } from '@/components/ui/FavoriteButton'
import { FilterControls, FilterState } from '@/components/dashboard/FilterControls'
import { getAllSDGs } from '@/lib/data'
import { Filter, Star, CheckCircle, XCircle } from 'lucide-react';

export default function OverviewPage() {
  const [filters, setFilters] = useState<FilterState>({
    active: true,
    inactive: true,
    favorites: true
  });
  
  const [favoriteSDGs, setFavoriteSDGs] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);
  const [allSDGs, setAllSDGs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Haal SDG data op
  useEffect(() => {
    const loadData = async () => {
      try {
        const sdgs = await getAllSDGs();
        setAllSDGs(sdgs);
      } catch (error) {
        console.error('Error loading SDGs:', error);
      }
    };
    loadData();
  }, []);

  // Haal user en favorites op
  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        // Haal user data op
        const userResponse = await fetch('/api/auth/me');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.user);
          
          if (userData.user?.id) {
            // Haal favorites op
            const favResponse = await fetch('/api/favorites');
            if (favResponse.ok) {
              const favorites = await favResponse.json();
              setFavoriteSDGs(favorites);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUserData();
  }, []);

  // Filter de SDGs
  const filteredSDGs = useMemo(() => {
    return allSDGs.filter(sdg => {
      const isFavorite = favoriteSDGs.includes(sdg.number);
      const isActive = sdg.implemented;
      
      // Toon alleen als aan filter criteria voldoet
      let shouldShow = false;
      
      if (filters.active && isActive) shouldShow = true;
      if (filters.inactive && !isActive) shouldShow = true;
      if (filters.favorites && isFavorite) shouldShow = true;
      
      return shouldShow;
    });
  }, [allSDGs, favoriteSDGs, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300 light-text">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Titel & uitleg */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl font-bold text-gradient-light mb-4">
            Duurzame Ontwikkelingsdoelen
          </h1>
          <p className="text-lg text-navy-200 max-w-3xl mx-auto light-text">
            De 17 Duurzame Ontwikkelingsdoelen zijn een universele oproep tot actie om armoede te beëindigen,
            de planeet te beschermen en welvaart voor iedereen te waarborgen tegen 2030.
          </p>
          {!user && (
            <div className="mt-6 inline-flex items-center gap-2 bg-dark-glass border border-purple-600/30 rounded-xl px-6 py-3">
              <span className="text-purple-400">★</span>
              <p className="text-sm text-navy-200 light-text">
                <a href="/login" className="text-purple-400 hover:text-purple-300 underline">
                  Log in
                </a> om SDG's als favoriet te markeren en te filteren
              </p>
            </div>
          )}
        </div>

        {/* Filter Controls - alleen tonen als user is ingelogd */}
        {user && (
          <div className="mb-8">
            <FilterControls filters={filters} onFilterChange={setFilters} />
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-dark-glass rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm text-navy-200 light-text">Actieve SDG's</p>
                    <p className="text-2xl font-bold light-text">
                      {allSDGs.filter(sdg => sdg.implemented).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-glass rounded-xl p-6 border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-amber-400 text-xl">⏳</span>
                  </div>
                  <div>
                    <p className="text-sm text-navy-200 light-text">Niet actieve SDG's</p>
                    <p className="text-2xl font-bold light-text">
                      {allSDGs.filter(sdg => !sdg.implemented).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-glass rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400 text-xl">★</span>
                  </div>
                  <div>
                    <p className="text-sm text-navy-200 light-text">Jouw favorieten</p>
                    <p className="text-2xl font-bold light-text">
                      {favoriteSDGs.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid SDG-kaarten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSDGs.map((sdg) => {
            const isFavorite = favoriteSDGs.includes(sdg.number);
            
            return (
              <div key={sdg.number} className="relative">
                <Card
                  href={sdg.implemented ? `/sdg/${sdg.number}` : undefined}
                  hover={sdg.implemented}
                  className="rounded-xl shadow-dark-lg transition-all duration-300 hover:scale-105 hover:shadow-dark-xl border border-purple-600/20"
                >
                  <CardContent className="p-4 bg-dark-glass rounded-xl transition-all duration-300 hover:bg-navy-900/70">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="h-14 w-14 rounded-lg flex items-center justify-center light-text text-2xl font-semibold"
                        style={{ backgroundColor: sdg.color }}
                        aria-hidden="true"
                      >
                        {sdg.icon}
                      </div>
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-semibold mb-1 light-text">
                              SDG {sdg.number}
                            </p>
                            <h3 className="text-lg font-bold mb-2 light-text">
                              {sdg.title}
                            </h3>
                          </div>
                          {/* Favorite Indicator */}
                          {isFavorite && user && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-purple-300">★</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-navy-200 mb-3 line-clamp-3 light-text">
                          {sdg.description}.
                        </p>
                        {/* Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors duration-300 ${
                              sdg.implemented
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {sdg.implemented ? 'Actief' : 'Niet actief'}
                          </span>
                          <FavoriteButton 
                            sdgNumber={sdg.number} 
                            size="sm"
                            userId={user?.id}
                            initialIsFavorite={isFavorite}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredSDGs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-dark-glass rounded-full flex items-center justify-center mb-4 border border-purple-600/30">
              <span className="text-3xl text-purple-400">🔍</span>
            </div>
            <h3 className="text-xl font-semibold light-text mb-2">
              Geen SDG's gevonden
            </h3>
            <p className="text-navy-200 light-text">
              {user 
                ? 'Probeer andere filterinstellingen of voeg favorieten toe.'
                : 'Log in om filters te gebruiken en favorieten toe te voegen.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}