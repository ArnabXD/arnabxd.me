import { useState } from "react";
import { useIsomorphicLayoutEffect } from "../utils/isomorphic-layout-effect";

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useIsomorphicLayoutEffect(() => setIsClient(true), []);
  return isClient;
};