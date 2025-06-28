import { Menu } from "@/components/menu";

function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="desktop-layout" className="h-full">
      <Menu>{children}</Menu>
    </div>
  );
}

export { DesktopLayout };
