import { Dispatch, SetStateAction } from "react";
import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import classes from "./styles/SubMenu.module.css";

export function SubMenu ({ 
  items, depth, hovered, setHovered 
}: {
  items: MenuItemType[],
  depth: number, 
  hovered: boolean, 
  setHovered: Dispatch<SetStateAction<boolean>>
}) {
  return hovered &&
    <menu
      className={`
        ${classes.subMenu} 
        ${depth === 1 ? classes.down : classes.right}
      `}
      onMouseLeave={() => setHovered(false)}
    >
      {items.map((item) => <MenuItem item={item} depth={depth+1} />)}
    </menu>;
}
