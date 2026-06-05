"use client";

import { AdminSocialMediaTemplate } from "@/app/ui/templates/admin-social-media";
import { MOCK_ADMIN_SOCIAL_STATS, MOCK_ADMIN_SOCIAL_PLATFORMS } from "@/app/constants/mockData";

export default function Page() {
  return <AdminSocialMediaTemplate stats={MOCK_ADMIN_SOCIAL_STATS} platforms={MOCK_ADMIN_SOCIAL_PLATFORMS} />;
}
