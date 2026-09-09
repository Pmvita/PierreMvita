import { CapabilityLanes } from "@/components/skills/CapabilityLanes"
import { Contact } from "@/components/contact/Contact"
import { Timeline } from "@/components/experience/Timeline"
import { Hero } from "@/components/hero/Hero"
import { SiteNav } from "@/components/nav/SiteNav"
import { Scene } from "@/components/scene/Scene"
import { WorkList } from "@/components/work/WorkList"

export default function Home() {
  return (
    <>
      <div className="scene-fallback" aria-hidden />
      <Scene />
      <div className="site-content">
        <SiteNav />
        <main>
          <Hero />
          <WorkList />
          <CapabilityLanes />
          <Timeline />
          <Contact />
        </main>
      </div>
    </>
  )
}
