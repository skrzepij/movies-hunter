import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { PageLayout } from './PageLayout'

describe('PageLayout Component', () => {
  it('should render children', () => {
    const { getByText } = render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <PageLayout className="custom-class">
        <div>Content</div>
      </PageLayout>
    )

    const pageContainer = container.firstChild as HTMLElement
    expect(pageContainer.className).toContain('custom-class')
  })
})
