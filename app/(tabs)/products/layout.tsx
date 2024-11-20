export default function ProductsLayout({ children, modal }:{
  children: React.ReactNode,
  modal: React.ReactNode
}){
  return (
    <div className="flex flex-col overflow-y-auto scrollbar-hide">
      {children}
      {modal}
    </div>
  )
}