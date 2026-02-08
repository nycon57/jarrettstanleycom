"use client"

import { cn } from '@/lib/utils'

interface AlphabetNavProps {
  activeLetters: string[]
  onLetterClick?: (letter: string) => void
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function AlphabetNav({ activeLetters, onLetterClick }: AlphabetNavProps) {
  return (
    <nav className="flex flex-wrap gap-1.5 justify-center py-4" aria-label="Alphabetical navigation">
      {ALPHABET.map((letter) => {
        const isActive = activeLetters.includes(letter)
        return (
          <button
            key={letter}
            onClick={() => isActive && onLetterClick?.(letter)}
            disabled={!isActive}
            className={cn(
              'w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200',
              isActive
                ? 'bg-lilac/10 text-lilac border border-lilac/30 hover:bg-lilac/20 hover:border-lilac/50 cursor-pointer'
                : 'bg-muted/50 text-muted-foreground/40 cursor-default'
            )}
            aria-label={isActive ? `Jump to terms starting with ${letter}` : `No terms starting with ${letter}`}
          >
            {letter}
          </button>
        )
      })}
    </nav>
  )
}
