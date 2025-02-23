import { RefObject, useEffect, useRef } from "react";
import { MenuItemType, LinkMenuItem, ParentMenuItem } from "../types";
import { SubMenu } from "./SubMenu";
import { useMediaQueryContext, usePrevious, useSubMenu } from "./hooks";
import classes from "./styles/MenuItem.module.css";

export function MenuItem ({ 
  item, depth, index, currentIndex, open
}: {
  item: MenuItemType,
  depth: number,
  index: number,
  currentIndex: number,
  open?: boolean,
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
        && <MenuItemLink item={item} elementRef={elementRef} depth={depth} isCurrent={isCurrent}/>
      }
    </>
  );
}

function MenuItemLink ({ 
  item, depth, elementRef, isCurrent
}: {
  item: LinkMenuItem,
  depth: number,
  elementRef: RefObject<HTMLAnchorElement>,
  isCurrent: boolean,
}) {
  return (
    <li
      role="none"
    >
      {"href" in item &&
        <a 
          ref={elementRef as RefObject<HTMLAnchorElement>} 
          tabIndex={isCurrent ? 0 : -1}
          href={item.href}
          role="menuitem"
          className={`${classes.itemButton}`}
          data-depth={depth}
          data-testid={item.label}
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
  elementRef: RefObject<HTMLButtonElement>,
  depth: number,
  isCurrent: boolean,
}) {
  const isLargeScreen = useMediaQueryContext();

  const subMenuOrientation = (depth > 1 && isLargeScreen) ? "horizontal" : "vertical"

  const [open, currentIndex, {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleFocus,
    handleBlur,
    handleKeyDown,
  }] = useSubMenu(item.subMenu, elementRef, subMenuOrientation);

  return (
    <li
      role="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <button
        className={`${classes.itemButton} ${open ? classes.open : ""}`}
        ref={elementRef as RefObject<HTMLButtonElement>} 
        tabIndex={isCurrent ? 0 : -1}
        role="menuitem"
        aria-haspopup={true}
        aria-expanded={open}
        data-depth={depth}
        data-testid={item.label}
      >
        <div>
          {item.Icon ?? null}
          <div>{item.label}</div>
          {subMenuOrientation === "vertical"
            ? <IconMdiChevronDown />
            : <IconMdiChevronRight />
          }
        </div>
        {item.description &&
          <p>{item.description}</p>
        }
      </button>

      {"subMenu" in item && 
        <SubMenu 
          depth={depth}
          item={item}
          open={open}
          currentIndex={currentIndex}
        />
      }
    </li>
  );
}
