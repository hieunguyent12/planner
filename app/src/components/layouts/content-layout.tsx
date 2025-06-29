function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-scroll h-[95%]">
      <main className="h-full max-w-[1200px] mx-auto mt-5">{children}</main>
    </div>
  );
}

export { ContentLayout };
