import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>{t("contact_title", "Contact Us")} - SwiftCompress</title>
        <meta name="description" content={t("contact_meta_description", "Get in touch with the SwiftCompress team")} />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">{t("contact_us", "Contact Us")}</h1>
      
      <div className="prose max-w-none">
        <h2>{t("contact_info", "Contact Information")}</h2>
        <p>
          {t("contact_email", "Email")}: support@swiftcompress.com
        </p>
        
        <h2 className="mt-6">{t("report_issues", "Report Issues")}</h2>
        <p>
          {t("report_issues_detail", 
            "If you encounter any problems with our service or have suggestions for improvement, please email us at support@swiftcompress.com.")}
        </p>
        
        <h2 className="mt-6">{t("business_inquiries", "Business Inquiries")}</h2>
        <p>
          {t("business_inquiries_detail", 
            "For business partnerships or other inquiries, please contact us at partnerships@swiftcompress.com.")}
        </p>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">{t("feedback_header", "Feedback Form")}</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t("form_name", "Your Name")}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("form_email", "Email Address")}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t("form_message", "Message")}
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("form_submit", "Submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}