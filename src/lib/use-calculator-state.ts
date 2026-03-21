'use client'

import { useEffect } from 'react'
import { decodeCalculatorState } from './calculator-utils'

/**
 * Hook to load calculator state from URL ?s= parameter.
 * Uses window.location directly to avoid Suspense boundary requirement.
 */
export function useCalculatorState(
  setters: Record<string, (value: string) => void>
) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('s')
    if (!encoded) return
    const state = decodeCalculatorState(encoded)
    if (!state) return

    for (const [key, setter] of Object.entries(setters)) {
      if (state[key] !== undefined) {
        setter(state[key])
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
