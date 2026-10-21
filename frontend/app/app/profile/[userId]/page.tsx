import type { Metadata } from "next";
import { PublicProfileClient } from "./profile-view-client";

export const metadata: Metadata = {
  title: "FINLIT - Profil Publik",
};

export default function PublicProfilePage() {
  return <PublicProfileClient />;
}
