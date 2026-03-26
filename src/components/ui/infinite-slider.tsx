import { useAnimationFrame, useMotionValue, motion } from 'motion/react'
import useMeasure from 'react-use-measure'
import { cn } from '../../lib/utils'

interface InfiniteSliderProps {
  children: React.ReactNode
  /** Seconds to complete one full loop */
  duration?: number
  /** Gap between items in px */
  gap?: number
  reverse?: boolean
  pauseOnHover?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  duration = 40,
  gap = 48,
  reverse = false,
  pauseOnHover = true,
  className,
}: InfiniteSliderProps) {
  const [ref, { width }] = useMeasure()
  const x = useMotionValue(0)
  const isPaused = useMotionValue(false)

  useAnimationFrame((_, delta) => {
    if (!width || isPaused.get()) return

    const pxPerMs = width / (duration * 1000)
    const move = pxPerMs * delta

    let next = x.get() + (reverse ? move : -move)

    // Seamless loop: reset when one full set has scrolled past
    if (!reverse && next <= -width) next = 0
    if (reverse && next >= 0) next = -width

    x.set(next)
  })

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && isPaused.set(true)}
      onMouseLeave={() => pauseOnHover && isPaused.set(false)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {/* First set — measured for loop reset */}
        <div
          ref={ref}
          className="flex shrink-0 items-center"
          style={{ gap }}
          aria-hidden="false"
        >
          {children}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          className="flex shrink-0 items-center"
          style={{ gap }}
          aria-hidden="true"
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
