import { redirect } from "next/navigation";

export default function DashboardPage() {
    redirect("/dashboard/volunteer"); // ou /school selon ce que tu montres
}