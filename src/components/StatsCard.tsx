import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

type StatsCardProps = {
  label: string
  value: ReactNode
  icon: LucideIcon
  variant?: "stat" | "feature"
}

function StatsCard({
  label,
  value,
  icon: Icon,
  variant = "stat",
}: StatsCardProps) {
  const isFeature = variant === "feature"

  return (
    <div
      className={
        isFeature
          ? "flex items-center gap-6 rounded-xl bg-white p-6 shadow-md"
          : "flex items-center gap-5 rounded-2xl bg-white/95 p-6 shadow-lg"
      }
    >
      <div
        className={
          isFeature
            ? "flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800"
            : "flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800"
        }
      >
        <Icon className={isFeature ? "h-11 w-11" : "h-8 w-8"} />
      </div>

      <div>
        {isFeature ? (
          <>
            <h3 className="text-xl font-bold text-green-900">{label}</h3>
            <p className="mt-2 text-gray-700">{value}</p>
          </>
        ) : (
          <>
            <p className="text-gray-700">{label}</p>
            <p className="mt-1 text-3xl font-bold text-green-900">{value}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default StatsCard
