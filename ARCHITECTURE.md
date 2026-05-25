```
╔════════════════════════════════════════════════════════════════════════════╗
║                     🏎️  F1 ARCADE - ARCHITECTURE                          ║
║                        Modern React + High Performance                      ║
╚════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. LAYER ARCHITECTURE                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────────────────┐
                    │   PRESENTATION LAYER         │
                    │  (React Components + Hooks)  │
                    ├──────────────────────────────┤
                    │ App.jsx                      │
                    │ ├─ ReactionGame.jsx          │
                    │ └─ TyreGame.jsx              │
                    └──────────────────────────────┘
                               ▲
                               │
                    ┌──────────────────────────────┐
                    │   BUSINESS LOGIC LAYER       │
                    │   (Custom Hooks)             │
                    ├──────────────────────────────┤
                    │ useReactionTimer.js          │
                    │ ├─ performance.now()         │
                    │ ├─ Jump Start detection      │
                    │ └─ State management          │
                    │                              │
                    │ useF1Audio.js                │
                    │ ├─ AudioContext API         │
                    │ ├─ Sine wave synthesis      │
                    │ └─ Frequency generation     │
                    └──────────────────────────────┘
                               ▲
                               │
                    ┌──────────────────────────────┐
                    │   DATA & CONFIG LAYER        │
                    │   (Constants + Storage)      │
                    ├──────────────────────────────┤
                    │ constants.js                 │
                    │ ├─ F1_CONSTANTS              │
                    │ ├─ THEME_COLORS              │
                    │ └─ UI_TEXT                   │
                    │                              │
                    │ game-rules.js                │
                    │ ├─ Scoring formulas          │
                    │ ├─ Difficulty levels         │
                    │ └─ Achievements              │
                    │                              │
                    │ LocalStorage (Client-side)   │
                    │ └─ High scores               │
                    └──────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. COMPONENT TREE                                                           │
└─────────────────────────────────────────────────────────────────────────────┘

App.jsx
├─ Header
│  └─ Navigation buttons
├─ Main Content
│  ├─ Home Page
│  │  ├─ Title section
│  │  ├─ Game cards grid
│  │  │  ├─ Reaction card
│  │  │  └─ Tyre card
│  │  ├─ Stats section
│  │  └─ Footer
│  ├─ ReactionGame.jsx
│  │  ├─ useReactionTimer()
│  │  ├─ useF1Audio()
│  │  ├─ Lights grid (5x 16px)
│  │  ├─ Reaction button (GO!)
│  │  ├─ Result display
│  │  └─ Control buttons
│  └─ TyreGame.jsx
│     ├─ useF1Audio()
│     ├─ Stats bar (time/score/level)
│     ├─ Tyre grid (2x2)
│     ├─ Temperature zones indicator
│     ├─ Result display
│     └─ Control buttons
└─ Footer


┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. DATA FLOW - REACTION GAME                                                │
└─────────────────────────────────────────────────────────────────────────────┘

User clicks "Jouer"
    ↓
handleStartGame()
    ├─ useReactionTimer.startTimer()
    │  └─ randomDelay = 1000-4000ms
    ├─ setLights([false,false,false,false,false])
    └─ lightSequence loop:
        ├─ Wait 1000ms → playRedLight() → setLights[0]=true
        ├─ Wait 1000ms → playRedLight() → setLights[1]=true
        ├─ Wait 1000ms → playRedLight() → setLights[2]=true
        ├─ Wait 1000ms → playRedLight() → setLights[3]=true
        ├─ Wait 1000ms → playRedLight() → setLights[4]=true
        └─ Wait randomDelay (1000-4000ms)
            └─ playExtinction() → setLights=[false,false,false,false,false]

User clicks GO button:
    ├─ recordReaction()
    ├─ if !canClick → jumpStartDetected=true → playError()
    └─ else → reactionTime = performance.now() - startTime
        ├─ Compare with F1_AVERAGE (200ms)
        ├─ Update high score if needed
        ├─ Save to localStorage
        └─ playSuccess() → Display result


┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. DATA FLOW - TYRE GAME                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

User clicks "DÉMARRER"
    ├─ setGameActive(true)
    ├─ initiate 500ms interval:
    │  ├─ Update temperatures[]:
    │  │  └─ temp += (baseIncrease * level * randomFactor)
    │  ├─ Calculate score:
    │  │  └─ if tempAvg in [80,105] → +10pts else +2pts
    │  └─ Check game state:
    │     └─ if max(temps) >= 120 → GAME OVER
    ├─ Every 30 seconds:
    │  └─ Increase difficulty level (1→5)
    └─ User clicks tyre:
       └─ temps[index] -= 15°C

On GAME OVER:
    ├─ clearInterval()
    ├─ Check if score > highScore
    ├─ Save to localStorage if new record
    └─ Display result


┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. AUDIO API FLOW                                                           │
└─────────────────────────────────────────────────────────────────────────────┘

useF1Audio Hook:
    ├─ Create AudioContext (once, on first use)
    ├─ playRedLight(delay):
    │  ├─ Create Oscillator (760Hz sine)
    │  ├─ Create Gain node
    │  ├─ Setup volume envelope:
    │  │  ├─ start: 0.3
    │  │  └─ end (200ms): 0.01 (fade out)
    │  └─ Connect: osc → gain → destination
    ├─ playExtinction(delay):
    │  ├─ Create Oscillator (1200Hz sine)
    │  └─ Duration: 150ms
    ├─ playError(delay):
    │  ├─ Create Oscillator (300Hz sine)
    │  └─ Duration: 400ms
    └─ playSuccess(delay):
       ├─ Create Oscillator (1600Hz sine)
       └─ Duration: 250ms


┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. TIMING PRECISION                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

performance.now() Usage:
    ├─ Resolution: 0.001ms (microsecond precision)
    ├─ NOT affected by system clock adjustments
    ├─ High resolution timer since page load
    └─ Perfect for reaction measurement

Reaction Time Calculation:
    startTime = performance.now()          // t1 = 1234567.890
    [user clicks]
    endTime = performance.now()            // t2 = 1234567.950
    reactionTime = endTime - startTime     // = 0.060ms

Storage Format:
    localStorage['f1_high_score'] = '145.325'  // String, but numeric


┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. STATE MANAGEMENT                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

ReactionGame Component State:
    ├─ lights: [false, false, false, false, false]
    ├─ gameStarted: boolean
    ├─ lightSequenceActive: boolean
    ├─ result: { type, message, time, comparison, isNewRecord }
    ├─ highScore: number (from localStorage)
    └─ Hook states:
       ├─ reactionTime: null|number
       ├─ isActive: boolean
       ├─ jumpStartDetected: boolean
       └─ canClick: boolean

TyreGame Component State:
    ├─ temperatures: [85, 85, 85, 85]
    ├─ score: number
    ├─ gameActive: boolean
    ├─ gameTime: number (seconds)
    ├─ gameLevel: 1-5
    └─ highScore: number (from localStorage)


┌─────────────────────────────────────────────────────────────────────────────┐
│ 8. STYLING ARCHITECTURE (Tailwind)                                          │
└─────────────────────────────────────────────────────────────────────────────┘

Theme System:
    ├─ Colors (tailwind.config.js)
    │  ├─ f1-dark: #0b0b0b (background)
    │  ├─ f1-red: #e10600 (primary accent)
    │  ├─ f1-green: #22c55e (success)
    │  └─ f1-yellow: #ffcc00 (warning)
    │
    ├─ Shadows (glow effects)
    │  ├─ shadow-glow: 0 0 20px rgba(225,6,0,0.8)
    │  └─ shadow-glow-green: 0 0 20px rgba(34,197,94,0.8)
    │
    ├─ Components (index.css)
    │  ├─ @layer components
    │  ├─ .btn-f1, .btn-primary, .btn-secondary
    │  └─ .light-blink (LED animation)
    │
    └─ Responsive
       ├─ Mobile-first approach
       ├─ Breakpoints: sm/md/lg/xl
       └─ Touch-friendly (44px min tap target)


┌─────────────────────────────────────────────────────────────────────────────┐
│ 9. STORAGE STRATEGY (LocalStorage)                                          │
└─────────────────────────────────────────────────────────────────────────────┘

Keys:
    ├─ 'f1_high_score' (Reaction)
    │  ├─ Type: String (numeric)
    │  ├─ Format: '145.325'
    │  └─ Comparison: < 200ms = excellent
    │
    └─ 'f1_tyre_high_score' (Tyre Manager)
       ├─ Type: String (numeric)
       ├─ Format: '2450'
       └─ Comparison: higher = better

Persistence Flow:
    setHighScore(value)
        └─ localStorage.setItem('key', value.toString())

Load Flow:
    useState(() => {
        const saved = localStorage.getItem('key')
        return saved ? parseFloat(saved) : defaultValue
    })


┌─────────────────────────────────────────────────────────────────────────────┐
│ 10. ERROR HANDLING                                                          │
└─────────────────────────────────────────────────────────────────────────────┘

Audio Context Issues:
    ├─ Not running on first load
    │  └─ Solution: Require user interaction first (click)
    ├─ UserAgent blocking audio
    │  └─ Solution: Graceful degradation (game works without audio)
    └─ Older browsers (IE11)
       └─ Solution: window.webkitAudioContext fallback

Timing Issues:
    ├─ System time adjustments
    │  └─ performance.now() immune to this
    ├─ Tab not focused
    │  └─ Timers still work but rendered may lag
    └─ Low-end devices
       └─ May not achieve true 60fps

Storage Issues:
    ├─ LocalStorage full
    │  └─ Catch and degrade (scores not saved)
    ├─ Private browsing mode
    │  └─ localStorage throws error
    └─ Storage quota exceeded
       └─ Try-catch in setItem()


┌─────────────────────────────────────────────────────────────────────────────┐
│ 11. PERFORMANCE OPTIMIZATIONS                                               │
└─────────────────────────────────────────────────────────────────────────────┘

Rendering:
    ├─ useState for local state (no global store overhead)
    ├─ useRef for non-rendering state (performance tracking)
    └─ Memoization not needed (components small)

Audio:
    ├─ Oscillators created on-demand (no pre-allocation)
    ├─ Gain nodes created per sound (cleanup automatic)
    └─ No audio files to load (0ms latency)

Timing:
    ├─ performance.now() = native browser API (~0.01ms overhead)
    ├─ No polling, event-driven (onClick)
    └─ Intervals throttled to 500ms (Tyre game)

Styling:
    ├─ Tailwind JIT compilation
    ├─ CSS-in-JS avoided
    ├─ GPU-accelerated transforms (scale-105)
    └─ Hardware-accelerated shadows (glow)


┌─────────────────────────────────────────────────────────────────────────────┐
│ 12. DEPLOYMENT CHECKLIST                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

Pre-Deployment:
    ├─ npm run build → verify no errors
    ├─ Check dist/ size (~80KB JS gzipped)
    ├─ Test on multiple browsers (Chrome, Firefox, Safari)
    ├─ Test on mobile devices
    ├─ Verify audio works with user gesture required
    ├─ Verify localStorage persists
    └─ Lighthouse score >= 90

Post-Deployment:
    ├─ Monitor errors in production
    ├─ Check performance metrics
    ├─ Gather user feedback
    └─ Plan improvements (achievements, leaderboard, etc.)


╔════════════════════════════════════════════════════════════════════════════╗
║ This architecture ensures:                                                 ║
║ ✓ Millisecond-precision timing                                            ║
║ ✓ Zero-latency audio synthesis                                            ║
║ ✓ Responsive, mobile-first UI                                             ║
║ ✓ Persistent high scores                                                  ║
║ ✓ High performance (60fps constant)                                        ║
║ ✓ Modern React best practices                                              ║
╚════════════════════════════════════════════════════════════════════════════╝
```
