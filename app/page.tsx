"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"essay" | "gallery">("essay");
  const [markdownContent, setMarkdownContent] = useState<string>("");

  // Load markdown content
  useEffect(() => {
    fetch("/final.md")
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text))
      .catch((err) => console.error("Error loading markdown:", err));
  }, []);

  // Hardcoded image list based on the files we copied
  const imageFiles = [
    "charles-american-propaganda.png",
    "charles-bridge-over-river.png",
    "charles-bus-and-tram-trips.png",
    "charles-day-care.png",
    "charles-nationa-govt-expenditures.png",
    "charles-postcard.png",
    "charles-prefecture-reconstruction-expenditures.png",
    "charles-tokyo-after-earthquake.png",
    "charles-tokyo-before-earthquake.png",
    "charles-tokyo-reconstruction-expenditures.png",
    "japan-time-koreans.png",
    "japan-times-earthquake-extra.png",
    "japan-times-emperror-walks.png",
    "japan-times-gathering.png",
    "reconstruction-processes-from-large-scale-disasters-table-3.png",
    "weisenfeld-reconstruciton-emperor-text.png",
    "weisenfeld-reconstruciton-emperor.png",
    "weisenfeld-reconstruction-athletes.png",
    "weisenfeld-reconstruction-balloon.png",
    "weisenfeld-reconstruction-boots.png",
    "weisenfeld-reconstruction-horse.png",
    "weisenfeld-reconstruction-santa.png",
    "weisenfeld-reconstruction-turkey.png",
  ];

  const formatImageName = (filename: string) => {
    return filename
      .replace(/\.(png|jpg|jpeg)$/i, "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tokyo Reconstruction Research
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Historical analysis and visual documentation of Tokyo&apos;s reconstruction
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("essay")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "essay"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Final Essay
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "gallery"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Gallery ({imageFiles.length})
            </button>
          </div>
        </div>

        {/* Essay Tab Content */}
        {activeTab === "essay" && (
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-6xl mx-auto">
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vSyLTzFEvhicvdUwzj5ytoAKXC41hfWZ9OxWYoj60FMOUp77ZioS_NX2IFfSNROHAhKKTI2k15lEmub/pub?embedded=true"
              className="w-full h-[85vh] border-0"
              title="Final Essay"
            />
          </div>
        )}

        {/* Gallery Tab Content */}
        {activeTab === "gallery" && (
          <div>
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                Historical images documenting Tokyo&apos;s earthquake, reconstruction, and transformation
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imageFiles.map((filename) => (
                <div
                  key={filename}
                  className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={`/images/${filename}`}
                      alt={formatImageName(filename)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {formatImageName(filename)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
