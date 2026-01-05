import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityData {
  type: string;
  label: string;
  value: number;
  goal: number;
  color: string;
}

interface ActivityRingsProps {
  data: ActivityData[];
  size?: number;
  className?: string;
}

const ActivityRing = ({
  value,
  goal,
  color,
  radius,
  strokeWidth,
}: {
  value: number;
  goal: number;
  color: string;
  radius: number;
  strokeWidth: number;
}) => {
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / goal, 1);
  const offset = circumference * (1 - progress);

  return (
    <g>
      {/* Background ring */}
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/30"
      />
      {/* Progress ring */}
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="activity-ring"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
        }}
      />
    </g>
  );
};

export function ActivityRings({ data, size = 200, className }: ActivityRingsProps) {
  const strokeWidth = size / 15;
  const gap = 4;

  const rings = useMemo(() => {
    return data.map((item, index) => {
      const radius = (size / 2) - (strokeWidth / 2) - (index * (strokeWidth + gap));
      return {
        ...item,
        radius,
      };
    });
  }, [data, size, strokeWidth, gap]);

  return (
    <Card className={cn("glass-card p-6", className)}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {rings.map((ring, index) => (
              <ActivityRing
                key={ring.type}
                value={ring.value}
                goal={ring.goal}
                color={ring.color}
                radius={ring.radius}
                strokeWidth={strokeWidth}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {data.reduce((sum, d) => sum + d.value, 0)}
              </div>
              <div className="text-xs text-muted-foreground">minutes</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item) => {
            const progress = Math.min((item.value / item.goal) * 100, 100);
            return (
              <div key={item.type} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">
                      {item.value}/{item.goal}m
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

// Preset activity data with colors
export const ACTIVITY_COLORS = {
  coding: "hsl(142, 76%, 36%)",
  learning: "hsl(217, 91%, 60%)",
  research: "hsl(280, 68%, 60%)",
  writing: "hsl(25, 95%, 53%)",
  planning: "hsl(48, 96%, 53%)",
  other: "hsl(215, 16%, 47%)",
};

export const ACTIVITY_LABELS = {
  coding: "Coding",
  learning: "Learning",
  research: "Research",
  writing: "Writing",
  planning: "Planning",
  other: "Other",
};
