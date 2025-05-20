import { useState } from 'react';
import { $island } from '@/islands/utils'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function Sandbox() {
  const [ count, setCount ] = useState(0)

  return (
    <>
      <h2>Counter</h2>
      <Button
        className="m-5"
        onClick={() => { setCount(count+1) }}
      >Click me</Button>
      count: { count }

      <h2>Toaster</h2>
      <Button
        onClick={() => { toast("hello toaster") }}
      >show toaster</Button>
    </>
  )
}

export default $island(Sandbox)
