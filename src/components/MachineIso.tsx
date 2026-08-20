export function MachineIso({
  shape,
  title,
}: {
  shape: string;
  title: string;
}) {
  const stroke = "#c45c26";
  const frame = "#3d3a36";
  const panel = "#e8e2d8";

  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label={`${title} isometric drawing`}
    >
      <rect width="640" height="400" fill="#f4f0ea" />
      <g
        fill="none"
        stroke={frame}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M40 320h560" stroke="#cfc8bc" />
        <path d="M80 320 200 80h320L640 320" stroke="#ddd6ca" />
      </g>
      {shape === "dual" || shape === "twin" ? (
        <g fill={panel} stroke={frame} strokeWidth="2">
          <path d="M120 280 L220 160 h80 L180 280 Z" />
          <path d="M360 280 L460 160 h80 L420 280 Z" />
          <rect x="200" y="248" width="200" height="32" />
          <circle cx="260" cy="200" r="18" fill="none" stroke={stroke} strokeWidth="3" />
          <circle cx="500" cy="200" r="18" fill="none" stroke={stroke} strokeWidth="3" />
          <path d="M260 200h240" stroke={stroke} strokeWidth="3" />
        </g>
      ) : shape === "ftx" ? (
        <g fill={panel} stroke={frame} strokeWidth="2">
          <path d="M140 290 L280 90 h200 L500 290 Z" />
          <rect x="250" y="180" width="140" height="90" />
          <path d="M200 220 L320 140 L420 210" stroke={stroke} strokeWidth="4" fill="none" />
          <circle cx="320" cy="140" r="14" fill="none" stroke={stroke} strokeWidth="3" />
        </g>
      ) : shape === "table2d" ? (
        <g fill={panel} stroke={frame} strokeWidth="2">
          <path d="M100 270 L200 120 h280 L480 270 Z" />
          <rect x="160" y="200" width="280" height="70" />
          <path d="M180 235 h240" stroke={stroke} strokeWidth="3" />
          <circle cx="190" cy="235" r="8" fill={stroke} stroke="none" />
          <circle cx="410" cy="235" r="8" fill={stroke} stroke="none" />
        </g>
      ) : shape === "transfer" ? (
        <g fill={panel} stroke={frame} strokeWidth="2">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={120 + i * 110} y="160" width="90" height="120" />
          ))}
          <path d="M110 220 h470" stroke={stroke} strokeWidth="4" />
        </g>
      ) : shape === "slide" ? (
        <g fill={panel} stroke={frame} strokeWidth="2">
          <rect x="150" y="120" width="340" height="180" />
          <path d="M170 160 h300 M170 200 h300 M170 240 h300" />
          <rect x="300" y="150" width="40" height="120" fill={stroke} stroke="none" opacity="0.35" />
        </g>
      ) : shape === "coiler" ? (
        <g fill={panel} stroke={frame} strokeWidth="2">
          <path d="M180 280 L280 100 h160 L540 280 Z" />
          <circle cx="320" cy="190" r="54" fill="none" stroke={stroke} strokeWidth="6" />
          <circle cx="320" cy="190" r="28" fill="none" stroke={frame} strokeWidth="2" />
        </g>
      ) : (
        <g fill={panel} stroke={frame} strokeWidth="2">
          <path d="M130 300 L250 100 h220 L470 300 Z" />
          <rect x="240" y="170" width="160" height="110" />
          <path d="M320 170 v-50 h70" stroke={stroke} strokeWidth="4" fill="none" />
          <circle cx="390" cy="120" r="16" fill="none" stroke={stroke} strokeWidth="3" />
          <path d="M160 265 h320" />
        </g>
      )}
      <text
        x="320"
        y="372"
        textAnchor="middle"
        fill={frame}
        fontSize="13"
        fontFamily="ui-monospace, monospace"
      >
        {title} · isometric · not a photograph
      </text>
    </svg>
  );
}
