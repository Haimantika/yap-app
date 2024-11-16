"use client"

import HomePage from "@/features/HomePage"
import Block1 from "@/components/Block1"
import Block2 from "@/components/Block2"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 lg:p-20">
      <Block1 />
      <Block2 />
      <HomePage />
      
    </main>
  )
}
