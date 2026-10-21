import type { Metadata } from "next";
import { LearningPath } from "@/components/LearningPath";
import { penipuanPathData } from "@/data/penipuan-content";

export const metadata: Metadata = {
  title: "FINLIT — Penipuan Digital",
};

export default function PenipuanPathPage() {
  return (
    <LearningPath
      title="Learning Path 2: Penipuan Digital & Aktivitas Keuangan Ilegal"
      description="Pelajari modus scam digital, investasi bodong, deepfake, dan cara melindungi aset keuangan Anda dari ancaman siber. Selesaikan setiap modul untuk membuka badge."
      modules={penipuanPathData.modules.map((module) => ({
        label: module.title,
        image: module.media?.image,
        imageAlt: module.media?.imageAlt,
      }))}
      pathId="penipuan"
    />
  );
}
