import React, { useState, useEffect, useCallback } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [manualMode, setManualMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const supportedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  useEffect(() => {
    if ((files.length > 0 || compressedFiles.length > 0) && !isProcessing) {
      const timer = setTimeout(() => {
        setShowAd(true);
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense push error:", e);
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowAd(false);
    }
  }, [files, compressedFiles, isProcessing]);

  const compressImages = useCallback(
    async (inputFiles, currentQuality) => {
      setIsProcessing(true);
      const compressed = await Promise.all(
        inputFiles.map(async (file) => {
          if (supportedImageTypes.includes(file.type)) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
              initialQuality: currentQuality,
            };
            try {
              const compressedBlob = await imageCompression(file, options);
              return {
                original: file,
                compressed: compressedBlob,
                id: file.name + file.lastModified,
              };
            } catch (error) {
              console.error("Error compressing file:", file.name, error);
              return { 
                original: file, 
                compressed: null, 
                error: true, 
                id: file.name + file.lastModified 
              };
            }
          }
          return { 
            original: file, 
            compressed: null, 
            unsupported: true, 
            id: file.name + file.lastModified 
          };
        })
      );
      setCompressedFiles(compressed);
      setIsProcessing(false);
    },
    [supportedImageTypes]
  );

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => supportedImageTypes.includes(file.type))
      .slice(0, 20);
    setFiles(droppedFiles);
    if (droppedFiles.length > 0) {
      await compressImages(droppedFiles, quality);
    } else {
      setCompressedFiles([]);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files)
      .filter(file => supportedImageTypes.includes(file.type))
      .slice(0, 20);
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      await compressImages(selectedFiles, quality);
    } else {
      setCompressedFiles([]);
    }
  };

  const handleQualityChange = async (e) => {
    const newQuality = parseFloat(e.target.value) / 100;
    setQuality(newQuality);
    if (files.length > 0) {
      await compressImages(files, newQuality);
    }
  };

  const handleIndividualQualityChange = async (idx, originalFile, newIndividualQuality) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: newIndividualQuality,
    };
    try {
      const compressedBlob = await imageCompression(originalFile, options);
      setCompressedFiles((prev) =>
        prev.map((item, i) =>
          i === idx ? { 
            ...item, 
            compressed: compressedBlob, 
            individualQuality: newIndividualQuality 
          } : item
        )
      );
    } catch (error) {
      console.error("Error re-compressing individual file:", originalFile.name, error);
    }
  };

  const handleDownload = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    if (compressedFiles.length === 0) return;
    setIsProcessing(true);
    const zip = new JSZip();
    compressedFiles.forEach(({ compressed, original }) => {
      if (compressed) {
        zip.file(
          `compressed-${original.name.replace(/\.(jpeg|jpg|png|webp|gif)$/i, '')}.${compressed.type.split('/')[1] || 'jpeg'}`,
          compressed,
          { binary: true }
        );
      }
    });
    try {
      const content = await zip.generateAsync({ type: "blob" });
      handleDownload(content, "swiftcompress-images.zip");
    } catch (error) {
      console.error("Error generating zip:", error);
      alert(t("zip_error", { defaultValue: "Failed to create zip file. Please try again." }));
    } finally {
      setIsProcessing(false);
    }
  };

  const getCompressionSaving = (originalSize, compressedSize) => {
    if (!originalSize || !compressedSize) return 0;
    return Math.max(0, Math.round(100 - (compressedSize / originalSize) * 100));
  };

  const seoLangs = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "zh", label: "中文" },
    { code: "hi", label: "हिन्दी" },
    { code: "ar", label: "العربية" },
    { code: "fr", label: "Français" },
    { code: "ru", label: "Русский" },
    { code: "pt", label: "Português" },
    { code: "de", label: "Deutsch" },
    { code: "ja", label: "日本語" },
  ];

  return (
    <>
      <Helmet>
        <title>{t("title", { defaultValue: "SwiftCompress - Compress Images Online" })} - Free JPG, PNG, WebP, GIF Compressor</title>
        <meta
          name="description"
          content={t("meta_description", {
            defaultValue: "Compress JPG, PNG, WebP, and GIF images online for free with SwiftCompress. Drag & drop up to 20 images, adjust quality, preview results, and download compressed images or a ZIP archive. 100% privacy, no uploads."
          })}
        />
        <meta
          name="keywords"
          content="image compressor, jpg compressor, png compressor, webp compressor, gif compressor, online image compressor, compress jpg, compress png, compress webp, compress gif, reduce image size, photo compressor, free image compressor, no upload"
        />
        <link rel="canonical" href={`https://swiftcompress.vercel.app/${i18n.language !== "en" ? i18n.language + "/" : ""}`} />
        {seoLangs.map((l) => (
          <link
            key={l.code}
            rel="alternate"
            hrefLang={l.code}
            href={`https://swiftcompress.vercel.app/${l.code === "en" ? "" : l.code + "/"}`}
          />
        ))}
        <meta property="og:title" content={t("title", { defaultValue: "SwiftCompress - Compress Images Online" }) + " - Free JPG, PNG, WebP, GIF Compressor"} />
        <meta property="og:description" content={t("meta_description", { defaultValue: "Compress JPG, PNG, WebP, and GIF images online for free. Drag & drop up to 20 images, adjust quality, preview results, and download compressed images or a ZIP archive. 100% privacy, no uploads." })} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://swiftcompress.vercel.app/${i18n.language !== "en" ? i18n.language + "/" : ""}`} />
        <meta property="og:image" content="https://swiftcompress.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("title", { defaultValue: "SwiftCompress - Compress Images Online" }) + " - Free JPG, PNG, WebP, GIF Compressor"} />
        <meta name="twitter:description" content={t("meta_description", { defaultValue: "Compress JPG, PNG, WebP, and GIF images online for free. Drag & drop up to 20 images, adjust quality, preview results, and download compressed images or a ZIP archive. 100% privacy, no uploads." })} />
        <meta name="twitter:image" content="https://swiftcompress.vercel.app/og-image.png" />
      </Helmet>

      <header>
        <nav className="w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 py-4 px-6 text-white text-center shadow-lg flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          <span className="font-extrabold tracking-wide text-2xl md:text-3xl flex items-center gap-2">
            <svg
              className="w-8 h-8 md:w-9 md:h-9 text-purple-200 inline-block drop-shadow-md"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 20h9"></path>
              <path d="M12 4v16m0 0H3m9 0a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
            </svg>
            {t("title", { defaultValue: "SwiftCompress" })}
          </span>
          <a
            href="#about"
            className="text-white hover:bg-white/20 font-semibold px-5 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white text-lg hidden md:block"
          >
            {t("about", { defaultValue: "About" })} & {t("faq", { defaultValue: "FAQ" })}
          </a>
        </nav>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 flex flex-col items-center p-0 font-sans">
        <section className="w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 py-20 px-4 text-white text-center shadow-2xl rounded-b-[4rem] relative overflow-hidden hero-section">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/15 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl opacity-50 animate-pulse-slow delay-500"></div>
          </div>
          <h1 className="relative text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl animate-fade-in hero-title">
            {t("title", { defaultValue: "Compress Images Online" })}
          </h1>
          <p className="relative max-w-3xl mx-auto text-xl md:text-2xl font-medium mb-10 animate-fade-in delay-100 hero-subtitle">
            {t("hero_subtitle", {
              defaultValue: "Optimize JPG, PNG, WebP, and GIF images instantly. Drag & drop up to 20 files, adjust quality, and download all at once. Fast, private, and 100% free with in-browser processing."
            })}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6 animate-fade-in delay-200">
            <a
              href="#compressor"
              className="bg-white text-indigo-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-white/50 transform hover:scale-105 btn"
            >
              {t("start_compressing", { defaultValue: "Start Compressing" })}
            </a>
            <a
              href="#about"
              className="bg-indigo-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-indigo-800 transition-all duration-300 text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-white/50 transform hover:scale-105 btn"
            >
              {t("learn_more", { defaultValue: "Learn More" })}
            </a>
          </div>
          <p className="relative max-w-xl mx-auto text-base opacity-90 animate-fade-in delay-300">
            {t("privacy_note", { defaultValue: "100% Client-side: No uploads. All processing happens securely in your browser for maximum privacy." })}
          </p>
        </section>

        <section id="compressor" className="w-full max-w-4xl mt-16 px-4">
          <div
            className="border-4 border-dashed border-indigo-400 rounded-3xl p-12 mb-12 bg-white shadow-2xl transition-all duration-300 hover:border-purple-600 flex flex-col items-center justify-center relative group min-h-[250px] text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              multiple
              accept={supportedImageTypes.join(',')}
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
              max={20}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-indigo-700 font-bold text-3xl md:text-4xl hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-4"
              tabIndex={0}
            >
              <span className="inline-flex items-center gap-3">
                <svg className="w-10 h-10 text-purple-500 animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-3H5V8h3V5h3v3h3v3h-3v3z"></path></svg>
                {t("select_files", { defaultValue: "Drag & Drop or Click to Select Images" })}
              </span>
            </label>
            <span className="text-lg text-gray-600 mt-4 max-w-md">{t("supported_formats", { defaultValue: "Supports JPG, JPEG, PNG, WebP, and GIF. Up to 20 images at a time." })}</span>
            {files.length > 0 && (
              <div className="absolute top-5 right-8 text-sm text-purple-700 bg-purple-100 px-4 py-2 rounded-full shadow-md font-semibold animate-pulse">
                {files.length} {t("files_selected", { defaultValue: "file(s) selected" })}
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none group-hover:bg-indigo-50/40 rounded-3xl transition-all duration-300"></div>
          </div>

          {isProcessing && (
            <div className="text-center text-indigo-700 font-semibold text-xl my-8 flex items-center justify-center gap-3 animate-pulse">
              <svg className="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("processing_images", { defaultValue: "Processing images..." })}
            </div>
          )}

          {files.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-12 border border-indigo-100">
              <div className="flex items-center mb-6 gap-3">
                <input
                  id="manualMode"
                  type="checkbox"
                  checked={manualMode}
                  onChange={() => setManualMode(!manualMode)}
                  className="accent-purple-600 scale-150 transform transition-all duration-200 cursor-pointer"
                />
                <label htmlFor="manualMode" className="text-gray-800 font-semibold text-lg select-none cursor-pointer">
                  {t("manual_mode", { defaultValue: "Manual Mode (Adjust quality per image)" })}
                </label>
              </div>

              {!manualMode && (
                <div className="mb-6">
                  <label htmlFor="quality" className="block mb-3 font-bold text-gray-700 text-lg">
                    {t("global_compression_quality", { defaultValue: "Global Compression Quality:" })} <span className="font-extrabold text-purple-700">{Math.round(quality * 100)}%</span>
                  </label>
                  <input
                    id="quality"
                    type="range"
                    min="10"
                    max="90"
                    value={Math.round(quality * 100)}
                    onChange={handleQualityChange}
                    className="w-full accent-purple-600 h-2 rounded-lg bg-indigo-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">{t("quality_tip", { defaultValue: "Higher quality = larger file size; Lower quality = smaller file size." })}</p>
                </div>
              )}
            </div>
          )}

          {compressedFiles.length > 0 && (
            <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {compressedFiles.map(({ original, compressed, unsupported, error, id }, idx) => (
                <div
                  key={id}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl p-6 flex flex-col items-center group transition-all duration-300 hover:shadow-2xl border border-indigo-100 hover:border-purple-300 relative card"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <div className="relative w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-gray-100">
                    {compressed && !error ? (
                      <img
                        src={URL.createObjectURL(compressed)}
                        alt={t("image_alt", { defaultValue: `Compressed preview of ${original.name}` })}
                        className="w-full h-full object-contain rounded-xl shadow-inner bg-white transform group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        itemProp="contentUrl"
                      />
                    ) : unsupported ? (
                      <div className="w-full h-full flex items-center justify-center text-red-400 font-semibold text-center p-4">
                        <span className="flex flex-col items-center">
                          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                          {t("unsupported_file", { defaultValue: "Unsupported File Type" })}
                        </span>
                      </div>
                    ) : error ? (
                      <div className="w-full h-full flex items-center justify-center text-red-500 font-semibold text-center p-4">
                        <span className="flex flex-col items-center">
                          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 12a9 9 0 0118 0z"></path></svg>
                          {t("compression_error", { defaultValue: "Compression Error" })}
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span>{t("processing", { defaultValue: "Processing..." })}</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full flex flex-col items-center">
                    <div className="text-sm text-gray-600 truncate w-full text-center font-medium mb-1" itemProp="name">
                      {original.name}
                    </div>
                    {compressed && (
                      <>
                        <div className="text-base text-indigo-800 font-bold mb-2">
                          {t("original", { defaultValue: "Original" })}: {(original.size / 1024).toFixed(1)} KB
                        </div>
                        <div className="text-xl text-purple-700 font-extrabold mb-3">
                          {t("compressed", { defaultValue: "Compressed" })}: {(compressed.size / 1024).toFixed(1)} KB
                        </div>
                        <button
                          className="mt-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-semibold shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 btn text-base"
                          onClick={() => handleDownload(compressed, `swiftcompress-${original.name.replace(/\.(jpeg|jpg|png|webp|gif)$/i, '')}.${compressed.type.split('/')[1] || 'jpeg'}`)}
                        >
                          {t("download", { defaultValue: "Download" })}
                        </button>
                        {manualMode && (
                          <div className="mt-5 w-full">
                            <label htmlFor={`quality-slider-${idx}`} className="block mb-2 text-sm font-semibold text-gray-700 text-center">
                              {t("individual_quality", { defaultValue: "Individual Quality:" })} <span className="font-bold text-purple-700">{Math.round((compressed.individualQuality || quality) * 100)}%</span>
                            </label>
                            <input
                              id={`quality-slider-${idx}`}
                              type="range"
                              min="10"
                              max="90"
                              value={Math.round((compressed.individualQuality || quality) * 100)}
                              onChange={async (e) => {
                                const newQualityVal = parseFloat(e.target.value) / 100;
                                await handleIndividualQualityChange(idx, original, newQualityVal);
                              }}
                              className="w-full accent-purple-600 h-2 rounded-lg bg-indigo-200"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {compressed && (
                    <span className="absolute top-5 right-5 bg-green-100 text-green-700 text-sm px-4 py-1 rounded-full font-bold shadow-sm animate-fade-in-up">
                      {t("saved", { defaultValue: "Saved" })} {getCompressionSaving(original.size, compressed.size)}%
                    </span>
                  )}
                </div>
              ))}
            </article>
          )}

          {compressedFiles.length > 1 && compressedFiles.some(f => f.compressed) && (
            <div className="flex justify-center mb-16 animate-fade-in delay-300">
              <button
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 text-xl focus:outline-none focus:ring-4 focus:ring-purple-400 btn"
                onClick={handleDownloadAll}
                disabled={isProcessing}
              >
                {isProcessing ? t("generating_zip", { defaultValue: "Generating ZIP..." }) : t("download_all_zip", { defaultValue: "Download All as ZIP" })}
              </button>
            </div>
          )}

          {showAd && compressedFiles.length > 0 && (
            <div className="w-full my-12 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("image_optimization_tips", { defaultValue: "Image Optimization Tips" })}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("optimization_tip_content", {
                  defaultValue: "For best results, try different quality levels. WebP format often provides the best compression. Remember that images for web typically don't need resolutions above 2000px."
                })}
              </p>
              <div className="google-ad">
                <ins className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-40620600997"
                  data-ad-slot="6449429019"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
              </div>
            </div>
          )}
        </section>

        <section id="about" className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 md:p-12 mb-16 mt-12 border border-blue-50 card">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800 text-center" itemProp="headline">
            {t("about_swiftcompress", { defaultValue: "About SwiftCompress" })}
          </h2>
          <p className="text-gray-700 mb-4 text-lg" itemProp="description">
            {t("about_p1", {
              defaultValue: "SwiftCompress is your go-to free online tool for quickly and securely compressing images. Whether you need to optimize photos for your website, send large image files via email, or save storage space, our tool provides efficient compression for multiple formats."
            })}
          </p>
          <p className="text-gray-700 mb-4 text-lg">
            <span className="font-semibold text-indigo-700">{t("how_compression_works_q", { defaultValue: "How does image compression work?" })}</span>
            <br />
            {t("how_compression_works_a", {
              defaultValue: "Image compression, especially for formats like JPG and WebP, involves a 'lossy' algorithm. This means it intelligently reduces file size by discarding some visual data that is less perceptible to the human eye. For PNG and GIF, it uses 'lossless' techniques to reduce size without any quality loss. You maintain full control over the compression level using our intuitive quality slider or by setting individual image qualities."
            })}
          </p>
          <p className="text-gray-700 mb-4 text-lg">
            <span className="font-semibold text-indigo-700">{t("supported_formats_q", { defaultValue: "What image formats are supported?" })}</span>
            <br />
            {t("supported_formats_a_long", {
              defaultValue: "SwiftCompress supports the most common image formats: JPEG/JPG for photographs, PNG for images with transparency, WebP for modern web optimization, and GIF for animated images (though GIFs are primarily converted to static images for compression). Our goal is to provide versatile compression for all your needs."
            })}
          </p>
          <p className="text-gray-700 mb-4 text-lg">
            <span className="font-semibold text-indigo-700">{t("is_it_safe_q", { defaultValue: "Is SwiftCompress safe and private?" })}</span>
            <br />
            {t("is_it_safe_a", {
              defaultValue: "Absolutely! Your privacy and security are paramount. All image compression and processing happen directly within your web browser. Your images are never uploaded to our servers or stored anywhere, ensuring your data remains completely private and secure."
            })}
          </p>
          <p className="text-gray-600 text-sm mt-6 text-center">
            {t("tech_stack", {
              defaultValue: "Built with React and Tailwind CSS for a fast and modern experience. Leveraging client-side processing for ultimate privacy."
            })}
          </p>

          <article className="mt-10" itemScope itemType="https://schema.org/FAQPage">
            <h3 className="text-2xl md:text-3xl font-bold mb-5 text-purple-700 text-center">{t("faq", { defaultValue: "Frequently Asked Questions" })}</h3>
            <div className="space-y-6">
              <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                  {t("faq_q1", { defaultValue: "Q: What image formats can I compress with SwiftCompress?" })}
                </h4>
                <p className="text-gray-700" itemProp="acceptedAnswer">
                  {t("faq_a1", {
                    defaultValue: "A: SwiftCompress currently supports JPG, JPEG, PNG, WebP, and GIF images. We're continuously working to expand our compatibility!"
                  })}
                </p>
              </div>
              <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                  {t("faq_q2", { defaultValue: "Q: Will compressing my images reduce their quality significantly?" })}
                </h4>
                <p className="text-gray-700" itemProp="acceptedAnswer">
                  {t("faq_a2", {
                    defaultValue: "A: For lossy formats like JPG and WebP, some quality reduction is inherent, but our tool uses smart algorithms to minimize visible degradation. You can fine-tune the quality using the slider or manual mode to achieve the perfect balance between file size and visual fidelity."
                  })}
                </p>
              </div>
              <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                  {t("faq_q3", { defaultValue: "Q: Is there a limit to how many images I can compress or their size?" })}
                </h4>
                <p className="text-gray-700" itemProp="acceptedAnswer">
                  {t("faq_a3", {
                    defaultValue: "A: You can compress up to 20 images in a single batch. Each image is compressed efficiently, with optimal settings applied to balance size and quality. There isn't a strict file size limit beyond your browser's capabilities, as all processing is done locally."
                  })}
                </p>
              </div>
              <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                  {t("faq_q4", { defaultValue: "Q: Can I use SwiftCompress on my smartphone or tablet?" })}
                </h4>
                <p className="text-gray-700" itemProp="acceptedAnswer">
                  {t("faq_a4", {
                    defaultValue: "A: Absolutely! SwiftCompress is designed with a fully responsive interface, ensuring a smooth and efficient experience whether you're using a desktop computer, laptop, tablet, or smartphone."
                  })}
                </p>
              </div>
            </div>
          </article>
        </section>

        {showAd && (
          <div className="w-full max-w-4xl my-8 p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t("more_compression_tools", { defaultValue: "More Compression Tools" })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("tools_tip_content", {
                defaultValue: "Check out our other tools for PDF compression, video optimization, and more coming soon!"
              })}
            </p>
            <div className="google-ad">
              <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-40620600997"
                data-ad-slot="2103167504"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            </div>
          </div>
        )}

        <footer className="w-full text-center text-sm text-gray-500 pb-8 mt-12 border-t border-gray-200 pt-6">
          &copy; {new Date().getFullYear()} SwiftCompress. All rights reserved. |{" "}
          <a
            href="https://compress-jpeg-two.vercel.app/privacy-policy"
            className="text-indigo-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </footer>
      </main>
    </>
  );
}