import { route } from 'ziggy-js'

export default function useRoute(name: string, params?: any) {
  try {
    return route(name, params)
  } catch (e) {
    console.error(`Route ${name} not found.`)

    return route('404')
  }
}

export function currentRoute(name: string) {
  return route().current(name)
}
