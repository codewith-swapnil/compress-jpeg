import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8"> {/* Centering container */}
      <Helmet>
        <title>{t("contact_title", "Contact Us")} - AutoCompress</title>
        <meta name="description" content={t("contact_meta_description", "Get in touch with the AutoCompress team")} />
      </Helmet>

      <div className="card max-w-4xl w-full"> {/* Apply the 'card' class here */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient"> {/* Larger, gradient heading */}
          {t("contact_us", "Contact Us")}
        </h1>

        <div className="prose max-w-none text-slate-700 leading-relaxed"> {/* Adjusted prose for better text appearance */}
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t("contact_info", "Contact Information")}</h2>
          <p className="mb-4">
            <span className="font-semibold">{t("contact_email", "Email")}:</span> <a href="mailto:support@autocompress.com" className="text-indigo-600 hover:underline">support@autocompress.com</a>
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4 text-indigo-700">{t("report_issues", "Report Issues")}</h2>
          <p className="mb-4">
            {t("report_issues_detail",
              "If you encounter any problems with our service or have suggestions for improvement, please email us at support@autocompress.com.")}
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4 text-indigo-700">{t("business_inquiries", "Business Inquiries")}</h2>
          <p className="mb-4">
            {t("business_inquiries_detail",
              "For business partnerships or other inquiries, please contact us at partnerships@autocompress.com.")}
          </p>

          <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner border border-indigo-100"> {/* Styled feedback form container */}
            <h3 className="text-2xl font-bold mb-6 text-indigo-700">{t("feedback_header", "Send Us Your Feedback")}</h3>
            <form className="space-y-6"> {/* Increased spacing */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form_name", "Your Name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 transition-all duration-200 ease-in-out bg-white/70" // Added rounded-xl, p-3, transition, bg-white/70
                  placeholder={t("form_name_placeholder", "Enter your name")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form_email", "Email Address")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 transition-all duration-200 ease-in-out bg-white/70" // Added rounded-xl, p-3, transition, bg-white/70
                  placeholder={t("form_email_placeholder", "your.email@example.com")}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form_message", "Message")}
                </label>
                <textarea
                  id="message"
                  rows="5" // Increased rows for more space
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 transition-all duration-200 ease-in-out bg-white/70" // Added rounded-xl, p-3, transition, bg-white/70
                  placeholder={t("form_message_placeholder", "Tell us what's on your mind...")}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto" // Applied btn and btn-primary classes, full width on small screens
              >
                {t("form_submit", "Submit Feedback")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}