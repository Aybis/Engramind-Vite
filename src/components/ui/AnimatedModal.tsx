import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { backdrop, modal } from '../../utils/uiHelper';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  widthFitContainer?: boolean;
  showCrossIcon?: boolean;
  className?: string;
  customWidth?: string;
  usingBackgroundWCard?: boolean;
}

export const AnimatedModal = ({
  isOpen,
  onClose,
  children,
  widthFitContainer = false,
  showCrossIcon = true,
  className,
  customWidth = '',
  usingBackgroundWCard = true,
}: AnimatedModalProps) => {
  useEffect(() => {
    const handleEsc = (e: any) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
          onClick={onClose}
        >
          <motion.div
            className={[
              className,
              'absolute top-1/2 left-1/2 max-w-7xl',
              customWidth
                ? customWidth
                : widthFitContainer
                ? 'w-full md:w-fit'
                : 'w-full lg:w-full',
              usingBackgroundWCard
                ? ' bg-white dark:bg-zinc-900 border dark:border-zinc-700 border-zinc-200 rounded-2xl  p-6'
                : 'bg-none',
            ].join('')}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {showCrossIcon && (
              <button
                type="button"
                onClick={onClose}
                className="absolute cursor-pointer top-3 right-3 text-gray-500 dark:hover:text-white hover:text-black"
              >
                ✕
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
