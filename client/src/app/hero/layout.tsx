export default function HeroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div>this is layout</div>
      {children}
      </section>
  );
};