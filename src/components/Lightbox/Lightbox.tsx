"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: (finalIndex: number) => void;
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const prevImage = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleClose = () => {
    onClose(currentIndex);
  };

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        onClick={handleClose}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button onClick={handleClose} className={styles.closeButton}>
            ×
          </button>
          <button onClick={prevImage} className={styles.leftArrow}>
            <IoIosArrowBack />
          </button>
          <div className={styles.imageContainer}>
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              objectFit="contain"
            />
          </div>
          <button onClick={nextImage} className={styles.rightArrow}>
            <IoIosArrowForward />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
