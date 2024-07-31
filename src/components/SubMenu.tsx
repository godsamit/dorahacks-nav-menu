import { ParentMenuItem } from "../types";
import { MenuItem } from "./MenuItem";
import classes from "./styles/SubMenu.module.css";

export function SubMenu ({ 
  item, depth, open, currentIndex
}: {
  item: ParentMenuItem,
  depth: number, 
  open: boolean, 
  currentIndex: number
}) {
  // Keeping the component mounted to keep focus state in submenu menuItems
  return (
    <menu
      role="menu"
      className={`${classes.subMenu} ${depth === 1 ? classes.down : classes.right} ${open && classes.open}`}
      style={{ visibility: open ? "visible" : "hidden"}}
      data-testid={`${item.label}-menu`}
    >
      {item.subMenu.map((item, index) => (
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
