"use client";

import React from "react";
import styles from "./ReviewsContainer.module.css";
import { User } from "lucide-react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useSlider } from "../hooks/useSlider";

interface Review {
  text: string;
  user: string;
  city: string;
}

const reviewsData: Review[] = [
  {
    text: `"Prijatno osoblje, uslužni i na pravoj lokaciji"`,
    user: "Asim Omeragić",
    city: "Velika Kladuša",
  },
  {
    text: `"Da bi vaši kućni ljubimci bili sigurni, te da bi vaša domaća grla (krave, konji, ovce i koze) bili zdravi posjetite ovu ustanovu...."`,
    user: "Fikret Nizandžić",
    city: "Velika Kladuša",
  },
  {
    text: `"Odlični su"`,
    user: "Fadil Begulić",
    city: "Velika Kladuša",
  },
];

export default function ReviewsContainer() {
  const { currentIndex, isFading, goPrev, restart } = useSlider({
    length: reviewsData.length,
    interval: 3000,
    fadeDuration: 300,
  });
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
          onClick={goPrev}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={`${styles.arrowBtn} ${styles.right}`}
          onClick={restart}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
