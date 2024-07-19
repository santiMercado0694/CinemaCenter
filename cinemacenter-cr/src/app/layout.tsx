"use client"; // Mark this component as a client component

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { metadata } from "./metadata"; // Import the metadata

const inter = Inter({ subsets: ["latin"] });

const backgroundImages = [
  "/Cine/CineColiseo.webp",
  "/Cine/CineColiseo2.webp",
  "/Cine/Teatro.jpg",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Ensure children are typed as ReactNode
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`relative h-full font-sans antialiased ${inter.className}`}
      >
        <div className="relative min-h-screen overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            {backgroundImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Background Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }} // Apply object-fit style
                  quality={100}
                  priority={index === 0} // Load the first image with priority
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Content */}
          <main className="relative flex flex-col min-h-screen z-10">
            <Navbar />
            <div className="flex-grow flex-1">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
