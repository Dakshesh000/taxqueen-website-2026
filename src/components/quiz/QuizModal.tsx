import { ReactNode, useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  hasEngaged?: boolean;
}

const CALENDAR_URL = "https://bookme.name/embed/widget/4573/PkkmsRgxM6nqOnUWU19ErYrgjwUnFdCG9FxGCRAmDRfX8SgQudeXGIPa1h36";

const QuizModal = ({ isOpen, onClose, children, hasEngaged = false }: QuizModalProps) => {
  const [calendarPreloaded, setCalendarPreloaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Prevent body scroll when modal is open and manage focus
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      
      if (!calendarPreloaded) {
        setCalendarPreloaded(true);
      }
      
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
      
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, calendarPreloaded]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Hidden Calendar Preloader */}
      {calendarPreloaded && (
        <div className="fixed -left-[9999px] top-0 w-1 h-1 overflow-hidden" aria-hidden="true">
          <iframe
            src={CALENDAR_URL}
            title="Calendar Preload"
            width="1"
            height="1"
            loading="eager"
          />
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                relative bg-background shadow-lift-lg flex flex-col overflow-hidden
                w-[95%] max-w-2xl rounded-3xl
                h-[90dvh] max-h-[calc(90dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))]
                md:h-auto md:w-full
                ${hasEngaged ? 'md:min-h-[620px] md:max-h-[90vh]' : 'md:max-h-[90vh]'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Fixed position on mobile, absolute on desktop */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close quiz"
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-muted/90 hover:bg-muted text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Mobile: Scrollable content area that fills screen */}
              <div className="flex-1 overflow-hidden md:overflow-visible">
                <ScrollArea className="h-full md:h-auto">
                  <div className="pb-[env(safe-area-inset-bottom)]">
                    {children}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizModal;
