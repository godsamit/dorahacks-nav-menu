import { Dispatch, SetStateAction } from "react";
import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import classes from "./styles/SubMenu.module.css";

export function SubMenu ({ 
  items, direction, hovered, setHovered 
}: {
  items: MenuItemType[],
  direction: "right" | "down", 
  hovered: boolean, 
  setHovered: Dispatch<SetStateAction<boolean>>
}) {
  return hovered &&
    <menu
      className={`
        ${classes.subMenu} 
        ${direction === "right" ? classes.right : classes.down}
      `}
      onMouseLeave={() => setHovered(false)}
    >
      {items.map((item, index) => <MenuItem item={item} />)}
    </menu>;
}
