import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import classes from "./styles/NavMenu.module.css";

export function NavMenu ({ items }: { items : MenuItemType[] }) {
  return <nav className={`${classes.nav}`}>
    <menu className={`flex ${classes.menu}`}>
      {items.map((item) => 
        <MenuItem item={item} depth={1}/>
      )}
    </menu>
  </nav>
}
