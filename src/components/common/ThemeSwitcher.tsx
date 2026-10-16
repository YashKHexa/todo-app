"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { m, useReducedMotion, type Transition } from "motion/react";
import { MotionProvider } from "@/components/common/MotionProvider";
import { cn } from "@/utils/cn";
import {
  applyThemePreference,
  getThemePreference,
  readStoredThemePreference,
  setThemePreference,
  SYSTEM_THEME_QUERY,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/utils/theme";
import "@/styles/theme-switcher.css";

const themeOptions: { label: string; value: ThemePreference }[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

// Matching commands (M, eight C segments, Z) let Motion interpolate the outline.
const iconPaths: Record<ThemePreference, string> = {
  light:
    "M12 7.5 C13.193 7.5 14.338 7.974 15.182 8.818 C16.026 9.662 16.5 10.807 16.5 12 C16.5 13.193 16.026 14.338 15.182 15.182 C14.338 16.026 13.193 16.5 12 16.5 C10.807 16.5 9.662 16.026 8.818 15.182 C7.974 14.338 7.5 13.193 7.5 12 C7.5 10.807 7.974 9.662 8.818 8.818 C9.662 7.974 10.807 7.5 12 7.5 Z",
  dark: "M11.5 3 C10.6 5 10.6 7.3 11.7 9.2 C13.5 12.3 17.4 13.7 21 12.5 C20.8 14.8 19.7 16.9 18.1 18.5 C16.5 20.1 14.3 21 12 21 C9.6 21 7.3 20.1 5.6 18.4 C3.9 16.7 3 14.4 3 12 C3 9.6 3.9 7.3 5.6 5.6 C7.2 4 9.3 3.1 11.5 3 Z",
  system:
    "M5 4 C9.667 4 14.333 4 19 4 C20.105 4 21 4.895 21 6 C21 9 21 12 21 15 C21 16.105 20.105 17 19 17 C14.333 17 9.667 17 5 17 C3.895 17 3 16.105 3 15 C3 12 3 9 3 6 C3 4.895 3.895 4 5 4 Z",
};

const sunRaysPath =
  "M12 2 L12 4 M19.07 4.93 L17.66 6.34 M22 12 L20 12 M19.07 19.07 L17.66 17.66 M12 22 L12 20 M4.93 19.07 L6.34 17.66 M2 12 L4 12 M4.93 4.93 L6.34 6.34";
const systemStandPath = "M12 17 L12 21 M8 21 L16 21";

function subscribe(onChange: () => void) {
  const systemTheme = window.matchMedia(SYSTEM_THEME_QUERY);

  const handleSystemChange = () => {
    if (getThemePreference() === "system") {
      applyThemePreference("system");
    }
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      applyThemePreference(readStoredThemePreference());
      onChange();
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener("storage", handleStorageChange);
  systemTheme.addEventListener("change", handleSystemChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", handleStorageChange);
    systemTheme.removeEventListener("change", handleSystemChange);
  };
}

function getServerSnapshot(): null {
  // The server cannot read localStorage. CSS chooses the initial icon instead.
  return null;
}

function cycleThemePreference() {
  const currentIndex = themeOptions.findIndex(
    ({ value }) => value === getThemePreference(),
  );
  setThemePreference(
    themeOptions[(currentIndex + 1) % themeOptions.length].value,
  );
}

export const ThemeSwitcher = () => {
  const preference = useSyncExternalStore<ThemePreference | null>(
    subscribe,
    getThemePreference,
    getServerSnapshot,
  );
  const shouldReduceMotion = useReducedMotion();
  const optionIndex = themeOptions.findIndex(
    ({ value }) => value === (preference ?? "system"),
  );
  const currentOption = themeOptions[optionIndex];
  const nextOption = themeOptions[(optionIndex + 1) % themeOptions.length];
  const label =
    preference === null
      ? "Change color theme"
      : `${currentOption.label} theme. Switch to ${nextOption.label.toLowerCase()} theme.`;
  const transition: Transition = {
    type: "tween",
    duration: shouldReduceMotion ? 0 : 0.45,
    ease: [0.22, 1, 0.36, 1],
  };

  useLayoutEffect(() => {
    // Reapply after React's development remount resets document attributes.
    applyThemePreference(readStoredThemePreference());
  }, []);

  return (
    <MotionProvider>
      <m.button
        type="button"
        aria-label={label}
        title={label}
        onClick={cycleThemePreference}
        initial={false}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background align-middle text-font-secondary transition-colors duration-200 hover:bg-background-secondary hover:text-font motion-reduce:transition-none"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            preference === null && "theme-switcher-initial-icon",
          )}
        >
          {preference === null ? (
            // The head script sets data-theme before paint, so the saved icon
            // is visible while React loads. Motion mounts in that same shape.
            <>
              <g data-theme-icon="light">
                <path d={sunRaysPath} />
                <path d={iconPaths.light} />
              </g>
              <path data-theme-icon="dark" d={iconPaths.dark} />
              <g data-theme-icon="system">
                <path d={iconPaths.system} />
                <path d={systemStandPath} />
              </g>
            </>
          ) : (
            <>
              <m.g
                initial={false}
                animate={{
                  opacity: preference === "light" ? 1 : 0,
                  scale: preference === "light" ? 1 : 0.6,
                  rotate: preference === "light" ? 0 : 45,
                }}
                transition={transition}
                style={{ transformOrigin: "12px 12px" }}
              >
                <path d={sunRaysPath} />
              </m.g>
              <m.path
                initial={false}
                animate={{ d: iconPaths[preference] }}
                transition={transition}
              />
              <m.path
                initial={false}
                animate={{
                  d:
                    preference === "system"
                      ? systemStandPath
                      : "M12 17 L12 17 M12 17 L12 17",
                  opacity: preference === "system" ? 1 : 0,
                }}
                transition={transition}
              />
            </>
          )}
        </svg>
      </m.button>
    </MotionProvider>
  );
};
