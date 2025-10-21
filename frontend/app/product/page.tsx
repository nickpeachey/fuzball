'use client';
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import {
    increment, decrement, incrementByAmount
} from "@/lib/features/counters/counterSlice";




export default function ProductPage() {
    const count = useAppSelector((state => state.counter.value));
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Product Page</h1>
            <p>This is the product page content.</p>
            <div>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
            </div>
            <p>Current Count: {count}</p>
        </div>
    )
}

