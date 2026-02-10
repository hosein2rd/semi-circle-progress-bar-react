import React, { useMemo } from "react";

const defaults = {
  fontFamily: "monospace",
};

export interface SemiCircularProgressProps {
  size?: string | number;
  strokeWidth?: number;
  max?: number;
  progress?: number;
  animationDuration?: number;
  track?: { color?: string };
  bar?: { color?: string };
  label?: {
    color?: string;
    fontSize?: string | number;
    padding?: number;
    steps?: number;
    fontFamily?: string;
  };
  dot?: {
    color?: string;
    radius?: number;
    padding?: number;
    count?: number;
  };
  text?: { className?: string };
  showPercentage?: boolean;
  percentage?: {
    color?: string;
    fontSize?: string | number;
    className?: string;
    fontFamily?: string;
  };
}

export const SemiCircularProgress = ({
  size = "100%",
  strokeWidth = 12,
  progress = 50,
  max = 100,
  animationDuration = 0.6,
  track = { color: "#e5e7eb" },
  bar = { color: "#1e6dfd" },
  label = {
    color: "#111827",
    fontSize: 13,
    padding: 20,
    steps: 5,
    fontFamily: defaults.fontFamily,
  },
  dot = {
    color: "#555770",
    radius: 1.5,
    padding: 23,
    count: 25,
  },
  text,
  showPercentage = false,
  percentage,
}: SemiCircularProgressProps) => {
  const numericSize = 512;
  const cx = numericSize / 2;
  const cy = numericSize / 2;
  const r = (numericSize - 50 - strokeWidth * 4) / 2;
  const arcLength = Math.PI * r;
  const startX = cx - r;
  const endX = cx + r;
  const pathD = `M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`;

  const clampedProgress = Math.max(0, Math.min(max, progress));
  const dashOffset = arcLength * (1 - clampedProgress / max);

  const labels = useMemo(() => {
    return Array.from({ length: (label.steps ?? 5) + 1 }, (_, i) => {
      const value = (max / (label.steps ?? 5)) * i;
      const angle = Math.PI * (i / (label.steps ?? 5));
      const labelRadius = r + strokeWidth / 2 + (label.padding ?? 20);
      const x = cx + labelRadius * Math.cos(angle - Math.PI);
      const y = cy + labelRadius * Math.sin(angle - Math.PI);

      return (
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={label.color}
          fontSize={label.fontSize}
          className={text?.className}
          fontFamily={label?.fontFamily}
        >
          {Math.round(value)}
        </text>
      );
    });
  }, [
    label.steps,
    max,
    r,
    strokeWidth,
    label.padding,
    cx,
    cy,
    label.color,
    label.fontSize,
    text,
    label.fontFamily,
  ]);

  const dots = useMemo(() => {
    const hasLabel = labels.length > 0;
    return Array.from({ length: dot.count ?? 25 + 1 }, (_, i) => {
      const angle = Math.PI * (i / (dot.count ?? 25));
      const dotRadiusFromCenter = r + (dot.padding ?? 23);
      const x = cx + dotRadiusFromCenter * Math.cos(angle - Math.PI);
      const y = cy + dotRadiusFromCenter * Math.sin(angle - Math.PI);
      const isLabelDot =
        i % ((dot.count ?? 25) / (label.steps ?? 5)) === 0 && hasLabel;

      return (
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={isLabelDot ? 0 : dot.radius}
          fill={dot.color}
        />
      );
    });
  }, [
    dot.count,
    dot.radius,
    dot.padding,
    r,
    cx,
    cy,
    label.steps,
    dot.color,
    labels.length,
  ]);

  return (
    <svg
      width={size}
      height="50%"
      viewBox={`0 0 ${numericSize} ${numericSize / 1.9}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: size, position: "relative" }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={track.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke={bar.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={arcLength}
        strokeDashoffset={dashOffset}
        style={{ transition: `stroke-dashoffset ${animationDuration}s ease` }}
      />
      {dots}
      {labels}
      {showPercentage && (
        <text
          x={"50%"}
          y={"80%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={percentage?.color}
          fontSize={percentage?.fontSize ?? 42}
          className={percentage?.className}
          fontFamily={percentage?.fontFamily || defaults.fontFamily}
        >
          {progress}%
        </text>
      )}
    </svg>
  );
};
