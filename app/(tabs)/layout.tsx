import TabBar from "@/components/tabbar";

export default function TabLayout({ children }:{children: React.ReactNode}){
  return (
    <>
      {children}
      <TabBar />
    </>
  )
}