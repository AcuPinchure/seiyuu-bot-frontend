import React, { Suspense } from "react";
import AppLoader from "./AppLoader";

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<AppLoader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
