"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Award, ChevronLeft, Lock, Medal, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";
import { apiRequest, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

type BadgeLevel = "bronze" | "silver" | "gold";
type UserBadge = { id?: string; title?: string; level?: string; earnedAt?: string };

const pathMeta = {
  pinjol: {
    modules: pinjolPathData.modules.length,
    label: "Anti-Pinjol",
  },
  penipuan: {
    modules: penipuanPathData.modules.length,
    label: "Penipuan Digital",
  },
};

const levelScore: Record<BadgeLevel, number> = {
  bronze: 70,
  silver: 80,
  gold: 90,
};

function pathFinalStep(pathId: keyof typeof pathMeta) {
  return pathMeta[pathId].modules + 2;
}

function pathModuleCompleteStep(pathId: keyof typeof pathMeta) {
  return pathMeta[pathId].modules + 1;
}

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function findPathBadge(badges: UserBadge[], pathId: keyof typeof pathMeta) {
  return badges.find((badge) => badge.id?.startsWith(`${pathId}-`));
}

function bestQuizScoreFromBadges(badges: UserBadge[]) {
  return badges.reduce((score, badge) => {
    const level = badge.level as BadgeLevel | undefined;
    return level && levelScore[level] ? Math.max(score, levelScore[level]) : score;
  }, 0);
}

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function BadgesPage() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user: apiUser }) => {
        if (!active) return;
        const syncedUser = syncUserToLocalStorage(apiUser);
        setUser(syncedUser);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Gagal memuat koleksi lencana.");
      });

    return () => {
      active = false;
    };
  }, []);

  const badges = useMemo(() => {
    const earnedBadges = (user?.badges || []) as UserBadge[];
    const progress = user?.progress || {};
    const pinjolBadge = findPathBadge(earnedBadges, "pinjol");
    const penipuanBadge = findPathBadge(earnedBadges, "penipuan");
    const quizScore = bestQuizScoreFromBadges(earnedBadges);
    const completedPathBadges = [pinjolBadge, penipuanBadge].filter(Boolean).length;

    return [
      {
        icon: ShieldCheck,
        title: pinjolBadge?.title || "Anti-Pinjol Aware",
        desc: pinjolBadge
          ? `Didapat dari quiz akhir ${pathMeta.pinjol.label}${pinjolBadge.level ? ` (${pinjolBadge.level})` : ""}.`
          : "Lulus quiz akhir Anti-Pinjol untuk membuka lencana ini.",
        progress: pinjolBadge ? 100 : clampProgress((Number(progress.pinjol || 0) / pathFinalStep("pinjol")) * 100),
        earned: Boolean(pinjolBadge),
        earnedAt: formatDate(pinjolBadge?.earnedAt),
      },
      {
        icon: Medal,
        title: penipuanBadge?.title || "Scam Spotter",
        desc: penipuanBadge
          ? `Didapat dari quiz akhir ${pathMeta.penipuan.label}${penipuanBadge.level ? ` (${penipuanBadge.level})` : ""}.`
          : "Selesaikan semua modul Penipuan Digital dan lulus quiz akhir.",
        progress: penipuanBadge
          ? 100
          : clampProgress((Number(progress.penipuan || 0) / pathModuleCompleteStep("penipuan")) * 100),
        earned: Boolean(penipuanBadge),
        earnedAt: formatDate(penipuanBadge?.earnedAt),
      },
      {
        icon: Trophy,
        title: "Quiz Champion",
        desc: quizScore >= 80 ? `Skor quiz akhir terbaik minimal ${quizScore}%.` : "Raih badge silver atau gold dari quiz akhir.",
        progress: quizScore >= 80 ? 100 : clampProgress((quizScore / 80) * 100),
        earned: quizScore >= 80,
        earnedAt: "",
      },
      {
        icon: Award,
        title: "FINLIT Expert",
        desc: completedPathBadges >= 2 ? "Semua badge utama learning path sudah dikumpulkan." : "Kumpulkan badge utama dari kedua learning path.",
        progress: clampProgress((completedPathBadges / 2) * 100),
        earned: completedPathBadges >= 2,
        earnedAt: "",
      },
    ];
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 rounded-xl border border-[#242020] bg-[#161313] p-8">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#201b1a]">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <h1 className="mt-5 text-3xl font-bold">Koleksi Lencana</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Lencana mengikuti progress akun Anda dari modul, quiz akhir, dan badge yang sudah benar-benar didapatkan.
        </p>
      </section>

      {error ? (
        <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
          {error}
        </div>
      ) : !user ? (
        <div className="mt-6 rounded-xl border border-[#242020] bg-[#161313] p-6 text-sm text-muted-foreground">
          Memuat koleksi lencana...
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className={`flex min-h-60 flex-col rounded-xl border p-5 ${badge.earned ? "border-primary/50 bg-primary/10 shadow-glow" : "border-[#242020] bg-[#161313]"}`}>
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#201b1a]">
                  <badge.icon className="h-6 w-6 text-primary" />
                </div>
                {!badge.earned && <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <h2 className="mt-5 font-bold">{badge.title}</h2>
              <p className="mt-1 min-h-12 text-xs leading-relaxed text-muted-foreground">{badge.desc}</p>
              {badge.earnedAt && <div className="mt-3 text-xs font-medium text-primary">Didapat {badge.earnedAt}</div>}
              <div className="mt-auto pt-5">
                <Progress value={badge.progress} className="h-2" />
                <div className="mt-2 text-xs font-medium text-muted-foreground">{badge.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
