import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { DesktopLayout } from "@/components/layouts";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <DesktopLayout>
        <Outlet />
      </DesktopLayout>
    </React.Fragment>
  );
}
