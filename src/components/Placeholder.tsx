import { Camera } from "lucide-react";

interface PlaceholderProps {
  label: string;
  className?: string;
  dark?: boolean;
}

export function Placeholder({ label, className = "", dark = false }: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full text-center p-6 ${className}`}
      style={{ backgroundColor: dark ? "#2a1f14" : "#c8b89a" }}
    >
      <Camera
        className="mb-3"
        size={36}
        color={dark ? "#ffffff" : "#5c4a32"}
        strokeWidth={1.5}
      />
      <span
        className="italic text-sm"
        style={{
          color: dark ? "#f0ebe3" : "#5c4a32",
          fontFamily: "Playfair Display, serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}
