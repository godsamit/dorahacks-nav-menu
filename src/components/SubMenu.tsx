import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import classes from "./styles/SubMenu.module.css";

export function SubMenu ({ 
  items, depth, open, currentIndex
}: {
  items: MenuItemType[],
  depth: number, 
  open: boolean, 
  currentIndex: number
}) {
  return (
    <menu
      role="menu"
      className={`${classes.subMenu} ${depth === 1 ? classes.down : classes.right} ${open && classes.open}`}
    >
      {items.map((item, index) => (
        <MenuItem 
          key={item.label}
          item={item} 
          depth={depth+1} 
          index={index}
          currentIndex={currentIndex}
          open={open}
        />
      ))}
    </menu>
  );
}
