import { Menu } from "@/components/menu";
import { ContentLayout } from "./content-layout";
import { ThemeSelect } from "../theme";

function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="desktop-layout" className="relative h-screen">
      <Menu>
        <ContentLayout>{children}</ContentLayout>
      </Menu>
      <ThemeSelect />
    </div>
  );
}

export { DesktopLayout };
