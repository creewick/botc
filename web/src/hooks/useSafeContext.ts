import { Context, useContext } from 'react'

function useSafeContext<T>(context: Context<T | null>): T {
  const safeContext = useContext(context)
  if (!safeContext) {
    throw new Error(`useSafeContext must be used within a ${context.displayName}.Provider`)
  }
  return safeContext
}

export default useSafeContext