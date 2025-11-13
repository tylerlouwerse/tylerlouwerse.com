<template>
  <div class="enso-container">
    <div class="hard-edge" :style="hardEdgeStyle"></div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useSprayPaint } from '@/composables/useSprayPaint'

// Constants
const SPRAY_PAINT_CONFIG = {
  dotRadius: 1.25,
  sprayRadius: 25,
  sprayStrength: 1.8,
  dotsPerSpray: 325,
  dotColor: '#9D2933',
} as const

const ENSO_CONFIG = {
  radiusMultiplier: 0.36,
  gapAngle: Math.PI / 10,
  angleOffset: Math.PI / 0.58,
  pathSteps: 120,
  imperfectionBase: 0.97,
  imperfectionRange: 0.06,
  sinAmplitude: 0.04,
  sinFrequency: 3,
  randomOffset: 0.5,
  sinFadeMin: 0.5,
  sinFadeMax: 0.7,
  randomNoise: 0.018,
} as const

const ANIMATION_CONFIG = {
  duration: 1000,
  initialDelay: 800,
  resizeDebounce: 150,
} as const

// Types
type CanvasSize = { width: number; height: number }
type CleanupFunction = () => void

// Refs
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasSize = ref<CanvasSize>({ width: 0, height: 0 })

// Composables
const { sprayPaintPath } = useSprayPaint(SPRAY_PAINT_CONFIG)

// State
let animationCleanup: CleanupFunction | null = null
let resizeTimeout: ReturnType<typeof setTimeout> | null = null

const hardEdgeSize = computed(() => {
  const { width, height } = canvasSize.value
  if (width === 0 || height === 0) return 0

  const minSize = Math.min(width, height)
  return minSize * ENSO_CONFIG.radiusMultiplier * 2 // diameter
})

const hardEdgeStyle = computed(() => {
  const size = hardEdgeSize.value
  return {
    width: `${size}px`,
    height: `${size}px`,
  }
})

// Canvas utilities
const getCanvasContext = (): CanvasRenderingContext2D | null => {
  return canvasRef.value?.getContext('2d') ?? null
}

const resizeCanvas = (): void => {
  const canvas = canvasRef.value
  if (!canvas) return

  const container = canvas.parentElement
  if (!container) return

  const rect = container.getBoundingClientRect()
  const { width: oldWidth, height: oldHeight } = canvas
  const { width: newWidth, height: newHeight } = rect

  // Skip if dimensions unchanged
  if (oldWidth === newWidth && oldHeight === newHeight) return

  // Clear existing content before resize
  const ctx = getCanvasContext()
  if (ctx) {
    ctx.clearRect(0, 0, oldWidth, oldHeight)
  }

  // Resize canvas (automatically clears it)
  canvas.width = newWidth
  canvas.height = newHeight

  // Update size state
  canvasSize.value = { width: newWidth, height: newHeight }
}

// Enso path generation
const generateEnsoPath = (canvas: HTMLCanvasElement): string => {
  const minSize = Math.min(canvas.width, canvas.height)
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const baseRadius = minSize * ENSO_CONFIG.radiusMultiplier
  const gap = ENSO_CONFIG.gapAngle
  const angleRange = 2 * Math.PI - gap

  // Randomize overall shape imperfection
  const overallImperfection =
    ENSO_CONFIG.imperfectionBase + Math.random() * ENSO_CONFIG.imperfectionRange

  const pathPoints: string[] = []

  for (let i = 0; i <= ENSO_CONFIG.pathSteps; i++) {
    const progress = i / ENSO_CONFIG.pathSteps
    const angle = ENSO_CONFIG.angleOffset + gap / 2 + progress * angleRange

    // Calculate local imperfection with sinusoidal variation
    const sinWave =
      Math.sin(angle * ENSO_CONFIG.sinFrequency + Math.random() * ENSO_CONFIG.randomOffset) *
      (Math.sin(angle) * ENSO_CONFIG.sinFadeMin + ENSO_CONFIG.sinFadeMax)
    const randomNoise = (Math.random() - 0.5) * ENSO_CONFIG.randomNoise

    const localImperfection = 1 + ENSO_CONFIG.sinAmplitude * sinWave + randomNoise
    const radius = baseRadius * overallImperfection * localImperfection

    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    pathPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)
  }

  return pathPoints.join(' ')
}

// Animation management
const cancelAnimation = (): void => {
  if (animationCleanup) {
    animationCleanup()
    animationCleanup = null
  }
}

const drawEnso = (): void => {
  const canvas = canvasRef.value
  if (!canvas) return

  cancelAnimation()

  const arcPath = generateEnsoPath(canvas)
  animationCleanup = sprayPaintPath(canvas, arcPath, ANIMATION_CONFIG.duration)
}

// Resize handling
const handleResize = (): void => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  resizeTimeout = setTimeout(() => {
    if (!canvasRef.value) {
      resizeTimeout = null
      return
    }

    cancelAnimation()
    resizeCanvas()
    drawEnso()

    resizeTimeout = null
  }, ANIMATION_CONFIG.resizeDebounce)
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  if (!canvasRef.value) return

  resizeCanvas()
  window.addEventListener('resize', handleResize)

  setTimeout(() => {
    drawEnso()
  }, ANIMATION_CONFIG.initialDelay)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)

  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }

  cancelAnimation()
})
</script>

<style scoped>
.enso-container {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.hard-edge {
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
</style>
