import { Dispatch, SetStateAction } from "react";
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
  return open &&
    <menu
      className={`
        ${classes.subMenu} 
        ${depth === 1 ? classes.down : classes.right}
      `}
      // onMouseLeave={() => setHovered(false)}
    >
      {items.map((item, index) => (
        <MenuItem 
          item={item} 
          depth={depth+1} 
          index={index}
          currentIndex={currentIndex}
          open={open}
        />
      ))}
    </menu>;
}
