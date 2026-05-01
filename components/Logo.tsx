type LogoProps = {
  size?: "header" | "footer";
  color?: string;
  className?: string;
};

export function Logo({
  size = "header",
  color = "#0a3d52",
  className = "",
}: LogoProps) {
  const fontSize = size === "header" ? 24 : 20;

  return (
    <span
      className={`inline-flex items-baseline font-sans font-semibold ${className}`}
      style={{
        fontSize,
        color,
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}
    >
      Aurasea
      <span
        aria-hidden="true"
        className="ml-1 inline-block rounded-full bg-brand-green"
        style={{ width: 6, height: 6 }}
      />
    </span>
  );
}
