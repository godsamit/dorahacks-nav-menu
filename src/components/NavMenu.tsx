import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import { useNavMenuBar } from "./hooks";
import classes from "./styles/NavMenu.module.css";

export function NavMenu ({ items }: { items : MenuItemType[] }) {
  const [currentIndex, handleKeyDown] = useNavMenuBar(items);

  return <nav className={`${classes.nav}`}>
    <menu 
      className={`flex ${classes.menu}`}
      role="menubar"
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => 
        <MenuItem 
          key={item.label}
          item={item} 
          depth={1} 
          index={index}
          currentIndex={currentIndex}
        />
      )}
    </menu>
  </nav>
}
