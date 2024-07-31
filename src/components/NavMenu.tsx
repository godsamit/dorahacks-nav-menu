import { useEffect, useState } from "react";
import { MenuItemType } from "../types";
import { MenuItem } from "./MenuItem";
import { useMediaQueryContext, useNavMenuBar } from "./hooks";
import classes from "./styles/NavMenu.module.css";

export function NavMenu ({ items }: { items : MenuItemType[] }) {
  const [currentIndex, handleKeyDown] = useNavMenuBar(items);

  const isLargeScreen = useMediaQueryContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLargeScreen) {
      setOpen(true);
    }
  }, [isLargeScreen])


  return <nav className={`${classes.nav}`}>
    <div>
      <a href="/" aria-label="DoraHacks">
        <IconDoraLogo />
      </a>
      {!isLargeScreen && (
        <button 
          className={`${classes.button}`}
          onClick={() => setOpen(!open)}
          aria-haspopup={true}
          aria-expanded={open}
        >
          {open ? <IconMdiClose /> : <IconMdiMenu />}
        </button>
      )}
    </div>
    {/* Keeping the component mounted to keep focus state in submenus */}
    <menu 
      className={`flex ${classes.menu} ${open ? classes.open : ""}`}
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
