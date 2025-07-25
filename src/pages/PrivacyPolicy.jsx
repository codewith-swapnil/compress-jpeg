import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>{t("privacy_policy_title", "Privacy Policy")} - SwiftCompress</title>
        <meta name="description" content={t("privacy_meta_description", "Learn about our privacy practices and how we handle your data")} />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">{t("privacy_policy", "Privacy Policy")}</h1>
      
      <div className="prose max-w-none">
        <h2>{t("privacy_intro_header", "Introduction")}</h2>
        <p>
          {t("privacy_intro", 
            "SwiftCompress is committed to protecting your privacy. This Privacy Policy explains how we handle your data when you use our service.")}
        </p>
        
        <h2>{t("data_collection", "Data Collection")}</h2>
        <p>
          {t("data_collection_detail", 
            "Our image compression tool processes your images entirely in your browser. We do not upload, store, or collect any of your images or personal data.")}
        </p>
        
        <h2>{t("analytics", "Analytics")}</h2>
        <p>
          {t("analytics_detail", 
            "We may use anonymous analytics to understand usage patterns and improve our service. This does not include any personal information.")}
        </p>
        
        <h2>{t("ads", "Advertising")}</h2>
        <p>
          {t("ads_detail", 
            "We display ads using Google AdSense. These ads may use cookies to personalize content. You can control ad personalization through your Google account settings.")}
        </p>
        
        <h2>{t("changes", "Changes to This Policy")}</h2>
        <p>
          {t("changes_detail", 
            "We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page.")}
        </p>
        
        <p className="mt-8 text-sm text-gray-500">
          {t("last_updated", "Last updated")}: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}