import { MenuItemType } from "../types";

export function SubMenu ({ items }: {items: MenuItemType[]}) {
  return (
    <menu>
      {items.map((item, index) => <li>
        {item.label}
        {item.subMenu &&
          <SubMenu items={item.subMenu} /> 
        }
      </li>)}
    </menu>
  );
}
