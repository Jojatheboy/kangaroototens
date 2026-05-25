/* Brackets decorativos nos 4 cantos — estilo runner.now / tech editorial */

interface BracketsProps {
  size?: number;
  thickness?: number;
  color?: string;
  offset?: number;
  className?: string;
}

export function Brackets({
  size = 20,
  thickness = 1,
  color = "rgba(255, 255, 255, 0.25)",
  offset = 12,
  className = "",
}: BracketsProps) {
  const lines: React.CSSProperties = {
    position: "absolute",
    background: color,
    pointerEvents: "none",
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* TOP LEFT */}
      <span
        style={{
          ...lines,
          top: offset,
          left: offset,
          width: size,
          height: thickness,
        }}
      />
      <span
        style={{
          ...lines,
          top: offset,
          left: offset,
          width: thickness,
          height: size,
        }}
      />
      {/* TOP RIGHT */}
      <span
        style={{
          ...lines,
          top: offset,
          right: offset,
          width: size,
          height: thickness,
        }}
      />
      <span
        style={{
          ...lines,
          top: offset,
          right: offset,
          width: thickness,
          height: size,
        }}
      />
      {/* BOTTOM LEFT */}
      <span
        style={{
          ...lines,
          bottom: offset,
          left: offset,
          width: size,
          height: thickness,
        }}
      />
      <span
        style={{
          ...lines,
          bottom: offset,
          left: offset,
          width: thickness,
          height: size,
        }}
      />
      {/* BOTTOM RIGHT */}
      <span
        style={{
          ...lines,
          bottom: offset,
          right: offset,
          width: size,
          height: thickness,
        }}
      />
      <span
        style={{
          ...lines,
          bottom: offset,
          right: offset,
          width: thickness,
          height: size,
        }}
      />
    </div>
  );
}
