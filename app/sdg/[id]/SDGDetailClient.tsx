'use client'

import { useState, useMemo } from 'react'
import { SDGInfo, SDGMetric } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/Card'
import { LineChart } from '@/components/charts/LineChart'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface SDGDetailClientProps {
  sdg: SDGInfo
  metrics: SDGMetric[]
  isAuthenticated: boolean
  isFavorite: boolean
}

export function SDGDetailClient({
  sdg,
  metrics,
  isAuthenticated,
  isFavorite
}: SDGDetailClientProps) {
  const [filters, setFilters] = useState<{
    country?: string
    from?: number
    to?: number
  }>({})
  const [metricKey, setMetricKey] = useState<string | undefined>(undefined)

  const filteredMetrics = useMemo(() => {
    let filtered = metrics
    if (filters.country) filtered = filtered.filter(m => m.country === filters.country)
    if (filters.from !== undefined) filtered = filtered.filter(m => m.year >= filters.from!)
    if (filters.to !== undefined) filtered = filtered.filter(m => m.year <= filters.to!)
    if (metricKey) filtered = filtered.filter(m => m.metricKey === metricKey)
    return filtered
  }, [metrics, filters, metricKey])

  const metricKeys = useMemo(() => [...new Set(metrics.map(m => m.metricKey))], [metrics])
  const countries = useMemo(() => [...new Set(metrics.map(m => m.country))], [metrics])

  const totalRows = filteredMetrics.length
  const totalMeasurements = filteredMetrics.filter(m => m.value !== null && m.value !== undefined).length

  const years = Array.from(new Set(filteredMetrics.map(m => m.year))).sort((a, b) => a - b)
  const lastYear = years.length ? years[years.length - 1] : undefined

  const avgForYear = (y?: number) => {
    if (!y) return 0
    const vals = filteredMetrics
      .filter(m => m.year === y)
      .map(m => m.value)
      .filter((v): v is number => v !== null && v !== undefined)

    if (!vals.length) return 0
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }

  const lastYearAvg = avgForYear(lastYear)
  const prevYearAvg = avgForYear(lastYear ? lastYear - 1 : undefined)
  const trend = lastYearAvg > prevYearAvg ? 'up' : (lastYearAvg < prevYearAvg ? 'down' : 'stable')

  // Nieuwste vs vorige meting (op basis van gefilterde metrics)
  const sortedMetrics = [...filteredMetrics].sort((a, b) => b.year - a.year || b.id.localeCompare(a.id))
  const latestMetric = sortedMetrics.find(m => m.value !== null)
  const previousMetric = sortedMetrics.find(m => m.value !== null && m.id !== latestMetric?.id)
  const latestValue = latestMetric?.value ?? 0
  const previousValue = previousMetric?.value ?? 0
  const measurementTrend = latestValue > previousValue ? 'up' : (latestValue < previousValue ? 'down' : 'stable')
  const percentageChange = previousValue !== 0 ? ((latestValue - previousValue) / previousValue * 100) : 0

  const chartData = useMemo(() => {
    const yrs = Array.from(new Set(filteredMetrics.map(m => m.year))).sort((a, b) => a - b)
    const labels = yrs.map(String)
    const data = yrs.map(y => {
      const vals = filteredMetrics
        .filter(m => m.year === y)
        .map(m => m.value)
        .filter((v): v is number => v !== null && v !== undefined)

      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
    })
    return {
      labels,
      datasets: [{
        label: metricKey ?? 'Value',
        data,
        backgroundColor: 'rgba(168, 85, 247, 0.7)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2
      }]
    }
  }, [filteredMetrics, metricKey])

  // Export naar CSV functie
  const exportToCSV = () => {
    const headers = ['Year', 'Country', 'Metric', 'Value', 'Source']
    const csvContent = [
      headers.join(','),
      ...filteredMetrics.map(m =>
        [m.year, `"${m.country}"`, `"${m.metricKey}"`, m.value ?? '', `"${m.source ?? ''}"`].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `SDG${sdg.number}_data.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Alleen eerste 10 rijen tonen in de tabel (voorkomt heel veel scrollen)
  const displayedMetrics = filteredMetrics.slice(0, 10)

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* SDG Icon */}
            <div
              className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl flex-shrink-0 light-text"
              style={{ backgroundColor: sdg.color }}
            >
              {sdg.icon}
            </div>

            {/* SDG Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gradient-light mb-2">
                SDG {sdg.number}: {sdg.title}
              </h1>
              <p className="text-lg text-navy-200 light-text">
                {sdg.description}.
              </p>
            </div>
          </div>
        </div>

        {/* KPI Section */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 bg-dark-glass">
              <div className="text-sm text-navy-200 light-text">Totaal metingen</div>
              <div className="text-2xl font-bold mt-2 light-text">{totalMeasurements}</div>
              <div className="text-xs text-purple-300 mt-1 light-text">
                {totalRows} rijen (incl. lege waarden)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 bg-dark-glass">
              <div className="text-sm text-navy-200 light-text">Gemiddelde {metricKey ?? ''} ({lastYear})</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold light-text">{lastYearAvg.toFixed(2)}</span>
                {trend === 'up' && <ArrowUp className="w-6 h-6 text-green-400" />}
                {trend === 'down' && <ArrowDown className="w-6 h-6 text-red-400" />}
                {trend === 'stable' && <span className="text-sm text-purple-300 light-text">Stabiel</span>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 bg-dark-glass">
              <div className="text-sm text-navy-200 light-text">Nieuwste meting</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold light-text">{latestValue.toFixed(2)}</span>
                {measurementTrend === 'up' && <ArrowUp className="w-6 h-6 text-green-400" />}
                {measurementTrend === 'down' && <ArrowDown className="w-6 h-6 text-red-400" />}
                {measurementTrend === 'stable' && <span className="text-sm text-purple-300 light-text">—</span>}
              </div>
              {previousValue !== 0 && (
                <div className="text-xs text-purple-300 mt-1 light-text">
                  {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}% vs vorige
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 bg-dark-glass">
              <div className="text-sm text-navy-200 light-text">Beschikbare keys</div>
              <div className="mt-2 text-sm text-purple-300 max-h-20 overflow-y-auto">{metricKeys.join(', ')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-sm text-navy-200 light-text">Metric key</label>
            <select
              className="mt-1 p-2 bg-navy-900/70 border border-purple-600/30 rounded light-text text-navy-50"
              value={metricKey ?? ''}
              onChange={e => setMetricKey(e.target.value || undefined)}
            >
              <option value="">-- alle keys --</option>
              {metricKeys.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-navy-200 light-text">Country</label>
            <select
              className="mt-1 p-2 bg-navy-900/70 border border-purple-600/30 rounded light-text text-navy-50"
              value={filters.country ?? ''}
              onChange={e => setFilters(f => ({ ...f, country: e.target.value || undefined }))}
            >
              <option value="">-- alle landen --</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-navy-200 light-text">From year</label>
            <input
              type="number"
              className="mt-1 p-2 bg-navy-900/70 border border-purple-600/30 rounded w-28 light-text text-navy-50"
              value={filters.from ?? ''}
              onChange={e => setFilters(f => ({ ...f, from: e.target.value ? Number(e.target.value) : undefined }))}
            />
          </div>

          <div>
            <label className="block text-sm text-navy-200 light-text">To year</label>
            <input
              type="number"
              className="mt-1 p-2 bg-navy-900/70 border border-purple-600/30 rounded w-28 light-text text-navy-50"
              value={filters.to ?? ''}
              onChange={e => setFilters(f => ({ ...f, to: e.target.value ? Number(e.target.value) : undefined }))}
            />
          </div>

          <div>
            <button
              className="ml-2 mt-2 px-3 py-2 bg-navy-900/70 border border-purple-600/30 rounded light-text hover:bg-navy-900 transition-all duration-300"
              onClick={() => { setFilters({}); setMetricKey(undefined) }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-4 bg-dark-glass">
              <h3 className="text-lg font-semibold mb-4 light-text">Trend per jaar</h3>
              <div style={{ height: 320 }} className="chart-light">
                <LineChart
                  data={chartData}
                  title={`Trend ${metricKey ?? 'alle keys'}`}
                />
              </div>
              <p className="text-xs mt-2 text-purple-300 light-text">Data beschikbaar: {metrics.length} metrics</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="p-6 bg-dark-glass">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold light-text">Gegevenstabel</h3>
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 light-text rounded-lg shadow-glow-md hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
                >
                  Exporteer naar CSV
                </button>
              </div>
              <div className="mb-3 text-sm text-purple-300 light-text">Toont {displayedMetrics.length} van {filteredMetrics.length} rijen — download de CSV voor alle gefilterde data.</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-navy-200">
                      <th className="py-2 pr-4 light-text">Year</th>
                      <th className="py-2 pr-4 light-text">Country</th>
                      <th className="py-2 pr-4 light-text">Metric</th>
                      <th className="py-2 pr-4 light-text">Value</th>
                      <th className="py-2 pr-4 light-text">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedMetrics.map(m => (
                      <tr key={m.id} className="border-t border-purple-600/20">
                        <td className="py-2 pr-4 light-text">{m.year}</td>
                        <td className="py-2 pr-4 light-text">{m.country}</td>
                        <td className="py-2 pr-4 light-text">{m.metricKey}</td>
                        <td className="py-2 pr-4 light-text">{m.value ?? '—'}</td>
                        <td className="py-2 pr-4 light-text">{m.source ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
