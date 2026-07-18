import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, Music2 } from "lucide-react"

const memories = [
  {
    title: "Unser erster gemeinsamer Urlaub",
    text: "Kroatien 2025 was unser erster gemeinsamer Urlaub und es war einfach unvergesslich.",
    image: `${import.meta.env.BASE_URL}images/photo-1.jpg`,
  },
  {
    title: "Wir, wenn wir styled up sind",
    text: "Ich liebe es, wenn wir beide einfach so unfassbar gut aussehen und so krass matchen.",
    image: `${import.meta.env.BASE_URL}images/photo-2.jpg`,
  },
  {
    title: "Die kleinen Dinge im Leben",
    text: "Ich liebe es einfach Zeit mit dir zu verbringen, selbst wenn es einem auch nicht so gut geht.",
    image: `${import.meta.env.BASE_URL}images/photo-3.jpg`,
  },
]

const videos = [
  {
    title: "Booooooowling with you",
    src: `${import.meta.env.BASE_URL}videos/memory-1.mp4`,
  },
  {
    title: "Benimm dich!!",
    src: `${import.meta.env.BASE_URL}videos/memory-2.mp4`,
  },
]


const particles = Array.from({ length: 80 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 5 + 1,
  duration: Math.random() * 8 + 6,
}))

const timeline = [
  {
    date: "21.10.2023",
    title: "Unser erstes Treffen",
    text: "Und auf einmal standen wir nebeneinander. Du hast mich angesprochen und so hat alles seinen Lauf genommen.",
  },
  {
    date: "15.02.2024",
    title: "Unser erstes Date",
    text: "Zusammen waren wir in Heidelberg und haben bei Sahara gegessen, bei dem Laden zu dem wir nach der Unteren immer gehen 😂.",
  },
  {
    date: "16.06.2024",
    title: "Unser erster Kuss",
    text: "Die meisten ersten Sachen sind irgendwie betrunken bei uns passiert fällt mir gerade auf.",
  },
  {
    date: "07.07.2024",
    title: "Unser erstes Mal in den Weinbergen",
    text: "Wir hatten unfassbar viel Spaß dort oben und hatten ganz nebenbei auch unseren zweiten Kuss.",
  },
  {
    date: "20.07.2024",
    title: "Unser Datum ❤️",
    text: "Dann war es endlich soweit und wir sind offiziell zusammen gekommen.",
  },
  {
    date: "01.01.2025",
    title: "Unser erstes gemeinsames Silvester",
    text: "Und so konnte ich das erste Mal in ein neues Jahr mit der Liebe meines Lebens starten.",
  },
  {
    date: "13.07.-14.07.2025",
    title: "Unser Europapark-Trip",
    text: "Ich sag nur: Herdplatte, ups.",
  },
  {
    date: "20.07.2025",
    title: "Unser erster Jahrestag",
    text: "Gestört, wie krass schnell dieses erste Jahr mit dir verging.",
  },
  {
    date: "09.08.-17.08.2025",
    title: "Unser erster gemeinsamer Urlaub",
    text: "Kroatien, unser erster Urlaub in dem wir zusammen waren, war so unfassbar schön.",
  },
  {
    date: "27.10.-01.11.2025",
    title: "Unsere erste Reise alleine",
    text: "Und dann war es schon Zeit für unsere erste Reise alleine, nach Göteborg.",
  },
  {
    date: "01.01.2026",
    title: "Unsere zweites Silvester zusammen",
    text: "Unfassbar schnell ist das erste ganze Jahr dann schon verflogen und es war zeit für unsere 2. gemeinsames Silvester.",
  },
  {
    date: "12.02.2026",
    title: "Unser coolstes Fasching",
    text: "Hirschhorn war etwas besonderes, weil wir eigentlich gar keine Lust hatten, aber dann wurde es zu dem besten Fasching ever.",
  },
  {
    date: "05.04.2026",
    title: "Titanic Frankfurt",
    text: "Ich musste dir echt mal ein bisschen Kult näher bringen und letztendlich habe ich es ja sogar geschafft, dass du dir zum ersten Mal den Film anschaust hehe.",
  },
  {
    date: "10.04.2026",
    title: "Soccerbeat",
    text: "Eins deiner vielen wunderschönen Geburtstagsgeschenke an mich und wir hatten unfassbar viel Spaß.",
  },
  {
    date: "02.06.-05.06.2026",
    title: "Prag 2026",
    text: "Unsere zweite gemeinsam größere Reise war genau so toll wie die erste. Prag, eine wunderschöne Stadt, die wir zusammen erkundet haben.",
  },
  {
    date: "20.07.2026",
    title: "Unser Jahrestag",
    text: "Und heute ist es nun soweit, wir sind einfach schon 2 Jahre zusammen, ich bin so glücklich mit dir mein Schatz ❤️.",
  },
]

const relationshipStartDate = new Date(2024, 6, 20, 0, 0, 0)

const secretWord = "jana"
const crosswordUrl = "https://crosswordlabs.com/view/jahrestag-quiz"

function getTimeTogether(now = new Date()) {
  const start = relationshipStartDate

  if (now < start) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      totalDays: 0,
    }
  }

  let years = now.getFullYear() - start.getFullYear()

  let anchor = new Date(
    start.getFullYear() + years,
    start.getMonth(),
    start.getDate(),
    start.getHours(),
    start.getMinutes(),
    start.getSeconds()
  )

  if (anchor > now) {
    years -= 1

    anchor = new Date(
      start.getFullYear() + years,
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes(),
      start.getSeconds()
    )
  }

  let months = 0

  while (months < 11) {
    const nextAnchor = new Date(anchor)
    nextAnchor.setMonth(nextAnchor.getMonth() + 1)

    if (nextAnchor > now) {
      break
    }

    anchor = nextAnchor
    months += 1
  }

  let remainingMilliseconds = now.getTime() - anchor.getTime()

  const days = Math.floor(
    remainingMilliseconds / (1000 * 60 * 60 * 24)
  )

  remainingMilliseconds -= days * 1000 * 60 * 60 * 24

  const hours = Math.floor(
    remainingMilliseconds / (1000 * 60 * 60)
  )

  remainingMilliseconds -= hours * 1000 * 60 * 60

  const minutes = Math.floor(
    remainingMilliseconds / (1000 * 60)
  )

  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  )

  const nowUtc = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )

  const totalDays = Math.floor(
    (nowUtc - startUtc) / (1000 * 60 * 60 * 24)
  )

  return {
    years,
    months,
    days,
    hours,
    minutes,
    totalDays,
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [timeTogether, setTimeTogether] = useState(() => getTimeTogether())
  const { scrollY } = useScroll()

  const heroGlowY = useTransform(scrollY, [0, 700], [0, 180])
  const heroTextY = useTransform(scrollY, [0, 700], [0, -80])
  const imageY = useTransform(scrollY, [300, 1200], [80, -80])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [loading, setLoading] = useState(true)

  const [unlocked, setUnlocked] = useState(false)
  const [answer, setAnswer] = useState("")
  const [answerError, setAnswerError] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTogether(getTimeTogether())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { label: "Start", href: "#top" },
    { label: "Wie alles begann", href: "#story" },
    { label: "Seit es uns gibt", href: "#counter"},
    { label: "Erinnerungen", href: "#memories" },
    { label: "Videos", href: "#videos" },
    { label: "Timeline", href: "#timeline" },
    { label: "Zukunft", href: "#future" },
    { label: "Abschlussbrief", href: "#letter" },
  ]


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main
    
      onMouseMove={(e) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }}
      className="min-h-screen bg-[#050505] text-white overflow-hidden"
    >
      {!unlocked && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#050505] px-6 py-10">
          <div className="mx-auto flex min-h-full w-full max-w-3xl items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="w-full rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10"
            >
              <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/40">
                Erst das Rätsel
              </p>

              <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Bevor es losgeht...
              </h1>

              <p className="mx-auto mb-10 max-w-2xl leading-relaxed text-white/60">
                Löse zuerst das Kreuzworträtsel. Wenn du das Lösungswort hast,
                gib es hier ein und unsere Geschichte wird freigeschaltet.
              </p>

              <a
                href={crosswordUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-8 inline-block rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-widest transition hover:bg-white hover:text-black"
              >
                Rätsel öffnen
              </a>

              <form
                onSubmit={(e) => {
                  e.preventDefault()

                  if (answer.trim().toLowerCase() === secretWord) {
                    setAnswerError("")
                    setUnlocked(true)
                  } else {
                    setAnswerError("Nicht ganz — probier es nochmal ❤️")
                  }
                }}
                className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row"
              >
                <input
                  type="text"
                  placeholder="Lösungswort eingeben..."
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value)
                    setAnswerError("")
                  }}
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-6 py-4 text-center text-white outline-none placeholder:text-white/35 focus:border-white/30"
                />

                <button
                  type="submit"
                  className="rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-widest transition hover:bg-white hover:text-black"
                >
                  Freischalten
                </button>
              </form>

              {answerError && (
                <p className="mt-5 text-sm text-pink-200/80">
                  {answerError}
                </p>
              )}

              <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-white/35">
                Tipp: Das Rätsel öffnet sich in einem neuen Tab. Komm danach einfach
                hierher zurück und gib das Lösungswort ein.
              </p>
            </motion.div>
          </div>
        </div>
      )}
      <AnimatePresence>
  {loading && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050505]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-6"
      >
        <motion.p
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-white/40 uppercase tracking-[0.5em] text-sm mb-6"
        >
          Lade Erinnerungen
        </motion.p>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
            Für jemanden ganz besonderen... ❤️
        </h1>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-pink-300/50"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.15, 0.7, 0.15],
              y: [0, -60, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.div
        className="pointer-events-none fixed z-30 hidden h-80 w-80 rounded-full bg-pink-400/10 blur-3xl md:block"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 30,
          mass: 0.4,
        }}
      />
      <nav className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full border border-white/10 bg-white/10 backdrop-blur-xl p-3 hover:bg-white/20 transition"
          aria-label="Open navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 mt-4 w-52 md:w-56 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl p-3 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      <section id="top" className="min-h-screen flex items-center justify-center px-6 relative">
        <motion.div
  style={{ y: heroGlowY }}
  className="absolute inset-0 overflow-hidden"
>
  <div className="absolute top-[-10rem] left-[-5rem] w-[30rem] h-[30rem] bg-orange-400/20 blur-3xl rounded-full" />

  <div className="absolute bottom-[-10rem] right-[-5rem] w-[25rem] h-[25rem] bg-pink-500/20 blur-3xl rounded-full" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)]" />
</motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          style={{y: heroTextY}}
          className="relative text-center max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.5em] text-white/40 mb-6">
            20.07.
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8">
            Unsere Geschichte
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Ich habe diesen kleinen Ort für uns gemacht — für die Erinnerungen, die wir haben,
            die Momente, die ich nie vergessen möchte, und alles, was noch auf uns wartet.
          </p>

          <button
  type="button"
  onClick={() => {
    document.getElementById("story")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }}
  className="inline-block mt-12 rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
>
  Los geht's
</button>
        </motion.div>
      </section>

      <section id="story" className="min-h-screen px-6 py-28 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-16"
        >
          Wie alles begann
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8"
          >
            <p className="text-white/50 mb-4">Kapitel 1</p>
            <h3 className="text-3xl font-semibold mb-4">
              Der Anfang unserer Reise
            </h3>
            <p className="text-white/60 leading-relaxed">
              Alles begann im Oktober 2023. Du hast mich auf der Kerwe angesprochen und ehrlich gesagt
              hätte ich nie gedacht, dass wir mehr als 2 Jahre später hier stehen würden. 
              Aber hier sind wir — und ich könnte nicht glücklicher sein.
            </p>
          </motion.div>

          <motion.img
            src={`${import.meta.env.BASE_URL}images/photo-4.jpg`}
            alt="A special memory"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ y: imageY}}
            className="aspect-[4/5] w-full rounded-3xl object-cover border border-white/10"
          />
        </div>
      </section>

<section id="counter" className="min-h-screen px-6 py-24 max-w-6xl mx-auto text-center relative z-10">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-8 md:p-14"
  >
    <p className="text-white/40 uppercase tracking-[0.4em] text-sm mb-6">
      Seit es UNS gibt
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
      {[
        { label: "Jahre", value: timeTogether.years },
        { label: "Monate", value: timeTogether.months },
        { label: "Tage", value: timeTogether.days },
        { label: "Stunden", value: timeTogether.hours },
        { label: "Minuten", value: timeTogether.minutes },
      ].map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-black/20 p-5"
        >
          <p className="text-4xl md:text-5xl font-black tracking-tight">
            {item.value}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>

    <p className="text-white/60 text-lg">
      {timeTogether.totalDays} Tage zusammen — und wir zählen weiter.
    </p>
  </motion.div>
</section>

      <section id="memories" className="min-h-screen px-6 py-28 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
        >
          Erinnerungen
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-16"
        >
          Momente, die ich nie vergessen möchte
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 hover:bg-white/[0.08] transition"
            >
              <img
  src={memory.image}
  alt={memory.title}
  className="aspect-[4/5] w-full rounded-2xl object-cover mb-6 transition duration-700 hover:scale-[1.03]"
/>

<p className="text-white/35 mb-4">0{index + 1}</p>
<h3 className="text-2xl font-semibold mb-4">{memory.title}</h3>
<p className="text-white/55 leading-relaxed">{memory.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="videos" className="min-h-screen px-6 py-28 max-w-6xl mx-auto">
  <motion.p
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
  >
    Kleine Momente
  </motion.p>

  <motion.h2
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="text-3xl sm:text-4xl md:text-6xl font-bold mb-16"
  >
    Momente, die sich bewegen 
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {videos.map((video, index) => (
      <motion.div
        key={video.src}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-3"
      >
        <video
          src={video.src}
          className="aspect-[4/5] w-full rounded-2xl object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          onClick={(e) => {
            const video = e.currentTarget

            if (video.muted) {
              video.muted = false
              video.volume = 1
              video.play()
            } else {
              video.muted = true
            }
          }}
        />

        <p className="px-2 pt-4 pb-2 text-white/50">
          {video.title}
        </p>
      </motion.div>
    ))}
  </div>
</section>

<section id="timeline" className="px-6 py-28 max-w-4xl mx-auto">
  <p className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5">
    Timeline
  </p>

  <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-16">
    Kleine Kapitel unserer Geschichte
  </h2>

  <div className="space-y-10 border-l border-white/10 pl-8">
    {timeline.map((item, index) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        className="relative"
      >
        <div className="absolute -left-[2.55rem] top-2 h-4 w-4 rounded-full bg-white" />

        <p className="text-white/40 text-sm mb-2">{item.date}</p>
        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
        <p className="text-white/55 leading-relaxed">{item.text}</p>
      </motion.div>
    ))}
  </div>
</section>

 <section id="future" className="min-h-screen px-6 py-28 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
        >
          Unsere Zukunft
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8"
        >
          Und alles, was sonst noch so auf uns wartet
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-white/60 text-lg leading-relaxed"
        >
          Ich hoffe, dass noch so viele weitere Kapitel vor uns liegen.
Noch so viele kleine Momente, über die wir irgendwann lachen werden.
Noch so viele Erinnerungen, die heute vielleicht ganz gewöhnlich wirken,
aber irgendwann zu unseren Lieblingsmomenten werden.

Ich freue mich auf spontane Nächte, auf lange Gespräche,
auf Reisen, auf neue Orte und auf all die kleinen Dinge dazwischen.
Darauf, einfach weiter mit dir durchs Leben zu gehen.

Und ehrlich?
Ich freue mich jetzt schon auf Tunesien mit dir.
Auf Sonne, Meer, warme Nächte, gemeinsames Essen,
und einfach darauf, neue Erinnerungen mit dir zu schaffen —
an einem Ort, den wir irgendwann zusammen mit „uns“ verbinden werden.

Das Schönste an der Zukunft bist für mich nicht irgendwelche Pläne.
Sondern die Tatsache, dass du darin vorkommst.

Egal wo wir später sind,
egal was noch kommt,
ich hoffe einfach,
dass wir weiterhin gemeinsam durchs Leben gehen —
mit all den schönen, chaotischen, lustigen und echten Momenten,
die noch auf uns warten. 

        </motion.p>
      </section>
      <section id="letter" className="min-h-screen flex items-center justify-center px-6 py-28">
  <div className="w-full max-w-3xl text-center">
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
    >
      Abschlussbrief
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12"
    >
      Ein Brief nur für dich
    </motion.h2>

    {!letterOpen ? (
      <motion.button
        onClick={() => setLetterOpen(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto block w-full max-w-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur-xl"
      >
        <div className="mx-auto mb-8 flex h-28 w-40 items-center justify-center rounded-2xl bg-white text-black shadow-2xl">
          <span className="text-5xl">💌</span>
        </div>

        <p className="text-white/50 text-sm uppercase tracking-[0.35em] mb-4">
          Drücke um zu öffnen
        </p>

        <h3 className="text-3xl font-bold">
          Dein Brief wartet auf dich
        </h3>
      </motion.button>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-auto max-w-3xl rounded-[1.5rem] md:rounded-[2rem] bg-white text-black p-8 md:p-14 text-left shadow-2xl"
      >
        <p className="text-black/40 uppercase tracking-[0.35em] text-sm mb-6">
          An dich,
        </p>

        <h3 className="text-4xl md:text-5xl font-bold mb-8">
          Mein Lieblingsmensch
        </h3>

        <p className="text-black/70 text-lg leading-relaxed">
          Mein Schatz, ich bin unfassbar glücklich dich an meiner Seite zu haben. Seit dem Tag, an dem wir uns kennengelernt haben, hast du mein Leben auf so viele Arten bereichert.
          Du bringst so viel Freude, Liebe und Lachen in mein Leben, dass ich manchmal das Gefühl habe, ich könnte platzen vor Glück. 
          Jeder Moment mit dir ist ein Geschenk, und ich schätze jede einzelne Erinnerung, die wir zusammen geschaffen haben.
        </p>

        <p className="mt-8 text-black/70 text-lg leading-relaxed">
          Danke, dass du du bist - so liebevoll, lustig, verständnisvoll und einfach wundervoll. Ich freue mich auf alles, was mich noch so mit dir erwartet.
        </p>

        <p className="mt-10 text-2xl font-semibold">
          Ich liebe dich, für immer und ewig. ❤️
        </p>

        <button
          onClick={() => setLetterOpen(false)}
          className="mt-10 rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-widest text-black/60 hover:bg-black hover:text-white transition"
        >
          Schließe den Brief
        </button>
      </motion.div>
    )}
  </div>
</section>

<section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 2 }}
    className="text-center relative z-10"
  >
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4 }}
      className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight mb-8"
    >
      Ich würde dich immer wieder wählen.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.2, duration: 1.6 }}
      className="text-white/50 text-xl md:text-2xl"
    >
      Jedes Mal aufs Neue. ❤️
    </motion.p>
  </motion.div>

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,180,0.12),transparent_55%)]" />
</section>

      <div id="song" className="fixed bottom-6 right-6 z-50">
  <motion.div
    animate={{
      opacity: musicOpen ? 1 : 0,
      y: musicOpen ? 0 : 30,
      scale: musicOpen ? 1 : 0.96,
      pointerEvents: musicOpen ? "auto" : "none",
    }}
    transition={{ duration: 0.3 }}
    className="mb-4 w-[calc(100vw-3rem)] max-w-[340px] rounded-3xl border border-white/10 bg-black/80 backdrop-blur-2xl p-4 shadow-2xl"
  >
    <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3">
      Unser Song
    </p>

    <iframe
      style={{ borderRadius: "16px" }}
      src="https://open.spotify.com/embed/track/003vvx7Niy0yvhvHt4a68B?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </motion.div>

  <button
    type="button"
    aria-label="Toggle music player"
    onClick={() => setMusicOpen(!musicOpen)}
    className="ml-auto flex items-center gap-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-4 hover:bg-white/20 transition shadow-xl"
  >
    <Music2 size={18} />
    <span className="text-sm uppercase tracking-widest">
      {musicOpen ? "Schließe Song" : "Unser Song"}
    </span>
  </button>
</div>
    </main>
  )
}

export default App