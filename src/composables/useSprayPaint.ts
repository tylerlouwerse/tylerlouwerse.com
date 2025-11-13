type SprayPaintOptions = {
  dotRadius: number
  sprayRadius: number
  sprayStrength: number
  dotsPerSpray: number
  dotColor: string
}

export const useSprayPaint = (options: SprayPaintOptions) => {
  const { dotRadius, sprayRadius, sprayStrength, dotsPerSpray, dotColor } = options

  const sprayPaint = (canvas: HTMLCanvasElement, coordinates: { x: number; y: number }) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const centerX = coordinates.x - rect.left
    const centerY = coordinates.y - rect.top

    for (let i = 0; i < dotsPerSpray; i++) {
      // Generate random angle
      const angle = Math.random() * Math.PI * 2

      // Generate distance with strong preference for center
      // Using a higher power (3) to strongly favor center points
      // Higher powers create more concentration at the center
      const randomDistance = Math.pow(Math.random(), sprayStrength) * sprayRadius

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

  const sprayPaintPath = (
    canvas: HTMLCanvasElement,
    pathString: string,
    duration: number,
  ): (() => void) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return () => {}

    // Create SVG path element to measure path length and get points
    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    svgPath.setAttribute('d', pathString)
    const pathLength = svgPath.getTotalLength()

    // Calculate number of points based on path length and spray radius
    // More points for longer paths to ensure smooth animation
    const pointsPerSprayRadius = 2 // Points per spray radius unit
    const numPoints = Math.max(
      Math.ceil((pathLength / sprayRadius) * pointsPerSprayRadius),
      10, // Minimum 10 points
    )

    // Generate evenly spaced points along the path
    const points: { x: number; y: number }[] = []
    for (let i = 0; i <= numPoints; i++) {
      const distance = (i / numPoints) * pathLength
      const point = svgPath.getPointAtLength(distance)
      points.push({ x: point.x, y: point.y })
    }

    // Get canvas bounding rect once for coordinate conversion
    const rect = canvas.getBoundingClientRect()

    // Animation state
    let startTime: number | null = null
    let animationFrameId: number | null = null
    let currentPointIndex = 0

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Calculate which point we should be at
      const targetPointIndex = Math.floor(progress * (points.length - 1))

      // Spray paint at all points up to the current target
      while (currentPointIndex <= targetPointIndex && currentPointIndex < points.length) {
        const point = points[currentPointIndex]
        if (point) {
          // Convert canvas coordinates to client coordinates for sprayPaint
          sprayPaint(canvas, {
            x: point.x + rect.left,
            y: point.y + rect.top,
          })
        }
        currentPointIndex++
      }

      // Continue animation if not complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        animationFrameId = null
      }
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    // Return cleanup function
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }

  return {
    sprayPaint,
    sprayPaintPath,
  }
}
