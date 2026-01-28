import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Sample SDG 7: Clean Energy metrics
  const sdg7Metrics = [
    { country: 'Netherlands', year: 2022, metricKey: 'renewable_energy_percent', value: 16.8 },
    { country: 'Germany', year: 2022, metricKey: 'renewable_energy_percent', value: 21.4 },
  ]

  // Sample SDG 13: Climate Action metrics
  const sdg13Metrics = [
    { country: 'Netherlands', year: 2022, metricKey: 'co2_per_capita', value: 8.2 },
    { country: 'Germany', year: 2022, metricKey: 'co2_per_capita', value: 7.7 },
  ]

  const allMetrics = [
    ...sdg7Metrics.map(m => ({ ...m, sdgNumber: 7, source: 'IEA World Energy Statistics' })),
    ...sdg13Metrics.map(m => ({ ...m, sdgNumber: 13, source: 'Global Carbon Project' })),
  ]

  // Insert all metrics
  for (const metric of allMetrics) {
    await prisma.sdgMetric.upsert({
      where: {
        id: `${metric.sdgNumber}-${metric.country}-${metric.year}-${metric.metricKey}`,
      },
      update: metric,
      create: {
        id: `${metric.sdgNumber}-${metric.country}-${metric.year}-${metric.metricKey}`,
        ...metric,
      },
    })
  }

  console.log(`✅ Created ${allMetrics.length} sample SDG metrics`)
  const contactMessages = [
    {
      id: 'msg-1',
      name: 'Jan de Vries',
      email: 'jan@example.com',
      subject: 'Vraag over SDG 14',
      message: 'Hoe kan ik samenwerken aan projecten rondom SDG 14?',
      responded: false,
    },
    {
      id: 'msg-2',
      name: 'Fatima Al',
      email: 'fatima@example.com',
      subject: 'Feedback dashboard',
      message: 'Het dashboard ziet er goed uit, maar de grafieken laden langzaam.',
      responded: false,
    },
    {
      id: 'msg-3',
      name: 'Arjan Peters',
      email: 'arjan@example.com',
      subject: 'Samenwerking',
      message: 'Wij willen graag data delen voor lokale projecten.',
      responded: true,
    },
  ]

  for (const msg of contactMessages) {
    await prisma.contactMessage.upsert({
      where: { id: msg.id },
      update: {
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        responded: msg.responded,
      },
      create: {
        id: msg.id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        responded: msg.responded,
      },
    })
  }

  console.log(`✅ Created ${contactMessages.length} sample contact messages`)
  

  
  console.log('🌱 Seed completed successfully!')
  
  const users = await prisma.user.createMany({
    data: [
      {
        id: "1",
        name: "Mustafa Khedoe",
        email: "mustafa7@gmail.com",
        password: "$2b$10$ngd5kvie.cLRkwPgyhRlHeMYuxQAQz6adNdztjUQEpokMne9/uHvC",
        createdAt: "2025-12-08T13:01:04.000Z",
      },
      {
        id: "2",
        name: "Kaya Gerling",
        email: "Kaya10@gmail.com",
        password: "$2b$10$ngd5kvie.cLRkwPgyhRlHeMYuxQAQz6adNdztjUQEpokMne9/uHvC",
        createdAt: "2025-12-08T13:06:22.000Z",
      },
      {
       id: "3",
        name: "Krishna Bihari",
        email: "Krishna04@gmail.com",
        password: "$2b$10$ngd5kvie.cLRkwPgyhRlHeMYuxQAQz6adNdztjUQEpokMne9/uHvC",
        createdAt: "2025-12-08T13:06:44.000Z",
      },
      {
        id: "4",
        name: "Thijmen Bastiaan",
        email: "Thijmen11@gmail.com",
        password: "$2b$10$ngd5kvie.cLRkwPgyhRlHeMYuxQAQz6adNdztjUQEpokMne9/uHvC",
        createdAt: "2025-12-08T13:07:05.000Z",
      }
    ]})
    console.log(`✅ Created ${users.count} users`)
    console.log('🌱 Seed completed successfully!')

}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })