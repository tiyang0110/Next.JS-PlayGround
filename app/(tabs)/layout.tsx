import AlarmBar from "@/components/alarm-bar";
import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }:{children: React.ReactNode}){
  return (
    <>
      <AlarmBar />
      {children}
      <TabBar />
    </>
  )
}