import { notFound, redirect } from 'next/navigation'
import { getSDGById } from '@/lib/data'
import { prisma } from '@/lib/prisma'
import { SDGDetailClient } from './SDGDetailClient'

// TODO: Update deze lijst met de SDGs die je implementeert
export async function generateStaticParams() {
  return [
    { id: '3'  },
    { id: '4'  },
    { id: '6'  },
    { id: '7'  },
    { id: '9'  },
    { id: '11' },
    { id: '13' },
    { id: '14'  },
    { id: '15' },
  ]
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const sdg = getSDGById(parseInt(params.id))
  
  if (!sdg) {
    return { title: 'SDG Niet Gevonden' }
  }
  
  return {
    title: `SDG ${sdg.number}: ${sdg.title} | SDG Dashboard`,
    description: sdg.description,
  }
}

async function getSDGData(sdgNumber: number) {
  // Haal metrics op uit de database voor dit SDG uit de nieuwe tabellen
  const rawData = await prisma.sdgvalue.findMany({
    where: {
      sdgserie: {
        indicator: {
          startsWith: `${sdgNumber}.`
        }
      },
      year: { not: null },
      country_id: { not: null }
    },
    include: {
      sdgcountry: true,
      sdgserie: true
    },
    orderBy: [{ year: 'asc' }],
  })
  
  // Transform data naar SDGMetric formaat
  const metrics = rawData.map(item => ({
    id: item.id.toString(),
    sdgNumber: sdgNumber,
    country: item.sdgcountry?.name || 'Unknown',
    year: item.year || 0,
    metricKey: item.sdgserie?.name || 'Unknown',
    value: item.value ? parseFloat(item.value.toString()) : null,
    source: item.sdgserie?.source || null,
    createdAt: new Date()
  }))
  
  return metrics
}

export default async function SDGDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Parse SDG nummer en valideer
  const sdgNumber = parseInt(params.id)
  const sdg = getSDGById(sdgNumber)

  // if(sdgNumber === 6) {
  //   redirect('/sdg6');
  // } else if (sdgNumber === 7) {
  //   redirect('/sdg7');
  // }

  // Als SDG niet bestaat of niet geïmplementeerd, toon 404
  if (!sdg || !sdg.implemented) {
    notFound()
  }

  // Haal metrics data op uit de nieuwe database structuur
  const metrics = await getSDGData(sdgNumber)

  // TODO (Optioneel): Als je authenticatie hebt, haal user data op
  // const session = await auth()
  // const isFavorite = await checkIfFavorite(session?.user?.id, sdgNumber)

  return (
    <div className="min-h-screen bg-gradient-dark">
      <SDGDetailClient
        sdg={sdg}
        metrics={metrics}
        isAuthenticated={false}  
        isFavorite={false}       
      />
    </div>
  )
}