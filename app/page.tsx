import Card from '@/Components/Home/Card'
import Hero from '@/Components/Home/Hero'
import Homes from '@/Components/Home/Homes'
import Image from 'next/image'

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center">
    <Hero/>
    {/* <Card/> */}
    <Homes/>
    </main>
  )
}
