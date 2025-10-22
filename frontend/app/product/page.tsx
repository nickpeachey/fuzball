'use client';
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import {
    increment, decrement, incrementByAmount
} from "@/lib/features/counters/counterSlice";
import Counter from "@/components/Counter";




export default function ProductPage() {
    const count = useAppSelector((state => state.counter.value));
    const dispatch = useAppDispatch();

    return (
        <div>
            <Counter />
        </div>
    )
}

