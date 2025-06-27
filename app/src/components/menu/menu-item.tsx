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
      className="flex gap-1 h-8 items-center justify-center border-0 pr-1 text-md font-medium text-gray-600 outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800 hover:text-gray-900 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline-2 data-[selected]:text-gray-900"
      value={to}
      onMouseDown={() => router.navigate({ to })}
    >
      {children}
    </Tabs.Tab>
  );
}

export { MenuItem };
