import TabBar from "@/components/tab-bar";


export default function TabLayout({ children }:{children: React.ReactNode}){
  return (
    <div className="h-full grid grid-rows-[1fr_80px]">
      {children}
      <TabBar />
    </div>
  )
}