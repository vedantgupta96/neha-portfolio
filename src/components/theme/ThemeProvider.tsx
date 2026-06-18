"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync from whatever the no-FOUC script already set on <html>.
  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Signature move: slow diagonal circular reveal via View Transitions API.
    if (
      "startViewTransition" in document &&
      typeof (document as Document).startViewTransition === "function" &&
      !reduced
    ) {
      (
        document as Document & {
          startViewTransition: (cb: () => void) => void;
        }
      ).startViewTransition(() => {
        apply(next);
        setTheme(next);
      });
    } else {
      apply(next);
      setTheme(next);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
