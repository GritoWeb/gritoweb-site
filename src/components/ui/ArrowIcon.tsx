import React from 'react'

type Props = {
  size?: number
  direction?: 'right' | 'left'
  className?: string
}

export const ArrowIcon: React.FC<Props> = ({ size = 24, direction = 'right', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    style={direction === 'left' ? { transform: 'rotate(180deg)' } : undefined}
  >
    <path
      d="M4 12H20M20 12L16 8M20 12L16 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
