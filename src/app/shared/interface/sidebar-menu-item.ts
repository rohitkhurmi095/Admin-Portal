export interface SidebarMenuItem {
    //Interface (Model) for Sidebar Menu Items
    //keeping path|icon|active|children as optional fields
    title: string,
    icon?:string,
    active?: boolean, 
    type: string,
    path?:string,
    actionName?: string,
    children?:SidebarMenuItem[]
}
