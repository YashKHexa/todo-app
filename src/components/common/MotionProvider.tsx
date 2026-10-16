"use client";

import { createContext, useContext, type ReactNode } from "react";
import { LazyMotion, MotionConfig, type Transition } from "motion/react";

const loadFeatures = () =>
  import("@/utils/motionFeatures").then((module) => module.default);

const MotionProviderContext = createContext(false);

/**
 * Enables animations for `m` components and respects reduced-motion settings.
 * Content is included in the server HTML; the animation code loads later.
 *
 * Nested providers reuse the ancestor's lazy features and default configuration.
 * Pass transition to share default animation timing within that group.
 *
 * When to skip or adjust this:
 * - Static content, CSS effects, or Motion hooks alone: skip the provider.
 * - Animations cannot wait for the extra download: import `domAnimation`
 *   directly and use `features={domAnimation}` instead of `loadFeatures`.
 * - Drag, pan, or layout animations (`layout`/`layoutId`): load `domMax`.
 * - Full `motion` components: switch them to `m` before using this provider.
 *   `strict` rejects full `motion` components inside it.
 *
 * Adding a provider cannot shrink code already included in the page.
 *
 * @see https://motion.dev/docs/react-reduce-bundle-size
 */
export const MotionProvider = ({
  children,
  transition,
}: {
  children: ReactNode;
  transition?: Transition;
}) => {
  const hasProvider = useContext(MotionProviderContext);
  if (hasProvider && !transition) return children;

  const content = (
    <MotionConfig reducedMotion="user" transition={transition}>
      {children}
    </MotionConfig>
  );
  if (hasProvider) return content;

  return (
    <MotionProviderContext.Provider value={true}>
      <LazyMotion features={loadFeatures} strict>
        {content}
      </LazyMotion>
    </MotionProviderContext.Provider>
  );
};
