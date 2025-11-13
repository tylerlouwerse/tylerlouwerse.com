<template>
  <canvas
    ref="canvasRef"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  ></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'GraffitiPage',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const isDragging = ref(false)
let lastMouseEvent: MouseEvent | null = null
let animationFrameId: number | null = null

const dotRadius = 1
const sprayRadius = 30
const dotsPerSpray = 120
const dotColor = '#000000'

const setCanvasSize = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const drawSpray = (event: MouseEvent) => {
  if (!canvasRef.value || !ctx) return

  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  const centerX = event.clientX - rect.left
  const centerY = event.clientY - rect.top

  for (let i = 0; i < dotsPerSpray; i++) {
    // Generate random angle
    const angle = Math.random() * Math.PI * 2

    // Generate distance with strong preference for center
    // Using a higher power (3) to strongly favor center points
    // Higher powers create more concentration at the center
    const randomDistance = Math.pow(Math.random(), 1.25) * sprayRadius

    // Calculate position
    const x = centerX + Math.cos(angle) * randomDistance
    const y = centerY + Math.sin(angle) * randomDistance

    // Calculate opacity based on distance from center (gradient effect)
    // Closer to center = more opaque, further = more transparent
    const normalizedDistance = randomDistance / sprayRadius
    const opacity = 1 - normalizedDistance * 0.7 // Fade from 100% to 30% opacity

    // Draw dot with gradient opacity
    ctx.globalAlpha = opacity
    ctx.fillStyle = dotColor
    ctx.beginPath()
    ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Reset global alpha for other operations
  ctx.globalAlpha = 1
}

const continuousSpray = () => {
  if (!isDragging.value || !lastMouseEvent) {
    animationFrameId = null
    return
  }

  drawSpray(lastMouseEvent)
  animationFrameId = requestAnimationFrame(continuousSpray)
}

const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true
  lastMouseEvent = event
  drawSpray(event)
  continuousSpray()
}

const handleMouseMove = (event: MouseEvent) => {
  lastMouseEvent = event
  if (isDragging.value) {
    drawSpray(event)
  }
}

const handleMouseUp = () => {
  isDragging.value = false
  lastMouseEvent = null
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const handleResize = () => {
  if (!canvasRef.value || !ctx) return

  const canvas = canvasRef.value
  const currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  setCanvasSize()

  if (ctx && currentImageData) {
    ctx.putImageData(currentImageData, 0, 0)
  }
}

onMounted(() => {
  if (!canvasRef.value) return

  ctx = canvasRef.value.getContext('2d')
  setCanvasSize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  cursor: crosshair;
}
</style>
