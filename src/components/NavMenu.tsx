import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import { useMediaQueryContext, useNavMenuBar } from "./hooks";
import classes from "./styles/NavMenu.module.css";

export function NavMenu ({ items }: { items : MenuItemType[] }) {
  const [currentIndex, handleKeyDown] = useNavMenuBar(items);

  const isLargeScreen = useMediaQueryContext();

  return <nav className={`${classes.nav}`}>
    <a href="/">
      <IconDoraLogo />
    </a>
    <menu 
      className={`flex ${classes.menu}`}
      role="menubar"
      aria-orientation={isLargeScreen ? "horizontal" : "vertical"}
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
