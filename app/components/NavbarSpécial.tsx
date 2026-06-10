"use client";

import { usePathname } from "next/navigation";
import Navbar from "./layout/navbar";

export default function ConditionalNavbar() {
    const pathname = usePathname();

    console.log("PATHNAME =", pathname);

    const hideNavbar =
        pathname.includes("/dashboard") ||
        pathname.startsWith("/admin");

    if (hideNavbar) return null;

    return <Navbar />;
}