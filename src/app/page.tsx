import HomeComponent from '@/components/homecomponent'
import Navbar from '@/components/shared/navbar' 

export default function Home() {
  return (
    <div className=' w-full h-screen ' >
      <Navbar />
      <div className=' w-[625px] h-[392px] bg-[#828282] rounded-br-2xl opacity-20 absolute top-0 left-0 ' />
      <HomeComponent />
    </div>
  )
}
