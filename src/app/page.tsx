'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { increment, decrement } from '@/redux/Features/counter/counterSlice'


export default function Home() {
  const dispatch = useDispatch()
  const counter = useSelector((state: RootState) => state.counter.value)

  return (
    <>
      <h1>Testing</h1>
      <hr />
      <button onClick={() => dispatch(increment())}>Incrementar</button>
      <hr />
      <button onClick={() => dispatch(decrement())}>Decrementar</button>
      <hr />
      {counter}
    </>
  )
}
