import { MenuItemType } from "../types";
import { NavMenuItem } from "./NavMenuItem";


export function NavMenu ({ items }: { items : MenuItemType[] }) {
  return <nav>
    <menu>
      {items.map((item, index) => 
        <NavMenuItem item={item} />
      )}
    </menu>
  </nav>
}
