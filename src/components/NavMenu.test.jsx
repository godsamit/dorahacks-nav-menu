import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { NavMenu } from "./NavMenu";
import { MediaQueryProvider } from "../context";
import { MenuContent } from "../types/MenuDefinition";
import "@testing-library/jest-dom";

const renderWithMediaQueryProvider = (ui) => {
  return render(<MediaQueryProvider>{ui}</MediaQueryProvider>);
};

describe("Menubar", () => {
  describe("Menubar (Root Menu)", () => {
    test("On desktop view, hovering can open and close a menu", async() => {
      // Update matchMedia to desktop
      globalThis.setMatchMedia(true);

      renderWithMediaQueryProvider(<NavMenu items={MenuContent} />);

      // Hover over the "BUILDs" menuitem
      await userEvent.hover(screen.getByTestId(MenuContent[1].label));
      expect(screen.getByTestId(`${MenuContent[1].label}-menu`)).toBeVisible();
      // Move hover away
      await userEvent.unhover(screen.getByTestId(MenuContent[1].label));
      await waitFor(() => {
        expect(screen.getByTestId(`${MenuContent[1].label}-menu`)).not.toBeVisible();
      });
    });
    test("On desktop view, tabbing and keyboard controls can open and close a menu", async () => {
      // Update matchMedia to desktop
      globalThis.setMatchMedia(true);

      renderWithMediaQueryProvider(<NavMenu items={MenuContent} />);
      expect(document.body).toHaveFocus();
      await userEvent.tab();
      expect(screen.getByLabelText("DoraHacks")).toHaveFocus();
      await userEvent.tab(); // Tabbing into the menu bar
      expect(screen.getByTestId(MenuContent[0].label)).toHaveFocus();

      // Keyboard control to open the menuitem "BUIDLs"
      await userEvent.keyboard("{arrowright}{enter}");
      expect(screen.getByTestId(`${MenuContent[1].label}-menu`)).toBeVisible();
      // Ensure the first item in the menu has focus, to abide by ARIA-rules
      expect(screen.getByTestId(MenuContent[1].subMenu[0].label)).toHaveFocus();

      // Keyboard control to escape the just opened item
      await userEvent.keyboard("{escape}");
      expect(screen.getByTestId(`${MenuContent[1].label}-menu`)).not.toBeVisible();
    });
  });
});
