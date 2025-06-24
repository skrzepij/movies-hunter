// Simple localStorage utilities for type-safe storage operations

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },

  clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  },

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null
  }
}
