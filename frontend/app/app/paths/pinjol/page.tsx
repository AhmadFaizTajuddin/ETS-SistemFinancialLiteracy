import type { Metadata } from "next";
import { LearningPath } from "@/components/LearningPath";
import { pinjolPathData } from "@/data/pinjol-content";

export const metadata: Metadata = {
  title: "FINLIT — Anti-Pinjol Ilegal",
};

export default function PinjolPathPage() {
  return (
    <LearningPath
      title="Learning Path 1: Anti-Pinjol Ilegal"
      description="Kenali ciri pinjaman online ilegal, pahami risikonya, dan lindungi diri dari jeratan bunga mencekik. Selesaikan setiap modul untuk membuka badge."
      modules={pinjolPathData.modules.map((module) => ({
        label: module.title,
        image: module.media?.image,
        imageAlt: module.media?.imageAlt,
      }))}
      pathId="pinjol"
    />
  );
}
