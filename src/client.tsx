import { hydrateRoot } from 'react-dom/client'

import App from '@/blocks/App'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app')
  if (container) {
    if (container.hasChildNodes()) {
      hydrateRoot(container, <App />)
    }
  }
})
