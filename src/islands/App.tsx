import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function App() {
  return (
    <>
      <h1 className="text-xl m-5">Hello World</h1>
      <Counter />
      <Checkbox className="m-5">checkbox</Checkbox>
    </>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button
      className="m-5"
      onClick={() => setCount(count+1)}
    >You clicked me {count} times</Button>
  )
}
