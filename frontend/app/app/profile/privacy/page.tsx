"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, Lock, Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { apiRequest, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

type PrivacySettings = NonNullable<ApiUser["privacy"]>;
type PrivacyToggleKey = Exclude<keyof PrivacySettings, "featuredBadgeId">;

const defaultPrivacy: PrivacySettings = {
  showOnLeaderboard: true,
  publicProfile: true,
  safeMode: false,
  confirmSensitiveActions: true,
  featuredBadgeId: null,
};

const privacyItems: Array<{
  key: PrivacyToggleKey;
  icon: typeof Eye;
  title: string;
  desc: string;
}> = [
  { key: "showOnLeaderboard", icon: Eye, title: "Tampilkan di Leaderboard", desc: "Nama dan FinPoin Anda muncul di papan peringkat." },
  { key: "publicProfile", icon: UserRound, title: "Profil Publik", desc: "Peserta lain dapat membuka profil publik dan melihat lencana utama Anda." },
  { key: "safeMode", icon: Shield, title: "Mode Aman", desc: "Sembunyikan detail progres dan lencana saat profil publik dibuka." },
  { key: "confirmSensitiveActions", icon: Lock, title: "Konfirmasi Aktivitas Sensitif", desc: "Simpan preferensi konfirmasi untuk perubahan akun penting." },
];

function normalizePrivacy(privacy?: Partial<PrivacySettings>): PrivacySettings {
  return {
    ...defaultPrivacy,
    ...privacy,
  };
}

export default function PrivacyPage() {
  const [settings, setSettings] = useState<PrivacySettings>(defaultPrivacy);
  const [savingKey, setSavingKey] = useState<PrivacyToggleKey | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        if (!active) return;
        syncUserToLocalStorage(user);
        setSettings(normalizePrivacy(user.privacy));
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Gagal memuat pengaturan privasi.");
      });

    return () => {
      active = false;
    };
  }, []);

  const updateSetting = async (key: PrivacyToggleKey, checked: boolean) => {
    const previous = settings;
    const nextSettings = { ...settings, [key]: checked };

    setSettings(nextSettings);
    setSavingKey(key);
    setFeedback("");
    setError("");

    try {
      const { user } = await apiRequest<{ user: ApiUser }>("/privacy", {
        method: "PATCH",
        body: JSON.stringify({ [key]: checked }),
      });
      syncUserToLocalStorage(user);
      setSettings(normalizePrivacy(user.privacy));
      setFeedback("Pengaturan privasi berhasil disimpan.");
    } catch (err) {
      setSettings(previous);
      setError(err instanceof Error ? err.message : "Pengaturan gagal disimpan.");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 rounded-xl border border-[#242020] bg-[#161313] p-8">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#201b1a]">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h1 className="mt-5 text-3xl font-bold">Privasi Akun</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Atur apa yang terlihat oleh komunitas dan tambahkan lapisan keamanan untuk progres belajar Anda.
        </p>
      </section>

      {(feedback || error) && (
        <div className={`mt-6 rounded-xl border p-4 text-sm ${error ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/30 bg-primary/10 text-primary"}`}>
          {error || feedback}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {privacyItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="flex items-center justify-between gap-5 rounded-xl border border-[#242020] bg-[#161313] p-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-[#201b1a]">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={settings[item.key]}
                disabled={savingKey === item.key}
                onCheckedChange={(checked) => updateSetting(item.key, checked)}
                aria-label={item.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
