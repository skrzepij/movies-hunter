import { describe, it, expect } from 'vitest'

import { IMAGE_SIZES } from './config'
import { buildImageUrl, formatVoteAverage, formatRuntime } from './helpers'

describe('Helper Functions', () => {
  describe('buildImageUrl', () => {
    it('returns placeholder for null path', () => {
      expect(buildImageUrl(null)).toBe('/placeholder-movie.svg')
    })

    it('builds correct TMDb URL', () => {
      const path = '/test-poster.jpg'
      const result = buildImageUrl(path)
      expect(result).toContain('/t/p/')
      expect(result).toContain(path)
    })

    it('uses custom size', () => {
      const path = '/test.jpg'
      const size = IMAGE_SIZES.POSTER.LARGE
      const result = buildImageUrl(path, size)
      expect(result).toContain(size)
    })
  })

  describe('formatVoteAverage', () => {
    it('formats vote average to one decimal place', () => {
      expect(formatVoteAverage(7.123)).toBe('7.1')
      expect(formatVoteAverage(8.0)).toBe('8.0')
      expect(formatVoteAverage(6.99)).toBe('7.0')
    })
  })

  describe('formatRuntime', () => {
    it('formats runtime correctly', () => {
      expect(formatRuntime(90)).toBe('1 godz 30 min')
      expect(formatRuntime(60)).toBe('1 godz')
      expect(formatRuntime(45)).toBe('45 min')
      expect(formatRuntime(0)).toBe('Nieznany')
    })
  })
})
