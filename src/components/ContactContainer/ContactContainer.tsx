"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Home,
  MapPin,
  Phone,
  Smartphone,
  Mail as MailIcon,
  Clock,
} from "lucide-react";
import styles from "./ContactContainer.module.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";
import type { ReCAPTCHA as ReCAPTCHAInstance } from "react-google-recaptcha";
import { useOnScreen } from "../hooks/useOnScreen";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function ContactContainer() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [recaptchaOK, setRecaptchaOK] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHAInstance>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [toastError, setToastError] = useState<string | null>(null);
  const animateContact = useOnScreen(contactRef, "0px", 0);
  const animate = useOnScreen(sectionRef, "0px", 0.1);

  useEffect(() => {
    if (inputWrapperRef.current) {
      const ro = new ResizeObserver(() => {
        // Trigger re-layout
      });
      ro.observe(inputWrapperRef.current);
      return () => ro.disconnect();
    }
  }, []);

  const validate = (
    field: keyof FormState,
    value: string
  ): string | undefined => {
    if (!value.trim()) return "Ovo polje je obavezno";
    switch (field) {
      case "name":
        return value.trim().split(" ").length < 2
          ? "Unesite ime i prezime"
          : undefined;
      case "email":
        return /^[^\s@]*[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]@[^\s@]+\.[^\s@]+$/.test(
          value
        )
          ? undefined
          : "Neispravan e-mail";
      case "phone":
        return /^\+?[0-9\s\-().]{7,}$/.test(value)
          ? undefined
          : "Neispravan broj telefona";
      case "message":
        return value.trim().length >= 10 ? undefined : "Poruka nedovoljno duga";
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof FormState;
    const value = e.target.value;

    const updatedForm = { ...form, [field]: value } as FormState;
    const fieldError = validate(field, value);
    const updatedErrors = { ...errors, [field]: fieldError };

    setForm(updatedForm);
    setErrors(updatedErrors);

    const isNowValid =
      Object.values(updatedForm).every((v) => v.trim() !== "") &&
      Object.values(updatedErrors).every((err) => !err);

    if (!isNowValid) {
      setRecaptchaOK(false);
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  const canSubmit =
    Object.values(form).every((v) => v.trim() !== "") &&
    Object.values(errors).every((e) => !e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !recaptchaToken) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recaptchaToken,
        }),
      });
      if (res.ok) {
        setFormSent(true);
      } else {
        setToastError("Greška pri slanju poruke");
        setTimeout(() => setToastError(null), 5000);
      }
    } catch {
      setToastError("Greška pri slanju poruke");
      setTimeout(() => setToastError(null), 5000);
    }
    setSubmitting(false);
  };

  const handleBack = () => {
    setFormSent(false);
    setForm({ name: "", phone: "", email: "", message: "" });
    setErrors({});
    setRecaptchaOK(false);
  };

  useEffect(() => {
    if (!canSubmit && recaptchaRef.current) {
      recaptchaRef.current.reset();
      setRecaptchaOK(false);
      setRecaptchaToken(null);
    }
  }, [canSubmit]);

  const normalize = (num: string) => num.replace(/[^\d+]/g, "");
  const landline = "037 772 – 002";
  const mobile = "+387 62 – 647 – 943";

  return (
    <section id="contact-section" className={styles.contactWrapper}>
      <div className={styles.innerWrapper}>
        <div
          ref={contactRef}
          className={`${styles.formContainer} ${
            animateContact ? styles.animateContact : ""
          }`}
        >
          {formSent ? (
            <div className={styles.successContainer}>
              <button onClick={handleBack} className="button primaryButton">
                Nazad na formu
              </button>
              <p className={styles.successMessage}>Poruka uspješno poslana</p>
            </div>
          ) : (
            <>
              <div className={styles.headerRow}>
                <h2 className={styles.formTitle}>Kontaktirajte nas</h2>
              </div>
              <form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Ime i prezime"
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}

                <div className={styles.inputWrapper} ref={inputWrapperRef}>
                  <PhoneInput
                    country="ba"
                    value={form.phone}
                    onChange={(phone) => {
                      setForm((prev) => ({ ...prev, phone }));
                      setErrors((prev) => ({
                        ...prev,
                        phone: validate("phone", phone),
                      }));
                    }}
                    enableSearch
                    searchPlaceholder="Pretraži zemlju..."
                    disableCountryCode={false}
                    countryCodeEditable={false}
                    containerClass={`${styles.phoneInputWrapper} ${styles.initialized}`}
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "56px",
                      height: "100%",
                      borderRadius: "10px",
                      fontSize: "1rem",
                    }}
                    buttonStyle={{
                      border: "none",
                      borderRadius: "10px 0 0 10px",
                      backgroundColor: "white",
                      outline: "none",
                      boxShadow: "none",
                      zIndex: 2,
                      height: "50px",
                      left: "1rem",
                      top: "1px",
                      width: "40px",
                    }}
                    dropdownClass={styles.countryList}
                    dropdownStyle={{
                      maxHeight: "200px",
                      overflow: "auto",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      boxShadow: "none",
                      zIndex: 9999,
                      fontSize: "1rem",
                    }}
                  />
                </div>
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}

                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}

                <textarea
                  name="message"
                  placeholder="Pitanje"
                  className={styles.textarea}
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <p className={styles.error}>{errors.message}</p>
                )}

                {canSubmit && (
                  <div className={styles.recaptchaWrapper}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LdeVjErAAAAAEw1hI3ZAc6QOo1O4Z93-GJeO1NL"
                      onChange={(token: string | null) => {
                        setRecaptchaToken(token);
                        setRecaptchaOK(!!token);
                      }}
                      onExpired={() => {
                        setRecaptchaOK(false);
                        setRecaptchaToken(null);
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="button primaryButton"
                  disabled={!canSubmit || !recaptchaOK || submitting}
                >
                  <MailIcon className={styles.submitIcon} />
                  {submitting ? "Slanje..." : "Pošalji"}
                </button>
              </form>
            </>
          )}
        </div>

        <div ref={sectionRef} className={styles.contactSection}>
          <div
            className={`${styles.mapContainer} ${
              animate ? styles.slideInLeft : ""
            }`}
          >
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.368293110142!2d15.815132076258571!3d45.17964047107072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4766ad5bddfc1313%3A0x95bb310cd36809dc!2sVeterinarska%20stanica%20E.%20S.%20Vet%20d.o.o.!5e0!3m2!1sen!2sba!4v1745227882801!5m2!1sen!2sba"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa veterinarske stanice"
            />
          </div>
          <div
            className={`${styles.infoContainer} ${
              animate ? styles.slideInRight : ""
            }`}
          >
            <h2 className={styles.title}>Posjetite nas</h2>
            <ul className={styles.infoList}>
              <li>
                <Home className={styles.icon} />
                Veterinarska stanica E. S. Vet
              </li>
              <li>
                <MapPin className={styles.icon} />
                Zuhdije Žalića 84, Velika Kladuša 77230
              </li>
              <li>
                <Phone className={styles.icon} />
                <a
                  href={`tel:${normalize(landline)}`}
                  className={styles.phoneLink}
                >
                  {landline}
                </a>
              </li>
              <li>
                <Smartphone className={styles.icon} />
                <a
                  href={`tel:${normalize(mobile)}`}
                  className={styles.phoneLink}
                >
                  {mobile}
                </a>
              </li>
              <li>
                <MailIcon className={styles.icon} />
                <a
                  href="mailto:esvet.vk@gmail.com"
                  className={styles.phoneLink}
                >
                  esvet.vk@gmail.com
                </a>
              </li>
              <li>
                <Clock className={styles.icon} />
                Ponedjeljak – Subota: 08h – 15h (redovne intervencije)
                <br />
                00h – 24h (hitne intervencije)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.overlayImage}>
        <Image
          src="/catanddog.webp"
          alt="Cat and dog"
          width={200}
          height={250}
          loading="lazy"
        />
      </div>

      {toastError && <div className={styles.toastError}>{toastError}</div>}
    </section>
  );
}
