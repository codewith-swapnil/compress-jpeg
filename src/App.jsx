import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [manualMode, setManualMode] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 20);
    setFiles(droppedFiles);
    await compressImages(droppedFiles, quality);
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 20);
    setFiles(selectedFiles);
    await compressImages(selectedFiles, quality);
  };

  const compressImages = async (inputFiles, quality) => {
    const compressed = await Promise.all(
      inputFiles.map(async (file) => {
        if (file.type === "image/jpeg" || file.type === "image/jpg") {
          const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: quality };
          const compressedBlob = await imageCompression(file, options);
          return {
            original: file,
            compressed: compressedBlob,
          };
        }
        return { original: file, compressed: null };
      })
    );
    setCompressedFiles(compressed);
  };

  const handleQualityChange = async (e) => {
    const newQuality = e.target.value / 100;
    setQuality(newQuality);
    if (files.length) await compressImages(files, newQuality);
  };

  const handleDownload = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    compressedFiles.forEach(({ compressed, original }, idx) => {
      if (compressed) {
        zip.file(
          `compressed-${original.name}`,
          compressed,
          { binary: true }
        );
      }
    });
    const content = await zip.generateAsync({ type: "blob" });
    handleDownload(content, "compressed-images.zip");
  };

  // FAQ structured data for SEO
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I compress PNG or GIF images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, this tool supports only JPG/JPEG images for compression. PNG and GIF support may be added in the future."
        }
      },
      {
        "@type": "Question",
        "name": "Will compressing my images reduce their quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JPEG compression is lossy, so some quality loss is expected. You can control the quality level using the slider or manual mode to find the best balance for your needs."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a file size or image count limit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can select up to 20 images at a time. Each image is compressed to a maximum of 1MB by default, but actual results depend on your chosen quality setting."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! This JPEG compressor is fully responsive and works on smartphones, tablets, and desktops."
        }
      },
      {
        "@type": "Question",
        "name": "How can I integrate Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply replace the ad placeholder above with your Google AdSense code. This site is designed to comply with Google Ads policies: no adult, violent, or copyrighted content is processed or stored."
        }
      }
    ]
  };

  // Google Ads: trigger (re)render after mount for SPA
  useEffect(() => {
    if (window.adsbygoogle && window.adsbygoogle.loaded !== undefined) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {}
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('title')} - Compress JPG Images Instantly</title>
        <meta name="description" content={t('meta_description', { defaultValue: "Compress JPG and JPEG images online for free. Drag & drop up to 20 images, adjust quality, preview results, and download compressed images or a ZIP archive. 100% privacy, no uploads." })} />
        <meta name="keywords" content="jpeg compressor, jpg compressor, image compression, online image compressor, compress jpg, compress jpeg, reduce image size, photo compressor, free image compressor" />
        <link rel="canonical" href="https://yourdomain.com/" />
        {/* OpenGraph */}
        <meta property="og:title" content="Free Online JPEG Compressor - Compress JPG Images Instantly" />
        <meta property="og:description" content="Compress JPG and JPEG images online for free. Drag & drop up to 20 images, adjust quality, preview results, and download compressed images or a ZIP archive. 100% privacy, no uploads." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online JPEG Compressor - Compress JPG Images Instantly" />
        <meta name="twitter:description" content="Compress JPG and JPEG images online for free. Drag & drop up to 20 images, adjust quality, preview results, and download compressed images or a ZIP archive. 100% privacy, no uploads." />
        <meta name="twitter:image" content="https://yourdomain.com/og-image.png" />
        {/* FAQ Structured Data */}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <header>
        <nav className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 py-3 px-4 text-white text-center shadow flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          <span className="font-extrabold tracking-wide text-xl flex items-center gap-2">
            <svg className="w-7 h-7 text-white inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M12 4v16m0 0H3m9 0a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path></svg>
            {t('title')}
          </span>
          <a
            href="#about"
            className="text-white hover:bg-white/10 font-semibold px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            {t('about')} & {t('faq')}
          </a>
        </nav>
      </header>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-white flex flex-col items-center p-0 font-sans">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 py-16 px-4 text-white text-center shadow-lg rounded-b-3xl relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          <h1 className="relative text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg animate-fade-in">
            {t('title')}
          </h1>
          <p className="relative max-w-2xl mx-auto text-xl md:text-2xl font-medium mb-8 animate-fade-in delay-100">
            {t('hero_subtitle', {
              defaultValue: "Compress your JPG images instantly. Drag & drop up to 20 images, adjust quality, and download all at once. Fast, private, and 100% free."
            })}
          </p>
          <div className="flex justify-center gap-4 mb-4 animate-fade-in delay-200">
            <a href="#compressor" className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-50 transition text-lg focus:outline-none focus:ring-2 focus:ring-white">
              {t('start_compressing', { defaultValue: "Start Compressing" })}
            </a>
            <a href="#about" className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-800 transition text-lg focus:outline-none focus:ring-2 focus:ring-white">
              {t('learn_more', { defaultValue: "Learn More" })}
            </a>
          </div>
          <p className="relative max-w-xl mx-auto text-base opacity-90 animate-fade-in delay-300">
            {t('privacy_note', { defaultValue: "No uploads. All processing happens in your browser for maximum privacy." })}
          </p>
        </section>

        {/* Compression Section */}
        <section id="compressor" className="w-full max-w-3xl mt-12 px-4">
          <div
            className="border-4 border-dashed border-indigo-300 rounded-3xl p-12 mb-10 bg-white shadow-xl transition hover:border-indigo-500 flex flex-col items-center hover:shadow-2xl relative group"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
              max={20}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-indigo-700 font-bold text-2xl hover:underline transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
              tabIndex={0}
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                {t('select_files')}
              </span>
            </label>
            <span className="text-sm text-gray-500 mt-3">{t('only_jpg', { defaultValue: "Only JPG/JPEG images are supported." })}</span>
            {files.length > 0 && (
              <div className="absolute top-3 right-6 text-xs text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full shadow font-semibold animate-bounce">
                {files.length} file{files.length > 1 ? "s" : ""} selected
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none group-hover:bg-indigo-50/30 rounded-3xl transition"></div>
          </div>

          {/* Manual Mode Toggle */}
          <div className="flex items-center mb-8 gap-2">
            <input
              id="manualMode"
              type="checkbox"
              checked={manualMode}
              onChange={() => setManualMode(!manualMode)}
              className="accent-indigo-600 scale-125 transition"
            />
            <label htmlFor="manualMode" className="text-gray-700 font-medium select-none cursor-pointer">
              {t('manual_mode')}
            </label>
          </div>

          {/* Quality Slider (global or per-image) */}
          {!manualMode && (
            <div className="mb-10">
              <label htmlFor="quality" className="block mb-2 font-semibold text-gray-700">
                {t('compression_quality', { defaultValue: "Compression Quality:" })} <span className="font-bold text-indigo-700">{Math.round(quality * 100)}%</span>
              </label>
              <input
                id="quality"
                type="range"
                min="10"
                max="90"
                value={Math.round(quality * 100)}
                onChange={handleQualityChange}
                className="w-full accent-indigo-600 h-2 rounded-lg bg-indigo-100"
              />
            </div>
          )}

          {/* Compressed Images Preview */}
          {compressedFiles.length > 0 && (
            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
              {compressedFiles.map(({ original, compressed }, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-5 flex flex-col items-center group transition hover:shadow-2xl border border-indigo-100 hover:border-indigo-300 relative"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <div className="relative w-full h-48 flex items-center justify-center mb-3">
                    {compressed ? (
                      <img
                        src={URL.createObjectURL(compressed)}
                        alt={`Compressed preview of ${original.name}`}
                        className="w-full h-48 object-contain rounded-xl border border-indigo-100 shadow bg-white"
                        loading="lazy"
                        itemProp="contentUrl"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center text-gray-400">
                        <span>Unsupported file</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <div className="text-xs text-gray-500 truncate w-full text-center font-medium" itemProp="name">{original.name}</div>
                    {compressed && (
                      <>
                        <div className="text-sm text-indigo-700 font-bold mt-1">
                          {(compressed.size / 1024).toFixed(1)} KB
                        </div>
                        <button
                          className="mt-3 px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          onClick={() => handleDownload(compressed, "compressed-" + original.name)}
                        >
                          Download
                        </button>
                        {manualMode && (
                          <div className="mt-3 w-full">
                            <input
                              type="range"
                              min="10"
                              max="90"
                              value={Math.round(quality * 100)}
                              onChange={async (e) => {
                                const newQuality = e.target.value / 100;
                                const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: newQuality };
                                const compressedBlob = await imageCompression(original, options);
                                setCompressedFiles((prev) =>
                                  prev.map((item, i) =>
                                    i === idx ? { ...item, compressed: compressedBlob } : item
                                  )
                                );
                              }}
                              className="w-full accent-indigo-600"
                            />
                            <div className="text-xs text-gray-500 text-center">
                              Quality: {Math.round(quality * 100)}%
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {compressed && (
                    <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold shadow">
                      Saved {Math.max(0, Math.round(100 - (compressed.size / original.size) * 100))}%
                    </span>
                  )}
                </div>
              ))}
            </article>
          )}

          {/* Download All Button */}
          {compressedFiles.length > 0 && (
            <div className="flex justify-center mb-10">
              <button
                className="px-10 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-2xl shadow hover:from-indigo-600 hover:to-blue-600 transition text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={handleDownloadAll}
              >
                {t('download_zip')}
              </button>
            </div>
          )}
        </section>

        {/* Google AdSense Ad (top of main content) */}
        <div className="google-ad">
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-40620600997"
              data-ad-slot="6449429019"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>

        {/* About Section */}
        <section id="about" className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 mb-12 mt-10 border border-indigo-50">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700" itemProp="headline">{t('about')}</h2>
          <p className="text-gray-700 mb-2" itemProp="description">
            This free online JPEG compressor helps you reduce the file size of your images while maintaining quality. 
            Select up to 20 JPG or JPEG images, adjust compression quality, and download your optimized images individually or as a ZIP archive.
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">How does JPEG compression work?</span><br />
            JPEG compression uses a lossy algorithm that reduces file size by removing some image data, especially details that are less visible to the human eye. This allows for significant size reduction while keeping the image visually similar. You can control the quality/size trade-off using the compression slider or manual mode.
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">What is a JPEG?</span><br />
            JPEG (Joint Photographic Experts Group) is a widely used image format best suited for photographs and realistic images. It supports millions of colors and achieves small file sizes through lossy compression. Most digital cameras and smartphones use JPEG as the default format for photos.
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Is it safe to use this tool?</span><br />
            Yes! All compression happens directly in your browser. Your images never leave your device and are not uploaded to any server, ensuring privacy and security.
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Built with React and Tailwind CSS. No images are uploaded to any server—compression happens entirely in your browser.
          </p>
          {/* Google Ads Placeholder */}
          <div className="my-8 flex justify-center">
            {/* Google AdSense Responsive Ad */}
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4062060956100997"
              data-ad-slot="2103167504"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          </div>
          {/* FAQ Section */}
          <article className="mt-8" itemScope itemType="https://schema.org/FAQPage">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">{t('faq')}</h3>
            <div className="mb-4" itemScope itemType="https://schema.org/Question">
              <span className="font-semibold" itemProp="name">Q: Can I compress PNG or GIF images?</span>
              <br />
              <span className="text-gray-700" itemProp="acceptedAnswer">Currently, this tool supports only JPG/JPEG images for compression. PNG and GIF support may be added in the future.</span>
            </div>
            <div className="mb-4" itemScope itemType="https://schema.org/Question">
              <span className="font-semibold" itemProp="name">Q: Will compressing my images reduce their quality?</span>
              <br />
              <span className="text-gray-700" itemProp="acceptedAnswer">JPEG compression is lossy, so some quality loss is expected. You can control the quality level using the slider or manual mode to find the best balance for your needs.</span>
            </div>
            <div className="mb-4" itemScope itemType="https://schema.org/Question">
              <span className="font-semibold" itemProp="name">Q: Is there a file size or image count limit?</span>
              <br />
              <span className="text-gray-700" itemProp="acceptedAnswer">You can select up to 20 images at a time. Each image is compressed to a maximum of 1MB by default, but actual results depend on your chosen quality setting.</span>
            </div>
            <div className="mb-4" itemScope itemType="https://schema.org/Question">
              <span className="font-semibold" itemProp="name">Q: Can I use this tool on mobile devices?</span>
              <br />
              <span className="text-gray-700" itemProp="acceptedAnswer">Yes! This JPEG compressor is fully responsive and works on smartphones, tablets, and desktops.</span>
            </div>
            <div className="mb-2" itemScope itemType="https://schema.org/Question">
              <span className="font-semibold" itemProp="name">Q: How can I integrate Google Ads?</span>
              <br />
              <span className="text-gray-700" itemProp="acceptedAnswer">Simply replace the ad placeholder above with your Google AdSense code. This site is designed to comply with Google Ads policies: no adult, violent, or copyrighted content is processed or stored.</span>
            </div>
          </article>
        </section>
        <footer className="w-full text-center text-xs text-gray-400 pb-6">
          &copy; {new Date().getFullYear()} JPEG Compressor Online. All rights reserved.
        </footer>
      </main>
      <style>{`
        .animate-fade-in { animation: fadeIn 1s both; }
        .animate-fade-in.delay-100 { animation-delay: .1s; }
        .animate-fade-in.delay-200 { animation-delay: .2s; }
        .animate-fade-in.delay-300 { animation-delay: .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
      `}</style>
    </>
  );
}