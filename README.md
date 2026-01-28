🚀 SDG Dashboard - Quick Start Guide

First Time Setup (5 Minutes)

Step 1: Install Everything

Open your terminal and run these commands:

# 1. Install all required packages
npm install

# 2. Copy the configuration file
cp .env.example .env

# 3. Start the database (runs in Docker)
docker-compose up -d

# 4. Create database tables
npm run db:push

# 5. Fill database with sample data
npm run db:seed
Step 2: Start the Application

# Start the development server
npm run dev
Step 3: Open Your Browser

Go to: http://localhost:3000

🎉 Congratulations! Your dashboard is now running.

What You'll See in Your Browser:

Dashboard overview with all 17 SDGs
Interactive cards for each Sustainable Development Goal
Sample data that works immediately
Navigation menu to explore the app
Quick Test - Try This:

Click on any SDG card → You'll see detailed information
Try the chatbot (bottom right) → Ask "Show me SDG 3 data"
Use the filters → Filter data by year or country
Download data → Export any SDG as CSV
🛠️ Need to Reset?

# Stop everything and start fresh
docker-compose down -v  # Removes database completely
docker-compose up -d    # Restarts fresh database
npm run db:push        # Recreate tables
npm run db:seed        # Reload sample data
npm run dev           # Restart the app
🔍 View Your Database:

# Option A: Visual database editor
npm run db:studio
# Then open: http://localhost:5555

# Option B: phpMyAdmin (MySQL interface)
# Open: http://localhost:8080
# Username: sdg_user
# Password: sdg_password
⚠️ Common Issues & Solutions:

1. "Database connection failed"

# Make sure Docker is running
docker ps
# If not, restart Docker and then:
docker-compose up -d
2. "Prisma errors"

# Regenerate the database client
npm run db:generate
3. "Port 3000 already in use"

# Kill the process using port 3000
sudo lsof -ti:3000 | xargs kill -9
# Or change the port in package.json
# Add to "scripts": "dev": "next dev -p 3001"
4. "Page not found"

# Clear Next.js cache
rm -rf .next
npm run dev
📁 Project Structure Overview:
📁 app/           → Your website pages
📁 components/    → Reusable UI pieces
📁 lib/           → Database & utilities
📁 prisma/        → Database configuration
📁 data/          → SDG information files

# Completely fresh start:
rm -rf node_modules package-lock.json
npm install
docker-compose down -v
docker-compose up -d
npm run db:push
npm run db:seed
npm run dev
✅ Success Checklist:

npm install completed without errors
Docker containers are running (docker ps shows 2 containers)
Database seeded successfully (no error messages)
Browser shows SDG dashboard at localhost:3000
You can click on SDG cards and see details
🎯 Next Steps After Setup:

Explore the components in /components/ui/
Modify an existing chart in /components/charts/
Add a new SDG indicator in the seed data
Customize the dashboard with your own colors
