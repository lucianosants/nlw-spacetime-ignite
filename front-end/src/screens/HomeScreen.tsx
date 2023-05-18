import { cookies } from 'next/headers'

import { SignIn } from '../components/SignIn'
import { Hero } from '../components/Hero'
import { Copyright } from '../components/Copyright'

import EmptyMemories from '../components/EmptyMemories'
import { Profile } from '../components/Profile'

export function HomeScreen() {
  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid min-h-screen grid-cols-2">
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../src/assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[18rem] w-[32.875rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {isAuthenticated ? <Profile /> : <SignIn />}

        <Hero />

        <Copyright />
      </section>

      <section className="flex flex-col bg-[url(../src/assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </section>
    </main>
  )
}
