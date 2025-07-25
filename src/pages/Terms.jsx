import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6" style={styles.container}>
      <Helmet>
        <title>{t("terms_title", "Terms of Service")} - SwiftCompress</title>
        <meta name="description" content={t("terms_meta_description", "Terms and conditions for using SwiftCompress")} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6" style={styles.h1}>{t("terms_of_service", "Terms of Service")}</h1>

      <div className="prose max-w-none" style={styles.prose}>
        <h2 style={styles.h2}>{t("terms_intro_header", "1. Introduction")}</h2>
        <p style={styles.p}>
          {t("terms_intro",
            "By accessing or using the SwiftCompress website and services, you agree to be bound by these Terms of Service.")}
        </p>

        <h2 style={styles.h2}>{t("service_description", "2. Service Description")}</h2>
        <p style={styles.p}>
          {t("service_description_detail",
            "SwiftCompress provides an online image compression tool that processes images directly in your browser without uploading them to our servers.")}
        </p>

        <h2 style={styles.h2}>{t("user_responsibilities", "3. User Responsibilities")}</h2>
        <p style={styles.p}>
          {t("user_responsibilities_detail",
            "You agree not to use the service for any illegal purpose or to upload content that violates copyright laws.")}
        </p>

        <h2 style={styles.h2}>{t("limitations", "4. Limitations of Liability")}</h2>
        <p style={styles.p}>
          {t("limitations_detail",
            "SwiftCompress is not liable for any damages resulting from the use of our service. We make no guarantees about the quality or results of image compression.")}
        </p>

        <h2 style={styles.h2}>{t("changes_terms", "5. Changes to Terms")}</h2>
        <p style={styles.p}>
          {t("changes_terms_detail",
            "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.")}
        </p>

        <p className="mt-8 text-sm text-gray-500" style={styles.lastUpdated}>
          {t("last_updated", "Last updated")}: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '896px', // max-w-4xl (64rem)
    margin: '0 auto',  // mx-auto
    padding: '1.5rem', // p-6
    fontFamily: 'Arial, sans-serif', // Added a common font-family
    lineHeight: '1.6', // Improved readability
    color: '#333', // Default text color
  },
  h1: {
    fontSize: '2.5rem', // Increased for prominence
    fontWeight: 'bold',
    marginBottom: '1.5rem', // mb-6
    color: '#1a202c', // Darker color for main heading
    textAlign: 'center', // Centered heading
  },
  prose: {
    maxWidth: 'none', // max-w-none
    color: '#374151', // gray-700
    fontSize: '1rem',
    lineHeight: '1.75',
  },
  h2: {
    fontSize: '1.875rem', // text-2xl equivalent for subheadings
    fontWeight: 'bold',
    marginTop: '2.5rem', // More space above
    marginBottom: '1rem',
    color: '#2d3748', // Slightly lighter than h1
    borderBottom: '1px solid #e2e8f0', // Subtle separator
    paddingBottom: '0.5rem',
  },
  p: {
    marginBottom: '1em', // Standard paragraph spacing
    color: '#4a5568', // Slightly softer text color
  },
  lastUpdated: {
    marginTop: '2rem', // mt-8
    fontSize: '0.875rem', // text-sm
    color: '#6b7280', // text-gray-500
    textAlign: 'right', // Align to the right
  }
};