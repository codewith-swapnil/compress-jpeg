import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8"> {/* Centering container */}
      <Helmet>
        <title>{t("privacy_policy_title", "Privacy Policy")} - SwiftCompress</title>
        <meta name="description" content={t("privacy_meta_description", "Learn about our privacy practices and how we handle your data")} />
      </Helmet>

      <div className="card max-w-4xl w-full"> {/* Apply the 'card' class here */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient"> {/* Larger, gradient heading */}
          {t("privacy_policy", "Privacy Policy")}
        </h1>

        <div className="prose max-w-none text-slate-700 leading-relaxed"> {/* Adjusted prose for better text appearance */}
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t("privacy_intro_header", "Introduction")}</h2>
          <p className="mb-4">
            {t("privacy_intro",
              "SwiftCompress is committed to protecting your privacy. This Privacy Policy explains how we handle your data when you use our service.")}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t("data_collection", "Data Collection")}</h2>
          <p className="mb-4">
            {t("data_collection_detail",
              "Our image compression tool processes your images entirely in your browser. We do not upload, store, or collect any of your images or personal data.")}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t("analytics", "Analytics")}</h2>
          <p className="mb-4">
            {t("analytics_detail",
              "We may use anonymous analytics to understand usage patterns and improve our service. This does not include any personal information.")}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t("ads", "Advertising")}</h2>
          <p className="mb-4">
            {t("ads_detail",
              "We display ads using Google AdSense. These ads may use cookies to personalize content. You can control ad personalization through your Google account settings.")}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t("changes", "Changes to This Policy")}</h2>
          <p className="mb-4">
            {t("changes_detail",
              "We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page.")}
          </p>

          <p className="mt-8 text-sm text-gray-500">
            {t("last_updated", "Last updated")}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}