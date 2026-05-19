import { useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, Music2 } from "lucide-react"
import { label } from "framer-motion/client"

const memories = [
  {
    title: "Our first moment",
    text: "Write about the moment everything started.",
    image: `${import.meta.env.BASE_URL}/images/photo-1.jpg`,
  },
  {
    title: "A day I’ll never forget",
    text: "Write about a special day, trip, date, or random memory.",
    image: `${import.meta.env.BASE_URL}/images/photo-2.jpg`,
  },
  {
    title: "The little things",
    text: "Write about small things she does that mean a lot to you.",
    image: `${import.meta.env.BASE_URL}/images/photo-3.jpg`,
  },
]

const timeline = [
  {
    date: "The beginning",
    title: "When we first met",
    text: "Write about how everything started.",
  },
  {
    date: "Our first date",
    title: "The first real memory",
    text: "Write about your first date or first special moment.",
  },
  {
    date: "Now",
    title: "What you mean to me",
    text: "Write about what she means to you today.",
  },
]

const relationshipStartDate = new Date("2024-07-20")

function getDaysTogether() {
  const today = new Date()
  const difference = today - relationshipStartDate
  return Math.floor(difference / (1000 * 60 * 60 * 24))
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const daysTogether = getDaysTogether()
  const { scrollY } = useScroll()

  const heroGlowY = useTransform(scrollY, [0, 700], [0, 180])
  const heroTextY = useTransform(scrollY, [0, 700], [0, -80])
  const imageY = useTransform(scrollY, [300, 1200], [80, -80])

  const navItems = [
    { label: "Start", href: "#top" },
    { label: "How it started", href: "#story" },
    { label: "Counter", href: "#counter"},
    { label: "Memories", href: "#memories" },
    { label: "Future", href: "#future" },
    { label: "Timeline", href: "#timeline" },
    { label: "Final Letter", href: "#letter" },
  ]
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
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
            className="absolute right-0 mt-4 w-56 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl p-3 shadow-2xl"
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

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
            Our Story
          </h1>

          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            I made this little place for us — for the memories we have,
            the moments I never want to forget, and everything still waiting for us.
          </p>

          <a
            href="#story"
            className="inline-block mt-12 rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            Begin
          </a>
        </motion.div>
      </section>

      <section id="story" className="px-6 py-28 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-16"
        >
          How it started
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8"
          >
            <p className="text-white/50 mb-4">Chapter One</p>
            <h3 className="text-3xl font-semibold mb-4">
              The beginning of us
            </h3>
            <p className="text-white/60 leading-relaxed">
              This is where you can write about how everything started:
              the first message, the first date, the first moment you realized
              she was special.
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

<section id="counter" className="px-6 py-24 max-w-5xl mx-auto text-center">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-10 md:p-16"
  >
    <p className="text-white/40 uppercase tracking-[0.4em] text-sm mb-6">
      Since us
    </p>

    <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
      {daysTogether}
    </h2>

    <p className="text-white/60 text-xl">
      days together
    </p>
  </motion.div>
</section>

      <section id="memories" className="px-6 py-28 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
        >
          Memories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-16"
        >
          Moments I never want to forget
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

      <section id="future" className="px-6 py-28 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
        >
          The future
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          And everything still waiting for us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-white/60 text-lg leading-relaxed"
        >
          Here you can write about dreams, future trips, little plans,
          and everything you still want to experience together.
        </motion.p>
      </section>

<section id="timeline" className="px-6 py-28 max-w-4xl mx-auto">
  <p className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5">
    Timeline
  </p>

  <h2 className="text-4xl md:text-6xl font-bold mb-16">
    Little chapters of us
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

      <section id="letter" className="min-h-screen flex items-center justify-center px-6 py-28">
  <div className="w-full max-w-3xl text-center">
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-white/40 uppercase tracking-[0.4em] text-sm mb-5"
    >
      Final letter
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-4xl md:text-6xl font-bold mb-12"
    >
      A letter for you
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
        className="relative mx-auto block w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur-xl"
      >
        <div className="mx-auto mb-8 flex h-28 w-40 items-center justify-center rounded-2xl bg-white text-black shadow-2xl">
          <span className="text-5xl">💌</span>
        </div>

        <p className="text-white/50 text-sm uppercase tracking-[0.35em] mb-4">
          Tap to open
        </p>

        <h3 className="text-3xl font-bold">
          Your letter is waiting
        </h3>
      </motion.button>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-auto max-w-3xl rounded-[2rem] bg-white text-black p-8 md:p-14 text-left shadow-2xl"
      >
        <p className="text-black/40 uppercase tracking-[0.35em] text-sm mb-6">
          To you,
        </p>

        <h3 className="text-4xl md:text-5xl font-bold mb-8">
          My favorite person
        </h3>

        <p className="text-black/70 text-lg leading-relaxed">
          This is where your final letter goes. Make it honest, simple,
          and personal. Not too perfect — just real.
        </p>

        <p className="mt-8 text-black/70 text-lg leading-relaxed">
          Thank you for being you, for making ordinary days feel special,
          and for being the person I am so lucky to love.
        </p>

        <p className="mt-10 text-2xl font-semibold">
          Happy Anniversary ❤️
        </p>

        <button
          onClick={() => setLetterOpen(false)}
          className="mt-10 rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-widest text-black/60 hover:bg-black hover:text-white transition"
        >
          Close letter
        </button>
      </motion.div>
    )}
  </div>
</section>
      <div id="song" className="fixed bottom-6 right-6 z-50">
  <AnimatePresence>
    {musicOpen && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="mb-4 w-[calc(100vw-3rem)] max-w-[340px] rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl p-4 shadow-2xl"
      >
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3">
          Our Song
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
    )}
  </AnimatePresence>

  <button
    type="button"
    aria-label="Toggle music player"
    onClick={() => setMusicOpen(!musicOpen)}
    className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-4 hover:bg-white/20 transition shadow-xl"
  >
    <Music2 size={18} />
    <span className="text-sm uppercase tracking-widest">
      {musicOpen ? "Close Music" : "Our Song"}
    </span>
  </button>
</div>
    </main>
  )
}

export default App