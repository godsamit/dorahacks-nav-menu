import { MenuItemType } from "../types";

export function MenuItem ({ item }: { item: MenuItemType }) {
  return <li>{item.label}</li>
}