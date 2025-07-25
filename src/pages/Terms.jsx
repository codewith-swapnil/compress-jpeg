import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>{t("terms_title", "Terms of Service")} - SwiftCompress</title>
        <meta name="description" content={t("terms_meta_description", "Terms and conditions for using SwiftCompress")} />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">{t("terms_of_service", "Terms of Service")}</h1>
      
      <div className="prose max-w-none">
        <h2>{t("terms_intro_header", "1. Introduction")}</h2>
        <p>
          {t("terms_intro", 
            "By accessing or using the SwiftCompress website and services, you agree to be bound by these Terms of Service.")}
        </p>
        
        <h2>{t("service_description", "2. Service Description")}</h2>
        <p>
          {t("service_description_detail", 
            "SwiftCompress provides an online image compression tool that processes images directly in your browser without uploading them to our servers.")}
        </p>
        
        <h2>{t("user_responsibilities", "3. User Responsibilities")}</h2>
        <p>
          {t("user_responsibilities_detail", 
            "You agree not to use the service for any illegal purpose or to upload content that violates copyright laws.")}
        </p>
        
        <h2>{t("limitations", "4. Limitations of Liability")}</h2>
        <p>
          {t("limitations_detail", 
            "SwiftCompress is not liable for any damages resulting from the use of our service. We make no guarantees about the quality or results of image compression.")}
        </p>
        
        <h2>{t("changes_terms", "5. Changes to Terms")}</h2>
        <p>
          {t("changes_terms_detail", 
            "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.")}
        </p>
        
        <p className="mt-8 text-sm text-gray-500">
          {t("last_updated", "Last updated")}: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}