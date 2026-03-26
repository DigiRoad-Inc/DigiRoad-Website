import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { motion } from 'motion/react'
import { ArrowRight, Zap } from 'lucide-react'
import { InfiniteSlider } from './components/ui/infinite-slider'

// ─── Constants ────────────────────────────────────────────────────────────────

const HLS_SRC =
  'https://customer-cbeadsgr09pnsezs.cloudflarestream.com/697945ca6b876878dba3b23fbd2f1561/manifest/video.m3u8'
const MP4_FALLBACK = '/_videos/v1/f0c78f536d5f21a047fb7792723a36f9d647daa1'

const LOGOS = [
  { name: 'OpenAI',    src: 'https://html.tailus.io/blocks/customers/openai.svg' },
  { name: 'Nvidia',    src: 'https://html.tailus.io/blocks/customers/nvidia.svg' },
  { name: 'GitHub',    src: 'https://html.tailus.io/blocks/customers/github.svg' },
  { name: 'Google',    src: 'https://html.tailus.io/blocks/customers/google.svg' },
  { name: 'Microsoft', src: 'https://html.tailus.io/blocks/customers/microsoft.svg' },
  { name: 'Stripe',    src: 'https://html.tailus.io/blocks/customers/stripe.svg' },
  { name: 'Vercel',    src: 'https://html.tailus.io/blocks/customers/vercel.svg' },
  { name: 'Laravel',   src: 'https://html.tailus.io/blocks/customers/laravel.svg' },
]

// ─── Fade-up animation preset ─────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // ── HLS video setup ───────────────────────────────────────────────────────

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    const playFallback = () => {
      if (video) {
        video.src = MP4_FALLBACK
        video.play().catch(() => {})
      }
    }

    if (Hls.isSupported()) {
      hls = new Hls({ startLevel: -1, enableWorker: true })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) playFallback()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari — native HLS support
      video.src = HLS_SRC
      video.play().catch(() => {})
    } else {
      playFallback()
    }

    return () => {
      hls?.destroy()
    }
  }, [])

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="relative bg-[#010101] overflow-hidden">

      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Centre top — purple radial bloom */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 50% 0%, rgba(201,103,232,0.28) 0%, transparent 70%)',
          }}
        />
        {/* Left pink accent */}
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(250,147,250,0.4) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Right deep-violet accent */}
        <div
          className="absolute top-1/3 -right-32 w-[500px] h-[500px] opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(152,58,214,0.4) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-4 w-full max-w-5xl mx-auto">

        {/* Announcement pill */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[rgba(28,27,36,0.6)] border border-white/10 backdrop-blur-md">
            {/* Gradient icon with glow */}
            <span className="relative flex-shrink-0">
              <span
                className="absolute inset-0 rounded-md blur-md opacity-70"
                style={{
                  background: 'linear-gradient(135deg, #FA93FA, #C967E8, #983AD6)',
                }}
              />
              <span
                className="relative flex items-center justify-center w-5 h-5 rounded-md"
                style={{
                  background: 'linear-gradient(135deg, #FA93FA, #C967E8, #983AD6)',
                }}
              >
                <Zap className="w-3 h-3 text-white" fill="white" />
              </span>
            </span>
            <span className="text-sm text-white/70 font-medium">
              Used by founders. Loved by devs.
            </span>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-bold tracking-tight leading-[1.05]"
          style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}
        >
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(180deg, #ffffff 60%, rgba(255,255,255,0.55) 100%)',
            }}
          >
            Your Vision
          </span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #FA93FA 0%, #C967E8 50%, #983AD6 100%)',
            }}
          >
            Our Digital Reality.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-white/70 font-normal leading-relaxed max-w-[540px]"
          style={{ fontSize: 'clamp(16px, 1.5vw, 18px)' }}
        >
          We turn bold ideas into modern designs that don&apos;t just look
          amazing — they grow your business fast.
        </motion.p>

        {/* CTA button */}
        <motion.div {...fadeUp(0.3)} className="mt-8">
          {/* Outer glass-gradient ring */}
          <div
            className="p-px rounded-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(250,147,250,0.35), rgba(201,103,232,0.2), rgba(152,58,214,0.1))',
            }}
          >
            <button
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-[#0a0a0a] font-semibold text-sm hover:bg-white/90 transition-colors duration-200"
            >
              Book a 15-min call
              {/* Arrow circle with gradient */}
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-200 group-hover:scale-110"
                style={{
                  background:
                    'linear-gradient(135deg, #FA93FA 0%, #C967E8 50%, #983AD6 100%)',
                }}
              >
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </div>
        </motion.div>

      </div>

      {/* ── Video ── */}
      <div className="relative z-10 w-full -mt-[150px]">

        {/* Left / right edge fade */}
        <div
          className="absolute inset-y-0 left-0 right-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(90deg, #010101 0%, transparent 18%, transparent 82%, #010101 100%)',
          }}
        />

        {/* Bottom fade into the logo cloud */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #010101 100%)',
          }}
        />

        {/* Top fade to blend with content */}
        <div
          className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, #010101 0%, transparent 100%)',
          }}
        />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full mix-blend-screen"
          style={{ height: 'auto', display: 'block' }}
        />
      </div>

      {/* ── Logo cloud ── */}
      <div className="relative z-20 w-full bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center min-h-[64px]">

          {/* "Powering..." label */}
          <div className="flex-shrink-0 px-6 md:px-10 py-4 md:py-0 md:border-r border-white/8 flex items-center">
            <span className="text-xs font-medium tracking-wide text-white/35 whitespace-nowrap uppercase">
              Powering the best teams
            </span>
          </div>

          {/* Infinite logo slider — adapted from DigiRoad ticker animation */}
          <div className="flex-1 min-w-0 py-4 md:py-0 px-4 overflow-hidden">
            <InfiniteSlider duration={35} gap={56} className="py-2">
              {LOGOS.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  height={20}
                  className="h-5 w-auto brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-300 select-none"
                  draggable={false}
                />
              ))}
            </InfiniteSlider>
          </div>

        </div>
      </div>

    </section>
  )
}
