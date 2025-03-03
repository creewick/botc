import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { GamesContext } from './contexts/GamesProvider';

test('renders without crashing', () => {
  const { baseElement } = render(<App />)
  const gamesContext = useContext(GamesContext)

console.log(gamesContext)

  expect(baseElement).toBeDefined()
})
