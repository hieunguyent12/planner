import { Tabs } from "@base-ui-components/react/tabs";
import { router } from "@/router";
import type { FileRoutesByTo } from "@/routeTree.gen";

function MenuItem({
  children,
  to,
}: {
  children: React.ReactNode;
  to: keyof FileRoutesByTo;
}) {
  return (
    <Tabs.Tab
      className="menu-item"
      value={to}
      onMouseDown={() => router.navigate({ to })}
    >
      {children}
    </Tabs.Tab>
  );
}

export { MenuItem };
