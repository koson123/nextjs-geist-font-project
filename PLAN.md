# Fitness RPG App - Development Plan

## Project Overview
Building a fully offline fitness RPG web app using Next.js that helps users train with real bodyweight exercises and track growth using an RPG stat system.

## Core Features Based on Screenshots

### 1. Daily Training Screen
- Display 4 daily quests at once
- Exercise types: Push-ups, Squats, Sit-ups, Running
- Progress tracking with [0/X] format
- Checkboxes for completion
- Real-time countdown timer (24h reset)
- Warning text for penalties
- Progress ring showing completion percentage
- "Daily Quest" button to generate new randomized quests

### 2. Status Screen
- Player info: Level, XP, Gold, Keys, Title, Rank, Class
- XP progress bar
- Physical metrics: Height, Weight, BMI calculation
- Fitness metrics: VMA, BPM, VO2
- Current streak tracking
- Streak rewards system

## Technical Implementation Plan

### File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Daily Training)
│   └── status/
│       └── page.tsx (Status Screen)
├── components/
│   ├── DailyTraining/
│   ├── Status/
│   └── ui/ (existing shadcn components)
├── utils/
│   ├── questEngine.js
│   ├── xpEngine.js
│   ├── statSystem.js
│   ├── debuffManager.js
│   ├── skillTree.js
│   ├── streakTracker.js
│   └── storage.js
└── data/
    └── exercises.js
```

### RPG System Implementation

#### Stats System
- STR: Upper body calisthenics
- VIT: Endurance & legs
- AGI: Mobility & flexibility
- CORE: Midline strength
- INT: Streaks + screen time
- LCK: Random quest/event bonuses

#### XP Formulas
- Strength: XP = sets × reps × RPE × 1.2
- Mobility: XP = holdTime × sets × 0.5

#### Quest System
- 4 daily quests auto-generated each morning
- Real workout pool with sets/reps/hold times
- Completion tracking with XP/stat rewards
- Penalty system for expired quests
- 24-hour timer reset

### Storage Strategy
- Use localStorage for web persistence
- Store: completed quests, reps logged, XP, stats, debuffs, skill unlocks, titles, streak history

### UI/UX Design
- Dark blue gradient background matching screenshots
- Mobile-first responsive design
- Clean typography without external icons
- Progress rings and bars
- Real-time countdown timers
- Checkbox interactions

## Development Steps
1. Set up basic app structure and routing
2. Create utility functions for RPG systems
3. Build Daily Training screen with quest system
4. Build Status screen with player stats
5. Implement local storage persistence
6. Add timer and streak tracking
7. Test and refine user experience
