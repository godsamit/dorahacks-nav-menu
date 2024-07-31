import { useEffect, useState } from "react";
import classes from "./styles/TaskSummary.module.css";

export function TaskSummary () {

  // Update current route
  const [currentRoute, setCurrentRoute] = useState("");
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    }
    if (typeof window !== "undefined") {
      setCurrentRoute(window.location.pathname);
      window.addEventListener("popstate", handleRouteChange);
    }
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    }
  }, []);

  return (
    <main className={classes.main}>
      <button>Another Tabbable Button</button>
      <h2>Current Route: {currentRoute}</h2>
      <h1>Summary</h1>
      <p>Hello! My name is Yushan, and for this skill assessment, I chose to recreate the navigation menu from the <a href="https://dorahacks.io" target="_blank" aria-label="Dorahacks Website">DoraHacks website</a> to better understand the company. While the design is simple, I dedicated significant effort to the following areas:</p>
      
      <h2>A11y (Accessibility)</h2> 
      <p>When using the keyboard to navigate the navbar, once the navbar has focus (starting with the "Log In" button), use the arrow keys, <code>Enter</code>, <code>Escape</code>, <code>Space</code>, and <code>Home/End</code> keys for navigation instead of continuing to tab through the elements. According to <a href="https://w3c.github.io/aria/#menubar" target="_blank" aria-label="Menubar Specification">ARIA specifications</a>, the entire menubar should be treated as <b>a single tab group</b> with dedicated <a href="https://w3c.github.io/aria/#managingfocus" target="_blank" aria-label="Focus Management Documentation">focus management</a>. This setup ensures that when you tab out of the navbar and later return, your last focused position is remembered. (Try tabbing out to the button at the top of the page, then use Shift-Tab keys to go back to the navbar!) This approach enhances usability and adheres to accessibility standards.</p>
      <p><a href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" target="_blank" aria-label="Menubar pattern">Here</a> is the official guide on the expected behavior of each key in a menubar pattern. Additionally, <a href="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/" target="_blank" aria-label="Official Code Example">here</a> are some official code examples.</p>
      <p>I also used semantic elements like <code>nav</code>, <code>main</code>, <code>menu</code>, <code>li</code>, <code>button</code>, and <code>a</code> to ensure a meaningful HTML structure. Appropriate roles and ARIA attributes were added to enhance accessibility.</p>
      <p>In the end, this menubar has a perfect <b>100 score</b> in accessibility on Lighthouse (in developer tools on Chrome).</p>
      <div className={`${classes.imageContainer}`}>
        <a href="./Lighthouse100.png" target="_blank" aria-label="The navigation menu has a 100 score for accessibility!" >
          <img src="./Lighthouse100.png" alt="The navigation menu has a 100 score for accessibility!" />
        </a>
      </div>

      <h2>Code Quality and Reusability with Custom Hooks</h2> 
      <p>To manage focus within the navbar and submenus like previously mentioned, I implemented two custom hooks: <code>useNavMenuBar.ts</code> and <code>useSubMenu.ts</code>. These hooks implement a <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#technique_1_roving_tabindex" target="_blank" aria-label="Roving Index Pattern Documentation">roving tab index pattern</a>and manage keyboard interactions, ensuring consistent logic across different levels of submenus.</p>
      <p>Additionally, I implemented a React context hook for media queries. This global context prevents each child component from adding an event listener to the window, optimizing performance.</p>
        
      <h2>Unit Tests with Media Query</h2> 
      <p>I incorporated <a href="https://vitest.dev/" target="_blank" aria-label="Vitest Official Site">Vitest</a> and <a href="https://testing-library.com/" target="_blank" aria-label="Testing Library Official Site">Testing Library</a> for unit testing. Since media queries (<code>window.matchMedia</code>) are typically unavailable in server or test environments, I created a mock that allows testers to specify if the test should occur on mobile or desktop. I wrote two unit tests, which can be found in <code>src/components/NavMenu.test.jsx</code>.</p>
      
      <h2>Auto Import Icons</h2> 
      <p>I used <a href="https://vitejs.dev/" target="_blank" aria-label="Vite website">Vite</a> as the build tool and <a href="https://github.com/unplugin/unplugin-icons" target="_blank" aria-label="unplugin-icon repository">unplugin-icons</a> as the icon library, which supported <b>auto importing</b> icons. You can even auto-import custom icons like <IconDoraAptos /> !</p>
      <p>This setups allows you to declare icons freely in the navbar definition (<code>src/types/MenuDefinition.tsx</code>), and only the necessary icons are included in the final build</p>
      <div className={`${classes.imageContainer}`}>
        <a href="./AutoImportIcons.png" target="_blank" aria-label="You can freely declare icons!">
          <img src="./AutoImportIcons.png" alt="You can freely declare icons!" />
        </a>
        <a href="./AutoImportIcons2.png" target="_blank" aria-label="You can freely declare custom icons!">
          <img src="./AutoImportIcons2.png" alt="You can freely declare custom icons!" />
        </a>
      </div>
      <h2>Some Last Thoughts</h2>
      <p>I also implemented <b>css modules</b> and a very simple <b>responsive design</b> for mobile. Additionally, I implemented some very simple CSS animation for the chevron icon and the sub menus.</p>
      <p>For this skill assessment, I focused more on functionality than design. However, I have a strong background in design, as showcased in my past work at <a href="https://samsonliu.me" target="_blank" aria-label="Personal Website">samsonliu.me</a> (password in the resume I sent you).</p>
    </main>
  )
}
