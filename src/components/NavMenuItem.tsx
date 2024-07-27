import { useState } from "react";
import { MenuItemType } from "../types";
import { SubMenu } from "./SubMenu";

export function NavMenuItem ({ item }: { item: MenuItemType }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {"href" in item 
        ? <a href={item.href}>{item.icon} {item.label}</a>
        : <>{item.icon} {item.label}</>
      }
      {item.description &&
        <p>{item.description}</p>
      }
      {"subMenu" in item && 
        <SubMenu 
          items={item.subMenu} 
          direction="down"
          hovered={hovered}
          setHovered={setHovered}
        />
      }
    </li>
  );
}
