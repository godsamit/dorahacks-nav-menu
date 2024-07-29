import { useContext, useEffect, useRef, useState } from "react";
import { MenuItemType } from "../types";
import { SubMenu } from "./SubMenu";
import { RouteContext } from "../context";
import { usePrevious, useSubMenu } from "./hooks";

export function MenuItem ({ 
  item, depth, index, currentIndex, open
}) {
  const elementRef = useRef(null);
  const prevIndex = usePrevious(currentIndex) ?? 0;
  const prevOpen = usePrevious(open);

  const isCurrent = index === currentIndex;

  useEffect(() => {
    if (elementRef.current 
      && (prevIndex !== currentIndex || prevOpen !== open) // focus on index change, or open state change
      && isCurrent) {
      elementRef.current.focus();
    }
  }, [isCurrent, currentIndex, prevIndex, open, prevOpen]);

  return (
    <>
      {"subMenu" in item 
        && <MenuItemWithSubMenu item={item} elementRef={elementRef} depth={depth} isCurrent={isCurrent} />
      }
      {"href" in item 
        && <MenuItemLink item={item} elementRef={elementRef} isCurrent={isCurrent}/>
      }
    </>
  );
}

function MenuItemLink ({ item, elementRef, isCurrent }) {
  const { setRoute } = useContext(RouteContext);

  const handleClick = (e) => {
    e.preventDefault();
    if ("href" in item) setRoute(item.href);
  };

  return (
    <li
      role="none"
    >
    <a 
      ref={elementRef} 
      tabIndex={isCurrent ? 0 : -1}
      href={item.href}
      onClick={handleClick}
      role="menuitem"
    >
      {item.icon} {item.label}
      {item.description &&
        <p>{item.description}</p>
      }
    </a>
    </li>
  )
}

function MenuItemWithSubMenu ({ item, elementRef, depth, isCurrent }) {
    const [open, currentIndex, {
      handleMouseEnter,
      handleMouseLeave,
      handleBlur,
      handleKeyDown,
    }] = useSubMenu(item.subMenu, elementRef);

    return (
      <li
        role="none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        <button
          ref={elementRef} 
          tabIndex={isCurrent ? 0 : -1}
          role="menu"
        >
          {item.icon} {item.label}
          {item.description &&
            <p>{item.description}</p>
          }
        </button>
        
        {"subMenu" in item && 
          <SubMenu 
            depth={depth}
            items={item.subMenu}
            open={open}
            currentIndex={currentIndex}
          />
        }
      </li>
    );

}