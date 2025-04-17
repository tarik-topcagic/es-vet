"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ReviewsContainer.module.css";
import { User } from "lucide-react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface Review {
  text: string;
  user: string;
  city: string;
}

const reviewsData: Review[] = [
  {
    text: '"Prijatno osoblje, uslužni i na pravoj lokaciji"',
    user: "Asim Omeragić",
    city: "Velika Kladuša",
  },
  {
    text: '"Da bi vaši kućni ljubimci bili sigurni, te da bi vaša domaća grla (krave, konji, ovce i koze) bili zdravi posjetite ovu ustanovu...."',
    user: "Fikret Nizandžić",
    city: "Velika Kladuša",
  },
  {
    text: '"Odlični su"',
    user: "Fadil Begulić",
    city: "Velika Kladuša",
  },
  {
    text: '"Svaka čast, nikad brže nisam obavio pregled i vakcinaciju psa. Osoblje je fantastično!"',
    user: "Tarik Topčagić",
    city: "Cazin",
  },
];

export default function ReviewsContainer() {
  const randomIndex = Math.floor(Math.random() * reviewsData.length);
  const [currentIndex, setCurrentIndex] = useState(randomIndex);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const triggerNext = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i === reviewsData.length - 1 ? 0 : i + 1));
      setIsFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    clearTimer();
    intervalRef.current = window.setInterval(() => {
      triggerNext();
    }, 5000);
    return clearTimer;
  }, [triggerNext]);

  const triggerPrev = () => {
    clearTimer();
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i === 0 ? reviewsData.length - 1 : i - 1));
      setIsFading(false);
      intervalRef.current = window.setInterval(() => {
        triggerNext();
      }, 5000);
    }, 300);
  };

  const triggerNextAndRestart = () => {
    clearTimer();
    triggerNext();
    intervalRef.current = window.setInterval(() => {
      triggerNext();
    }, 5000);
  };

  const { text, user, city } = reviewsData[currentIndex];

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.sectionTitle}>Šta kažu naši klijenti</h2>
      <div className={styles.avatarCircle}>
        <User className={styles.userIcon} />
      </div>
      <div
        className={`${styles.reviewContent} ${
          isFading ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <p className={styles.reviewText}>{text}</p>
        <p className={styles.userName}>{user}</p>
        <p className={styles.userCity}>{city}</p>
      </div>
      <div className={styles.arrowsRow}>
        <button
          className={`${styles.arrowBtn} ${styles.left}`}
          onClick={triggerPrev}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={` ${styles.arrowBtn} ${styles.right}`}
          onClick={triggerNextAndRestart}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
