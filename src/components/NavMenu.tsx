import { MenuItemType } from "../types";
import { NavMenuItem } from "./NavMenuItem";
import classes from "./styles/NavMenu.module.css";

export function NavMenu ({ items }: { items : MenuItemType[] }) {
  return <nav className={`${classes.nav}`}>
    <menu className={`flex ${classes.menu}`}>
      {items.map((item, index) => 
        <NavMenuItem item={item} />
      )}
    </menu>
  </nav>
}
