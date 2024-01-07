export interface SidebarMenuItem {
    //Interface (Model) for Sidebar Menu Items
    //leeping path|icon|active|children as optional fields
    title: string,
    icon?:string,
    active?: boolean, 
    type: string,
    path?:string,
    children?:SidebarMenuItem[]
}
