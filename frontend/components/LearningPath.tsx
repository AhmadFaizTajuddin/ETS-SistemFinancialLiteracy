"use client";

import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Lock, Check, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderActions } from "@/components/HeaderActions";
import { apiRequest, getEffectivePathProgress, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

export type Module = { label: string; image?: string; imageAlt?: string; locked?: boolean };

type PathNode = { x: number; y: number };
type PathLayout = {
  tall: boolean;
  viewHeight: number;
  start: PathNode;
  modules: PathNode[];
  final: PathNode;
};

const SVG_WIDTH = 900;
const START_CARD_CENTER_OFFSET = 96;
const MODULE_CARD_CENTER_OFFSET = 128;
const FINAL_ICON_CENTER_OFFSET = 56;

function getPathLayout(moduleCount: number): PathLayout {
  const tall = moduleCount > 4;
  const moduleY = tall ? [340, 610, 880, 1150, 1420] : [340, 610, 880, 1150];

  return {
    tall,
    viewHeight: tall ? 1700 : 1400,
    start: { x: 70, y: 114 },
    modules: moduleY.slice(0, moduleCount).map((y, index) => ({
      x: index % 2 === 0 ? 30 : 70,
      y,
    })),
    final: { x: 50, y: tall ? 1600 : 1300 },
  };
}

function nodeToSvgX(node: PathNode) {
  return (node.x / 100) * SVG_WIDTH;
}

function buildPath(nodes: PathNode[]) {
  const [first, ...rest] = nodes;
  if (!first) return "";

  return rest.reduce((path, node, index) => {
    const previous = nodes[index];
    const middleY = (previous.y + node.y) / 2;

    return `${path} C ${nodeToSvgX(previous)} ${middleY}, ${nodeToSvgX(node)} ${middleY}, ${nodeToSvgX(node)} ${node.y}`;
  }, `M ${nodeToSvgX(first)} ${first.y}`);
}

export function LearningPath({
  title,
  description,
  modules,
  pathId = "pinjol",
}: {
  title: string;
  description: string;
  modules: Module[];
  pathId?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const readLocalProgress = () => {
      setProgress(getEffectivePathProgress(pathId));
    };

    const timer = window.setTimeout(() => {
      readLocalProgress();
    }, 0);

    window.addEventListener("focus", readLocalProgress);
    window.addEventListener("pageshow", readLocalProgress);
    window.addEventListener("finlit-progress", readLocalProgress);

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        syncUserToLocalStorage(user);
        setProgress(getEffectivePathProgress(pathId));
      })
      .catch(() => {
        // Tetap gunakan cache lokal jika API belum tersedia.
      });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", readLocalProgress);
      window.removeEventListener("pageshow", readLocalProgress);
      window.removeEventListener("finlit-progress", readLocalProgress);
    };
  }, [pathId]);

  const finalUnlockStep = modules.length + 1;
  const finalCompleteStep = modules.length + 2;
  const progressPercent = Math.min(100, Math.max(5, (progress / finalCompleteStep) * 100));
  const pathLayout = getPathLayout(modules.length);
  const pathHeightClass = pathLayout.tall ? "md:min-h-[1700px]" : "md:min-h-[1400px]";

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-5 py-6 pb-16 text-[#f1eeee] md:px-8">
      <div className="grid items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="hidden md:block" />
        <div className="text-center">
          <div className="text-base font-bold text-[#ffb0a8]">{title}</div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="h-1.5 w-full max-w-56 overflow-hidden rounded-full bg-[#363333] md:w-64">
              <div className="h-full rounded-full bg-[#a90606] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-sm text-[#d2c7c4]">{Math.round(progressPercent)}%</span>
          </div>
        </div>
        <div className="justify-self-end">
          <HeaderActions />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-[#e8e4e1] sm:text-4xl">Your Journey to Financial Security</h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#c9bdb8]">
          {description}
        </p>
      </div>

      <div className={`relative mx-auto mt-14 max-w-5xl ${pathHeightClass}`}>
        <PathDecoration layout={pathLayout} />

        <div className="relative z-10 space-y-6 md:space-y-0">
          <div
            className="md:absolute md:-translate-x-1/2"
            style={{ left: `${pathLayout.start.x}%`, top: pathLayout.start.y - START_CARD_CENTER_OFFSET }}
          >
            <StartCard pathId={pathId} completed={progress > 0} />
          </div>

          {modules.map((m, i) => {
            const moduleNumber = i + 1;
            const isUnlocked = progress >= moduleNumber;
            const isCompleted = progress > moduleNumber;
            const node = pathLayout.modules[i];
            return (
              <ModuleCard
                key={i}
                index={i}
                label={m.label}
                image={m.image}
                imageAlt={m.imageAlt}
                isUnlocked={isUnlocked}
                isCompleted={isCompleted}
                pathId={pathId}
                style={{ left: `${node.x}%`, top: node.y - MODULE_CARD_CENTER_OFFSET }}
              />
            );
          })}

          <div
            className="md:absolute md:-translate-x-1/2"
            style={{ left: `${pathLayout.final.x}%`, top: pathLayout.final.y - FINAL_ICON_CENTER_OFFSET }}
          >
            <FinalCard unlocked={progress >= finalUnlockStep} completed={progress >= finalCompleteStep} pathId={pathId} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PathDecoration({ layout }: { layout: PathLayout }) {
  const path = buildPath([layout.start, ...layout.modules, layout.final]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
      preserveAspectRatio="none"
      viewBox={`0 0 ${SVG_WIDTH} ${layout.viewHeight}`}
      fill="none"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="18 22"
        strokeLinecap="round"
        className="text-[#3f3f3f]"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StartCard({ pathId, completed }: { pathId: string; completed: boolean }) {
  return (
    <div
      className={`w-full rounded-xl border p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:w-[320px] ${
        completed ? "border-[#7c2b25] bg-[#161313]" : "border-[#6c3934] bg-[linear-gradient(90deg,#171414,#341716)]"
      }`}
    >
      <div className="flex gap-4">
        <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-md ${completed ? "bg-[#4a0c0c]" : "bg-[#b00000]"}`}>
          {completed ? <Check className="h-5 w-5 text-[#c6f2bc]" /> : <Play className="h-5 w-5 text-white" fill="currentColor" />}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffb0a8]">{completed ? "Selesai" : "Mulai Di Sini"}</div>
          <div className="mt-1 text-lg font-bold text-[#f1eeee]">Pre-Quiz Diagnostik</div>
          <p className="mt-2 text-sm leading-6 text-[#c9bdb8]">Uji pengetahuan mengenai pinjaman online sebelum memulai pembelajaran</p>
          <Button asChild size="sm" className="mt-5 bg-[#9c0000] text-white hover:bg-[#bd1414]">
            <Link href={`/quiz?pathId=${pathId}&type=pre`}>{completed ? "Ulangi Pre-Quiz" : "Mulai Pre-Quiz →"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  index,
  label,
  image,
  imageAlt,
  isUnlocked,
  isCompleted,
  pathId,
  style,
}: {
  index: number;
  label: string;
  image?: string;
  imageAlt?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  pathId: string;
  style: CSSProperties;
}) {
  const status = isCompleted ? "Selesai" : isUnlocked ? "Terbuka" : "Locked";
  const cardClass = isCompleted
    ? "border-[#3e6335] bg-[#101510]"
    : isUnlocked
      ? "border-[#7c2b25] bg-[#171414] shadow-[0_18px_45px_rgba(120,0,0,0.14)]"
      : "border-[#171717] bg-[#090909] opacity-90";

  return (
    <div className="md:absolute md:-translate-x-1/2" style={style}>
      <div className={`w-full overflow-hidden rounded-xl border transition md:w-[320px] ${cardClass}`}>
        {image && (
          <div className="h-24 w-full bg-[#1c1716]">
            <Image
              src={image}
              alt={imageAlt || label}
              width={640}
              height={360}
              className={`h-full w-full object-cover ${isUnlocked ? "" : "grayscale"}`}
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-4">
            <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-md ${isUnlocked ? "bg-[#4a0c0c]" : "bg-[#2a2a2a]"}`}>
              {isCompleted ? (
                <Check className="h-5 w-5 text-[#c6f2bc]" />
              ) : isUnlocked ? (
                <Play className="h-4 w-4 text-[#ffb0a8]" fill="currentColor" />
              ) : (
                <Lock className="h-4 w-4 text-[#b9aaa5]" />
              )}
            </div>
            <div className="min-w-0">
              <div className={`text-xs uppercase tracking-wider ${isUnlocked ? "text-[#ffb0a8]" : "text-[#8c8380]"}`}>{status}</div>
              <div className={`mt-1 text-base font-bold ${isUnlocked ? "text-[#eee8e5]" : "text-[#88817e]"}`}>
                Modul {index + 1}: {label}
              </div>
            </div>
          </div>
          {isUnlocked && (
            <Button asChild size="sm" variant={isCompleted ? "outline" : "default"} className="mt-4 w-full border-[#7c2b25] bg-[#a90606] text-white hover:bg-[#bd1414]">
              <Link href={`/module?pathId=${pathId}&id=${index + 1}`}>
                {isCompleted ? "Baca Ulang Modul" : "Baca Modul"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FinalCard({ unlocked, completed, pathId }: { unlocked: boolean; completed: boolean; pathId: string }) {
  return (
    <div className="w-full text-center md:w-[320px]">
      <div
        className={`mx-auto flex h-28 w-28 items-center justify-center rounded-xl border ${
          unlocked ? "border-[#7c2b25] bg-[#171414] shadow-[0_18px_45px_rgba(120,0,0,0.15)]" : "border-[#232323] bg-[#1a1a1a]"
        }`}
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${unlocked ? "bg-[#4a0c0c]" : "bg-[#0f0f0f]"}`}>
          {completed ? <Trophy className="h-5 w-5 text-[#ffb0a8]" /> : unlocked ? <Play className="h-4 w-4 text-[#ffb0a8]" fill="currentColor" /> : <Lock className="h-4 w-4 text-[#b9aaa5]" />}
        </div>
      </div>
      <div className={`mt-6 text-2xl font-bold ${unlocked ? "text-[#f1eeee]" : "text-[#77706d]"}`}>Quiz Akhir & Badge</div>
      <div className="mt-2 text-base text-[#a39a97]">{unlocked ? "Terbuka! Uji pemahamanmu." : "Complete all modules to unlock"}</div>
      {unlocked && (
        <Button asChild size="sm" className="mt-5 bg-[#a90606] text-white hover:bg-[#bd1414]">
          <Link href={`/quiz?pathId=${pathId}&type=final`}>{completed ? "Ulangi Quiz" : "Mulai Quiz"}</Link>
        </Button>
      )}
    </div>
  );
}
