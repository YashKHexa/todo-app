export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "hexacoder-theme";
export const THEME_CHANGE_EVENT = "hexacoder-theme-change";
export const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

function normalizeThemePreference(
  value: string | null | undefined,
): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

/** Reads the saved preference, falling back to the system theme. */
export function readStoredThemePreference(): ThemePreference {
  try {
    return normalizeThemePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

/** Returns the current preference from the document. Used only in the browser. */
export function getThemePreference(): ThemePreference {
  return normalizeThemePreference(document.documentElement.dataset.theme);
}

/** Applies the preference, resolving system mode to the current device setting. */
export function applyThemePreference(preference: ThemePreference): void {
  const root = document.documentElement;
  const isDark =
    preference === "dark" ||
    (preference === "system" && window.matchMedia(SYSTEM_THEME_QUERY).matches);

  root.dataset.theme = preference;
  root.dataset.colorScheme = isDark ? "dark" : "light";
}

/** Applies and saves a selection, then notifies theme controls on this page. */
export function setThemePreference(preference: ThemePreference): void {
  applyThemePreference(preference);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
