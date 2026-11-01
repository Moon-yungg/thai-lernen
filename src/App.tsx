import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Home } from './screens/Home'
import { Practice } from './screens/Practice'
import { GrammarList, GrammarTopic } from './screens/Grammar'
import { Profile } from './screens/Profile'
import { Session } from './screens/Session'
import { DialogueScreen } from './screens/Dialogue'
import { Alphabet } from './screens/Alphabet'
import { StoryScreen } from './screens/Story'
import { Screen } from './components/ui'
import { sfx } from './lib/audio'
import { dueIds, type Route } from './lib/nav'
import { useProgress } from './lib/store'

type Tab = 'learn' | 'practice' | 'grammar' | 'profile'

export default function App() {
  const [tab, setTab] = useState<Tab>('learn')
  const [stack, setStack] = useState<Route[]>([])
  const p = useProgress()
  const due = dueIds(p).length

  // Android-Zurück-Taste schließt das oberste Overlay
  useEffect(() => {
    const onPop = () => setStack((s) => s.slice(0, -1))
    addEventListener('popstate', onPop)
    return () => removeEventListener('popstate', onPop)
  }, [])

  const go = (r: Route) => {
    history.pushState({ d: stack.length + 1 }, '')
    setStack((s) => [...s, r])
  }
  const back = () => history.back()
  const top = stack[stack.length - 1]

  const tabs: [Tab, string, string][] = [
    ['learn', '🏝️', 'Lernen'],
    ['practice', '🎯', 'Üben'],
    ['grammar', '📘', 'Grammatik'],
    ['profile', '👤', 'Profil'],
  ]

  return (
    <div className="app">
      <div className="screen">
        <AnimatePresence mode="wait">
          <motion.div key={tab} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {tab === 'learn' && <Home go={go} />}
            {tab === 'practice' && <Practice go={go} />}
            {tab === 'grammar' && <GrammarList onOpen={(id) => go({ name: 'grammar', id })} />}
            {tab === 'profile' && <Profile />}
          </motion.div>
        </AnimatePresence>
        <nav className="tabbar">
          {tabs.map(([t, icon, label]) => (
            <button key={t} className={tab === t ? 'on' : ''} onClick={() => (sfx.tap(), setTab(t))}>
              <span className="ico">{icon}</span>
              {label}
              {t === 'practice' && due > 0 && <span className="badge">{due}</span>}
            </button>
          ))}
        </nav>
      </div>
      <AnimatePresence>
        {top && (
          <Screen key={stack.length + top.name}>
            {top.name === 'session' && <Session cfg={top.cfg} onExit={back} />}
            {top.name === 'grammar' && <GrammarTopic id={top.id} onBack={back} />}
            {top.name === 'dialogue' && <DialogueScreen id={top.id} onBack={back} />}
            {top.name === 'alphabet' && <Alphabet onBack={back} />}
            {top.name === 'story' && <StoryScreen id={top.id} onBack={back} />}
          </Screen>
        )}
      </AnimatePresence>
    </div>
  )
}
