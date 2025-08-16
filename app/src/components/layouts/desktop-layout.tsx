import { Menu } from "@/components/menu";
import { ContentLayout } from "./content-layout";
import { ThemeSelect } from "../theme";
import { router } from "@/router";
import { useLocation } from "@tanstack/react-router";
import TablerArrowRight from "~icons/tabler/arrow-right";
import TablerArrowLeft from "~icons/tabler/arrow-left";
import { AppContext } from "@/appContext";

function DesktopLayout({ children }: { children: React.ReactNode }) {
  const searchParams = new URLSearchParams(document.location.search);
  const location = useLocation();

  const isFullScreen = searchParams.get("fullscreen");

  if (isFullScreen) {
    return (
      <div id="desktop-layout" className="relative h-screen">
        <main className="h-full max-w-[1300px] mx-auto py-5">{children}</main>
      </div>
    );
  }

  const pathname = location.pathname.split("/");
  const isUFView = pathname.pop() === "uf";

  return (
    <AppContext.Provider value={{ isUFView }}>
      <div id="desktop-layout" className="relative h-screen">
        <Menu>
          <ContentLayout>{children}</ContentLayout>
        </Menu>
        <div className="flex items-center absolute top-2 right-2 gap-5 text-sm">
          <div>
            <p
              className="text-base text-blue-500 select-none cursor-pointer hover:underline"
              onClick={() => {
                const urlParts = location.href.split("/");

                if (isUFView) {
                  router.navigate({ to: `/${urlParts[urlParts.length - 2]}` });
                } else {
                  router.navigate({
                    to: `/${urlParts[urlParts.length - 1]}/uf`,
                  });
                }
              }}
            >
              {isUFView ? (
                <span className="flex items-center gap-2">
                  <TablerArrowLeft className="mt-0.5" /> Guest View
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  UF View 🐊 <TablerArrowRight className="mt-0.5" />
                </span>
              )}
            </p>
          </div>
          <ThemeSelect />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export { DesktopLayout };
