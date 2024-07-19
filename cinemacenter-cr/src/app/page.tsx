"use client";

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import MoviesCarousel from "@/components/layout/MoviesCarousel";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <MoviesCarousel />
    </MaxWidthWrapper>
  );
}
