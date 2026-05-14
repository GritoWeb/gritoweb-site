import React from 'react'

type Step = {
  title: string
  description?: string
}

type ProcessTrailProps = {
  steps: Step[]
  highlightIndex?: number
}

export function ProcessTrail({ steps, highlightIndex = -1 }: ProcessTrailProps) {
  return (
    <ol className="relative m-0 p-0 list-none flex flex-col gap-0">
      {steps.map((step, i) => {
        const isHighlighted = i === highlightIndex
        return (
          <li key={i} className="relative flex gap-6 pb-10 last:pb-0">
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <span className="absolute left-[19px] top-10 bottom-0 w-px bg-line" aria-hidden="true" />
            )}
            {/* Step number bubble */}
            <div
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm z-10 ${
                isHighlighted
                  ? 'bg-orange text-white'
                  : 'bg-blue/10 text-blue'
              }`}
            >
              {i + 1}
            </div>
            <div className="flex flex-col gap-1 pt-1.5">
              <h3 className={`m-0 font-display font-bold text-base ${isHighlighted ? 'text-orange' : 'text-ink'}`}>
                {step.title}
              </h3>
              {step.description && (
                <p className="m-0 font-body text-sm text-mute leading-relaxed">{step.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
