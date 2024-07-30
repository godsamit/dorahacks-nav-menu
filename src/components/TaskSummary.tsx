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
    <main>
      <button className={classes.button}>Another Tabbable Button</button>
      <h2>Current Route: {currentRoute}</h2>
      <h2>Summary</h2>
      <p>Hello! My name is Yushan/Samson, and for this skill assessment, I built this navigation menu. I chose to rebuild the navigation menu from <a href="https://dorahacks.io" target="_blank">Dorahacks website</a>, trying to get to know the company better. While the design is largely plain and simple, I put a lot of effort into a11y (accessibility), high quality code, unit tests, and a very cool icon configuration with <a href="https://vitejs.dev/" target="_blank">Vite</a> and <a href="https://github.com/unplugin/unplugin-icons" target="_blank">unplugin-icons.</a></p>
      <h2>Accessibility</h2>
      <h3>Roving Tab Index Support!</h3>
      <p>If you try to tab through the navigation menu on dorahacks.io, you will see it's kind of a mess.</p>
    </main>
  )
}