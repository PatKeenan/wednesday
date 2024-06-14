export const GolferCard = ({ name }: { name: string; id: string }) => {
  return (
    <div className="border-foreground/20 flex h-[60px] items-center justify-center rounded-lg border bg-white/80 text-sm font-semibold">
      <p>{name}</p>
    </div>
  );
};
