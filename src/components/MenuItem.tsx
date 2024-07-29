import { RefObject, useContext, useEffect, useRef } from "react";
import { MenuItemType, LinkMenuItem, ParentMenuItem } from "../types";
import { SubMenu } from "./SubMenu";
import { RouteContext } from "../context";
import { usePrevious, useSubMenu } from "./hooks";
import classes from "./styles/MenuItem.module.css";

export function MenuItem ({ 
  item, depth, index, currentIndex, open
}: {
  item: MenuItemType,
  depth: number,
  index: number,
  currentIndex: number,
  open: boolean,
}) {
  const elementRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const prevIndex = usePrevious(currentIndex) ?? 0;
  const prevOpen = usePrevious(open);

  const isCurrent = index === currentIndex;

  // effect to manage the current focused element
  useEffect(() => {
    if (elementRef.current 
      && document.activeElement !== document.body // only call focus when user uses keyboard navigation
      && (prevIndex !== currentIndex || prevOpen !== open) // focus on index change, or open state change
      && isCurrent) {
      elementRef.current.focus();
    }
  }, [isCurrent, currentIndex, prevIndex, prevOpen, open]);

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

function MenuItemLink ({ 
  item, elementRef, isCurrent
}: {
  item: LinkMenuItem,
  elementRef: RefObject<HTMLAnchorElement | HTMLButtonElement>,
  isCurrent: boolean,
}) {
  const { setRoute } = useContext(RouteContext);

  const handleClick = (e) => {
    e.preventDefault();
    if ("href" in item) setRoute(item.href);
  };

  return (
    <li
      role="none"
    >
      {"href" in item &&
        <a 
          ref={elementRef as RefObject<HTMLAnchorElement>} 
          tabIndex={isCurrent ? 0 : -1}
          href={item.href}
          onClick={handleClick}
          role="menuitem"
          className={`${classes.itemButton}`}
        >
          <div>
            {item.Icon ?? null}
            <div>{item.label}</div>
          </div>
          {item.description &&
            <p>{item.description}</p>
          }
        </a>
      }
    </li>
  )
}

function MenuItemWithSubMenu ({ 
  item, elementRef, depth, isCurrent
}: {
  item: ParentMenuItem,
  elementRef: RefObject<HTMLAnchorElement | HTMLButtonElement>,
  depth: number,
  isCurrent: boolean,
}) {
  const [open, currentIndex, {
    handleMouseEnter,
    handleMouseLeave,
    handleBlur,
    handleKeyDown,
  }] = useSubMenu(item.subMenu, elementRef, depth === 1 ? "vertical" : "horizontal");

  return (
    <li
      role="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={elementRef as RefObject<HTMLButtonElement>} 
        tabIndex={isCurrent ? 0 : -1}
        role="menu"
      >
        <div 
          className={`${classes.itemButton}`}
        >
          <div>
          {item.Icon ?? null}
          <div>{item.label}</div>
          {depth === 1 
            ? <IconMdiChevronDown className={`${open ? classes.open : ""}`} />
            : <IconMdiChevronRight className={`${open ? classes.open : ""}`} />
          }
          </div>
          {item.description &&
            <p>{item.description}</p>
          }
        </div>
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