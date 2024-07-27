import { MenuItemType } from "../types";
import { SubMenu } from "./SubMenu";

export function NavMenuItem ({ item }: { item: MenuItemType }) {
  return <li>
    {item.icon} {item.label}
    {item.subMenu && <SubMenu items={item.subMenu} />}
  </li>
}
