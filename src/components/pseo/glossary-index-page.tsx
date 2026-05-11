"use client"

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ContentCard } from '@/components/pseo/content-card'
import { AlphabetNav } from '@/components/pseo/alphabet-nav'
import type { GlossaryTerm, GlossaryCategory } from '@/types/pseo'
import { glossaryCategoryLabels } from '@/types/pseo'

interface GlossaryIndexPageProps {
  terms: GlossaryTerm[]
  alphabetMap: Record<string, GlossaryTerm[]>
}

const categoryBadgeVariant: Record<GlossaryCategory, 'lilac' | 'orchid' | 'skyward' | 'lavender'> = {
  'ai-fundamentals': 'lilac',
  'mortgage-marketing': 'orchid',
  'marketing-automation': 'skyward',
  'data-analytics': 'lavender',
  'customer-experience': 'orchid',
  'compliance-regulation': 'lilac',
}

export function GlossaryIndexClient({ terms, alphabetMap }: GlossaryIndexPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | null>(null)

  const filteredTerms = useMemo(() => {
    let result = terms
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(query) ||
          t.shortDefinition.toLowerCase().includes(query)
      )
    }
    return result
  }, [terms, selectedCategory, searchQuery])

  const filteredAlphabetMap = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {}
    for (const term of filteredTerms) {
      const letter = term.term.charAt(0).toUpperCase()
      if (!map[letter]) map[letter] = []
      map[letter].push(term)
    }
    for (const letter of Object.keys(map)) {
      map[letter].sort((a, b) => a.term.localeCompare(b.term))
    }
    return map
  }, [filteredTerms])

  const activeLetters = Object.keys(filteredAlphabetMap).sort()

  const handleLetterClick = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const categories = Object.keys(glossaryCategoryLabels) as GlossaryCategory[]

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-8 gap-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search glossary terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className="focus:outline-none"
          >
            <Badge
              variant={selectedCategory === null ? 'gradient-subtle' : 'outline'}
              className="cursor-pointer"
            >
              All
            </Badge>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className="focus:outline-none"
            >
              <Badge
                variant={selectedCategory === cat ? categoryBadgeVariant[cat] : 'outline'}
                className="cursor-pointer"
              >
                {glossaryCategoryLabels[cat]}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet Navigation */}
      <AlphabetNav
        activeLetters={activeLetters}
        onLetterClick={handleLetterClick}
      />

      {/* Terms grouped by letter */}
      <div className="mt-8 gap-y-12">
        {activeLetters.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No glossary terms match your search criteria.
          </p>
        )}
        {activeLetters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="font-signal text-3xl font-semibold mb-6 text-lilac">
              {letter}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAlphabetMap[letter].map((term) => (
                <ContentCard
                  key={term.slug}
                  title={term.term}
                  description={term.shortDefinition}
                  href={`/insights/glossary/${term.slug}`}
                  badge={glossaryCategoryLabels[term.category]}
                  badgeVariant={categoryBadgeVariant[term.category]}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
