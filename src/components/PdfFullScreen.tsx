import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Expand, Loader2 } from 'lucide-react'
import { Document, Page } from 'react-pdf'
import SimpleBar from 'simplebar-react'
import { toast } from 'sonner'
import { useResizeDetector } from 'react-resize-detector'

interface PdfFullscreenProps {
  fileURL: string
}

const PdfFullScreen = ({ fileURL }: PdfFullscreenProps ) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [numPages, setNumPages] = useState<number>()

  const { width, ref } = useResizeDetector()

  return(
    <Dialog 
    open={isOpen}
    onOpenChange={(v) => {
      if(!v) {
        setIsOpen(v)
      }
    }}>
        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
          <Button 
          variant='ghost' 
          className='gap-1.5' 
          aria-label='fullscreen'>
            <Expand className='h-4 w-4'/>
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-7xl w-full'>
          <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)] mt-6' >
          <div ref={ref}>
            <Document
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadError={() => {
                return toast.error('Error when loading PDF', {
                  description: 'Please try again later',
                  duration: 5000
                })
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={fileURL}
              className='max-h-full' >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  width={width ? width : 1}
                  pageNumber={i + 1}
                />
              ))}
            </Document>
          </div>
          </SimpleBar>
        </DialogContent>
    </Dialog>
  )

}

export default PdfFullScreen