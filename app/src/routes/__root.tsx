import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeSelect } from "@/components/theme";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="bg-primary h-full relative">
        <Outlet />
        <ThemeSelect />
      </div>
    </React.Fragment>
  );
}
