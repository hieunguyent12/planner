function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[calc(100%-15px)] max-w-[1210px] mx-auto mt-3">
      {children}
    </main>
  );
}

export { ContentLayout };
