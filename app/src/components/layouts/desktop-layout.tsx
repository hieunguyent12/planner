import { Menu } from "@/components/menu";
import { ContentLayout } from "./content-layout";
import { ThemeSelect } from "../theme";

function DesktopLayout({ children }: { children: React.ReactNode }) {
  const searchParams = new URLSearchParams(document.location.search);

  const isFullScreen = searchParams.get("fullscreen");

  if (isFullScreen) {
    return (
      <div id="desktop-layout" className="relative h-screen">
        <main className="h-full max-w-[1300px] mx-auto py-5">{children}</main>
      </div>
    );
  }

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
