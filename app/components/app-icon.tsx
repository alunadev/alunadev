// AppIcon — normalizes heterogeneous brand logos into a uniform
// "app icon" chip: rounded square, token background/border, logo contained.
// Size comes from the caller via className (e.g. "size-9 md:size-10").

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export function AppIcon({ src, alt = "", className = "" }: Props) {
  return (
    <span
      className={`flex items-center justify-center bg-icon-bg border border-border-light rounded-[26%] overflow-hidden shrink-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-[68%] h-[68%] object-contain" />
    </span>
  );
}
