import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CALENDAR_URL = "https://bookme.name/embed/widget/4573/PkkmsRgxM6nqOnUWU19ErYrgjwUnFdCG9FxGCRAmDRfX8SgQudeXGIPa1h36";

const QuizModal = ({ isOpen, onClose, children }: QuizModalProps) => {
  const [calendarPreloaded, setCalendarPreloaded] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Start preloading calendar when modal opens
      if (!calendarPreloaded) {
        setCalendarPreloaded(true);
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, calendarPreloaded]);

  return (
    <>
      {/* Hidden Calendar Preloader - loads in background when modal first opens */}
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
            className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={onClose}
          >
            {/* Close Button - Outside the card on the backdrop */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={onClose}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] p-2.5 rounded-full bg-background/90 hover:bg-background text-foreground shadow-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] overflow-hidden md:overflow-y-auto bg-background md:rounded-3xl shadow-lift-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizModal;
