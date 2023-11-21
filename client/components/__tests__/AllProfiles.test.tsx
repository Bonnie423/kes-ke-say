import { describe, it, expect } from 'vitest'
import { screen, waitForElementToBeRemoved } from '@testing-library/react/pure'
import nock from 'nock'

import { renderRoute } from '../../test-utils'

nock.disableNetConnect()

describe('<AllProfiles />', () => {
  it('renders a grid of profiles', () => {
    renderRoute('/profiles')
  })
})
