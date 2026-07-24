// AppIcon — normalizes heterogeneous brand logos into a uniform
// "app icon" chip: rounded square, token background/border, logo filling
// the chip area. Size comes from the caller via className (e.g. "size-10").
//
// `fill` — for logos that ship their own background (full-bleed app icons):
// the image covers the whole chip. The slight over-scale hides the source
// icon's own corner radius under the chip mask. Transparent marks keep
// object-contain with breathing room so they don't crowd the chip edge.

type Props = {
  src: string;
  alt?: string;
  className?: string;
  fill?: boolean;
};

export function AppIcon({ src, alt = "", className = "", fill = false }: Props) {
  return (
    <span
      className={`flex items-center justify-center bg-icon-bg border border-border-light rounded-[26%] overflow-hidden shrink-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={
          fill
            ? "w-full h-full object-cover scale-110"
            : "w-[62%] h-[62%] object-contain"
        }
      />
    </span>
  );
}
