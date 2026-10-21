"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Coins, Rocket, Shield, Snowflake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

const BOOST_DEFS = [
  { id: "streak-freeze", activeKey: "streak-freeze-active", icon: Snowflake, name: "Streak Freeze", desc: "Melindungi streak jika melewatkan satu hari belajar." },
  { id: "point-shield", activeKey: "point-shield-active-until", icon: Shield, name: "Perisai Poin", desc: "Menahan penurunan peringkat selama 48 jam." },
  { id: "point-booster", activeKey: "point-booster-modules", icon: Rocket, name: "2x FinPoin", desc: "Gandakan FinPoin untuk 3 modul berikutnya." },
  { id: "badge-slot", activeKey: "badge-slot-active", icon: Zap, name: "Slot Lencana", desc: "Buka slot tambahan untuk memamerkan pencapaian." },
];

function getActiveLabel(itemId: string, inventory: Record<string, number>) {
  if (itemId === "point-shield") {
    const activeUntil = Number(inventory["point-shield-active-until"] || 0);
    if (activeUntil <= Date.now()) return "";

    return `Aktif sampai ${new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(activeUntil))}`;
  }

  if (itemId === "point-booster") {
    const remaining = Number(inventory["point-booster-modules"] || 0);
    return remaining > 0 ? `${remaining} modul boost aktif` : "";
  }

  if (itemId === "streak-freeze") {
    const active = Number(inventory["streak-freeze-active"] || 0);
    return active > 0 ? `${active} proteksi streak aktif` : "";
  }

  if (itemId === "badge-slot") {
    const active = Number(inventory["badge-slot-active"] || 0);
    return active > 0 ? `${active} slot lencana aktif` : "";
  }

  return "";
}

export default function InventoryPage() {
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [usingItem, setUsingItem] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ itemId: string; message: string; ok: boolean } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBalance(Number(localStorage.getItem("totalPoints") || 0));
    }, 0);

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        const syncedUser = syncUserToLocalStorage(user);
        setBalance(syncedUser.points);
        setInventory(user.inventory || {});
      })
      .catch(() => {
        // Tetap gunakan cache lokal jika API belum tersedia.
      });

    return () => window.clearTimeout(timer);
  }, []);

  const handleUseItem = async (itemId: string) => {
    if (Number(inventory[itemId] || 0) <= 0) {
      setFeedback({ itemId, message: "Item ini belum tersedia.", ok: false });
      return;
    }

    setUsingItem(itemId);
    setFeedback(null);
    try {
      const payload = await apiRequest<{ message: string; user: ApiUser }>("/inventory/use", {
        method: "POST",
        body: JSON.stringify({ itemId }),
      });
      const syncedUser = syncUserToLocalStorage(payload.user, { preferServerPoints: true });
      setBalance(syncedUser.points);
      setInventory(syncedUser.inventory || {});
      setFeedback({ itemId, message: payload.message || "Item berhasil digunakan.", ok: true });
    } catch (err) {
      setFeedback({
        itemId,
        message: err instanceof Error ? err.message : "Item gagal digunakan.",
        ok: false,
      });
    } finally {
      setUsingItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 flex flex-col items-start justify-between gap-6 rounded-xl border border-[#242020] bg-[#161313] p-8 lg:flex-row">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#201b1a]">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">Inventaris Peningkatan</h1>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
            Simpan dan gunakan boost seperti power-up belajar. Cocok untuk menjaga momentum saat mengejar badge.
          </p>
        </div>
        <div className="rounded-lg border border-[#2d2725] bg-[#201b1a] p-4 text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Coins className="h-3 w-3" /> Saldo Tersedia
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-accent">{balance.toLocaleString("id-ID")} FC</div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {BOOST_DEFS.map((boost) => {
          const count = Number(inventory[boost.id] || 0);
          const activeLabel = getActiveLabel(boost.id, inventory);
          const msg = feedback?.itemId === boost.id ? feedback : null;
          const isUsing = usingItem === boost.id;
          return (
            <div key={boost.id} className="flex min-h-64 flex-col rounded-xl border border-[#242020] bg-[#161313] p-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#201b1a]">
                  <boost.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="rounded-md border border-[#2d2725] bg-[#201b1a] px-2 py-1 text-xs font-bold">x{count}</span>
              </div>
              <h2 className="mt-5 font-bold">{boost.name}</h2>
              <p className="mt-1 min-h-10 text-sm leading-relaxed text-muted-foreground">{boost.desc}</p>
              {activeLabel && (
                <div className="mt-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                  {activeLabel}
                </div>
              )}
              {msg && (
                <p className={`mt-3 text-xs font-medium ${msg.ok ? "text-green-400" : "text-red-400"}`}>{msg.message}</p>
              )}
              <Button
                className="mt-auto w-full"
                size="sm"
                disabled={count === 0 || isUsing}
                onClick={() => handleUseItem(boost.id)}
              >
                {isUsing ? "Menggunakan..." : count > 0 ? "Gunakan" : "Tidak Tersedia"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
