"use client"

import { useState } from "react"

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        My First Web App
      </h1>

      <p className="mt-4 text-xl">
        Button clicked: {count}
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="mt-6 rounded-xl bg-blue px-6 py-3 text-white hover:opacity-80"
      >
        Click Me
      </button>
    </main>
  )
}