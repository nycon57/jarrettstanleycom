'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Download } from 'lucide-react'
import { Resource } from '@/lib/supabase'
import { trackResourceDownload } from '@/app/actions/blog'

const downloadFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  company: z.string().optional(),
})

type DownloadFormData = z.infer<typeof downloadFormSchema>

interface DownloadModalState {
  isOpen: boolean
  resource: Resource | null
}

export function useDownloadModal() {
  const [state, setState] = useState<DownloadModalState>({
    isOpen: false,
    resource: null,
  })

  const requestDownload = useCallback((resource: Resource) => {
    if (resource.requires_email) {
      setState({ isOpen: true, resource })
    } else {
      window.open(resource.file_url, '_blank')
    }
  }, [])

  const close = useCallback(() => {
    setState({ isOpen: false, resource: null })
  }, [])

  return { ...state, requestDownload, close }
}

interface DownloadModalProps {
  isOpen: boolean
  resource: Resource | null
  onClose: () => void
}

export function DownloadModal({ isOpen, resource, onClose }: DownloadModalProps) {
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema)
  })

  const onDownloadSubmit = async (data: DownloadFormData) => {
    if (!resource) return

    setDownloadLoading(true)
    setDownloadError(null)
    try {
      await trackResourceDownload(
        resource.id,
        data.email,
        data.firstName,
        data.lastName,
        data.company
      )

      window.open(resource.file_url, '_blank')
      reset()
      onClose()
    } catch (error) {
      console.error('Error tracking download:', error)
      setDownloadError('Something went wrong. Please try again.')
    } finally {
      setDownloadLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Resource</DialogTitle>
          <DialogDescription>
            Please provide your information to download{' '}
            <strong>{resource?.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onDownloadSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="Your first name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Your last name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Your company name"
            />
          </div>

          {downloadError && (
            <p className="text-sm text-red-600">{downloadError}</p>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={downloadLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={downloadLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {downloadLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Now
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
