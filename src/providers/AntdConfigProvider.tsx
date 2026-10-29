// src/providers/AntdProvider.tsx
import React, { useSyncExternalStore } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

type ColorScheme = "light" | "dark";

const systemThemeQuery = "(prefers-color-scheme: dark)";

function getThemeColor(variable: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${variable})`;
  document.documentElement.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}

function getColorScheme(): ColorScheme {
  const colorScheme = document.documentElement.dataset.colorScheme;
  if (colorScheme === "dark" || colorScheme === "light") return colorScheme;

  return window.matchMedia(systemThemeQuery).matches ? "dark" : "light";
}

function subscribeToColorScheme(onChange: () => void) {
  const rootObserver = new MutationObserver(onChange);
  rootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-color-scheme"],
  });

  const systemTheme = window.matchMedia(systemThemeQuery);
  systemTheme.addEventListener("change", onChange);

  return () => {
    rootObserver.disconnect();
    systemTheme.removeEventListener("change", onChange);
  };
}

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

export const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({
  children,
}) => {
  const colorScheme = useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    () => "light",
  );
  const isDark = colorScheme === "dark";
  const themeRadius = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--theme-radius",
    ),
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: getThemeColor("--theme-color-primary"),
          colorSuccess: getThemeColor("--theme-color-success"),
          colorWarning: getThemeColor("--theme-color-warning"),
          colorError: getThemeColor("--theme-color-error"),
          colorTextBase: getThemeColor("--theme-color-font"),
          colorText: getThemeColor("--theme-color-font"),
          colorTextSecondary: getThemeColor("--theme-color-font-secondary"),
          colorTextTertiary: getThemeColor("--theme-color-font-tertiary"),
          colorBgBase: getThemeColor("--theme-color-background"),
          colorBgLayout: getThemeColor("--theme-color-background-secondary"),
          colorBgContainer: getThemeColor("--theme-color-background"),
          colorBgElevated: getThemeColor("--theme-color-background-secondary"),
          colorBorder: getThemeColor("--theme-color-border"),
          colorBorderSecondary: getThemeColor("--theme-color-border"),
          borderRadius: themeRadius,
        },
        components: {
          Segmented: {
            itemSelectedBg: getThemeColor("--theme-color-primary"),
            itemSelectedColor: getThemeColor("--theme-color-on-brand"),
          },
          Divider: {
            marginLG: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
