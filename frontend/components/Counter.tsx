'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { increment } from '@/lib/features/counters/counterSlice'
import { Button } from './ui/button'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
    </div>
  )
}