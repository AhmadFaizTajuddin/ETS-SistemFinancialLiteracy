"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Award, BookOpen, CalendarDays, ChevronLeft, Coins, Flame, Loader2, ShieldCheck, Trophy, UserRound } from "lucide-react";
import { HeaderActions } from "@/components/HeaderActions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";
import { apiRequest } from "@/lib/api";

type PublicProfile = {
  id: string;
  name: string;
  points: number;
  dailyStreak: number;
  progress: Record<string, number>;
  badges: Array<{ id?: string; title?: string; level?: string }>;
  featuredBadge?: { id?: string; title?: string; level?: string; earnedAt?: string } | null;
  createdAt?: string;
};

const pathSummaries = [
  {
    id: "pinjol",
    title: "Anti-Pinjol Ilegal",
    totalSteps: pinjolPathData.modules.length + 2,
  },
  {
    id: "penipuan",
    title: "Penipuan Digital",
    totalSteps: penipuanPathData.modules.length + 2,
  },
];

const formatPoints = (points: number) => points.toLocaleString("id-ID");

function formatDate(value?: string) {
  if (!value) return "Belum tersedia";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum tersedia";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function PublicProfileClient() {
  const params = useParams<{ userId?: string | string[] }>();
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId;
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [error, setError] = useState<{ userId: string; message: string } | null>(null);

  useEffect(() => {
    if (!userId) return;

    let active = true;

    apiRequest<{ user: PublicProfile }>(`/profile/${encodeURIComponent(userId)}`)
      .then(({ user }) => {
        if (!active) return;
        setProfile(user);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError({
          userId,
          message: err instanceof Error ? err.message : "Gagal memuat profil pengguna.",
        });
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const earnedBadges = useMemo(() => profile?.badges?.filter((badge) => badge.title || badge.level) || [], [profile]);
  const totalProgress = useMemo(() => {
    if (!profile) return 0;

    const totalPercent = pathSummaries.reduce((sum, path) => {
      const current = Math.max(0, Number(profile.progress?.[path.id] || 0));
      return sum + Math.min(100, Math.round((current / path.totalSteps) * 100));
    }, 0);

    return Math.round(totalPercent / pathSummaries.length);
  }, [profile]);

  const currentError = error && error.userId === userId ? error.message : "";
  const currentProfile = profile?.id === userId ? profile : null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/app/leaderboard">
            <ChevronLeft className="h-4 w-4" />
            Leaderboard
          </Link>
        </Button>
        <HeaderActions />
      </div>

      {!userId ? (
        <div className="mt-10 rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center text-sm text-destructive">
          Profil pengguna tidak ditemukan.
        </div>
      ) : !currentProfile && !currentError ? (
        <div className="mt-10 rounded-xl border border-[#242020] bg-[#161313] p-8 text-center text-sm text-muted-foreground">
          <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-primary" />
          Memuat profil pengguna...
        </div>
      ) : currentError || !currentProfile ? (
        <div className="mt-10 rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center text-sm text-destructive">
          {currentError || "Profil pengguna tidak ditemukan."}
        </div>
      ) : (
        <>
          <section className="mt-4 rounded-xl border border-[#242020] bg-[#161313] p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div className="min-w-0">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#201b1a]">
                  <UserRound className="h-6 w-6 text-primary" />
                </div>
                <h1 className="mt-5 break-words font-display text-4xl font-bold text-gradient-accent">{currentProfile.name}</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Profil publik dari leaderboard FINLIT. Lihat progres belajar, poin, streak, dan lencana yang sudah dikumpulkan pengguna ini.
                </p>
                {currentProfile.featuredBadge && (
                  <div className="mt-5 inline-flex max-w-full items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3">
                    <Award className="h-5 w-5 flex-none text-primary" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{currentProfile.featuredBadge.title || "Lencana FINLIT"}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {currentProfile.featuredBadge.level || "Lencana ditampilkan"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-xl">
                <StatCard icon={Coins} label="FinPoin" value={formatPoints(currentProfile.points)} tone="text-yellow-500" />
                <StatCard icon={Flame} label="Streak" value={`${currentProfile.dailyStreak || 0} hari`} tone={currentProfile.dailyStreak > 0 ? "text-orange-500" : "text-muted-foreground"} />
                <StatCard icon={Trophy} label="Progress" value={`${totalProgress}%`} tone="text-primary" />
              </div>
            </div>
          </section>

          <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-xl border border-[#242020] bg-[#161313] p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4 text-primary" />
                Progress Learning Path
              </div>
              <div className="mt-5 space-y-5">
                {pathSummaries.map((path) => {
                  const current = Math.max(0, Number(currentProfile.progress?.[path.id] || 0));
                  const percent = Math.min(100, Math.round((current / path.totalSteps) * 100));

                  return (
                    <div key={path.id} className="rounded-lg border border-[#242020] bg-[#201b1a] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold">{path.title}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {Math.min(current, path.totalSteps)} dari {path.totalSteps} langkah selesai
                          </div>
                        </div>
                        <span className="flex-none text-sm font-bold text-primary">{percent}%</span>
                      </div>
                      <Progress value={percent} className="mt-4 h-2" />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-xl border border-[#242020] bg-[#161313] p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Award className="h-4 w-4 text-primary" />
                Lencana Publik
              </div>
              <div className="mt-5 space-y-3">
                {earnedBadges.length > 0 ? (
                  earnedBadges.map((badge, index) => (
                    <div key={`${badge.id || badge.title || "badge"}-${index}`} className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-[#201b1a]">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold">{badge.title || "Lencana FINLIT"}</div>
                        <div className="truncate text-xs text-muted-foreground">{badge.level || "Badge tercapai"}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-[#242020] bg-[#201b1a] p-4 text-sm text-muted-foreground">
                    Pengguna ini belum menampilkan lencana publik.
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#242020] bg-[#201b1a] p-4 text-xs text-muted-foreground">
                <CalendarDays className="h-4 w-4 flex-none text-primary" />
                Bergabung sejak {formatDate(currentProfile.createdAt)}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Coins;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-[#2d2725] bg-[#201b1a] p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className={`h-4 w-4 ${tone}`} fill={label === "FinPoin" ? "currentColor" : "none"} />
        {label}
      </div>
      <div className={`mt-2 truncate text-xl font-bold ${tone}`}>{value}</div>
    </div>
  );
}
