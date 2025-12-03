import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import gsap from 'gsap'

interface UseInfiniteScrollOptions {
    duration?: number
    ease?: string
    pauseOnHover?: boolean
}

/**
 * Composable para crear animaciones de scroll infinito horizontal
 * @param options - Opciones de configuración para la animación
 * @returns Ref del elemento que debe contener el contenido duplicado
 */
export const useInfiniteScroll = (options: UseInfiniteScrollOptions = {}) => {
    const { duration = 20, ease = 'none', pauseOnHover = true } = options

    const trackRef = ref<HTMLElement | null>(null)
    let animation: gsap.core.Tween | null = null

    const handleMouseEnter = () => {
        if (animation && pauseOnHover) {
            animation.pause()
        }
    }

    const handleMouseLeave = () => {
        if (animation && pauseOnHover) {
            animation.resume()
        }
    }

    onMounted(() => {
        if (trackRef.value) {
            const track = trackRef.value
            const firstChild = track.firstElementChild as HTMLElement

            if (firstChild) {
                const width = firstChild.offsetWidth

                // Animación infinita de derecha a izquierda
                animation = gsap.to(track, {
                    x: -width,
                    duration,
                    ease,
                    repeat: -1,
                })

                // Agregar event listeners para pausar/reanudar en hover
                if (pauseOnHover) {
                    const container = track.parentElement
                    if (container) {
                        container.addEventListener('mouseenter', handleMouseEnter)
                        container.addEventListener('mouseleave', handleMouseLeave)
                    }
                }
            }
        }
    })

    onBeforeUnmount(() => {
        if (animation) {
            animation.kill()
        }

        // Limpiar event listeners
        if (trackRef.value && pauseOnHover) {
            const container = trackRef.value.parentElement
            if (container) {
                container.removeEventListener('mouseenter', handleMouseEnter)
                container.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    })

    return {
        trackRef
    }
}
