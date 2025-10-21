'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import {increment } from '@/lib/features/counters/counterSlice'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  )
}