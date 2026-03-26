import type { ScoreComponent } from '@/data/city-strategy-helpers'

export function StrategyScoreBreakdown({
  components,
  totalScore,
  scoreLabel,
}: {
  components: ScoreComponent[]
  totalScore: number
  scoreLabel: string
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-text">Score Breakdown</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">{scoreLabel}:</span>
          <span className="rounded-lg bg-primary/10 px-3 py-1 text-lg font-bold text-primary">
            {totalScore.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {components.map((comp) => (
          <div key={comp.label}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-medium text-text">{comp.label}</span>
                <span className="text-xs text-text-light">({comp.weight})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-muted">{comp.rawFormatted}</span>
                <span className="font-semibold text-text w-10 text-right">
                  {comp.normalizedScore.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-surface overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(comp.normalizedScore / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
