import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminService } from "@/features/admin/api";
import AdminWords from "@/features/admin/components/AdminWords";

export default async function AdminWordsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const isValid = await validateToken(token);

  if (!isValid) {
    redirect("/admin/login");
  }

  return <AdminWords />;
}

async function validateToken(token?: string): Promise<boolean> {
  if (!token) return false;

  try {
    await AdminService.me(token);
    return true;
  } catch {
    return false;
  }
}
