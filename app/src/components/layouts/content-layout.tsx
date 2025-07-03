function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-scroll h-[95%]">
      <main className="h-full max-w-[1210px] mx-auto mt-3">{children}</main>
    </div>
  );
}

export { ContentLayout };
