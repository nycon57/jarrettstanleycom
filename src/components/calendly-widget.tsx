'use client'

import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CalendlyWidgetProps {
  url: string
  onClose: () => void
}

export function CalendlyWidget({ url, onClose }: CalendlyWidgetProps) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-signal">Schedule a Speaking Inquiry Call</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        <div className="p-6 pt-0 h-full">
          <div 
            className="calendly-inline-widget h-full" 
            data-url={url}
            style={{ minWidth: '320px', height: '100%' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}