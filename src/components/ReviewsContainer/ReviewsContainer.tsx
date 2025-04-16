"use client";

import React, { useState } from "react";
import styles from "./ReviewsContainer.module.css";
import { Star, ArrowLeft, ArrowRight, User } from "lucide-react";

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

  const prevReview = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? reviewsData.length - 1 : prev - 1
      );
      setIsFading(false);
    }, 300);
  };

  const nextReview = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === reviewsData.length - 1 ? 0 : prev + 1
      );
      setIsFading(false);
    }, 300);
  };

  const { text, user, city } = reviewsData[currentIndex];

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.sectionTitle}>Šta kažu naši klijenti</h2>

      <div className={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={styles.starIcon} />
        ))}
      </div>

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
        <button className={styles.arrowBtn} onClick={prevReview}>
          <ArrowLeft />
        </button>
        <button className={styles.arrowBtn} onClick={nextReview}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
