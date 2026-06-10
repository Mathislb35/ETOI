// @ts-ignore
import "./globals.css"
import ConditionalNavbar from "@/app/components/layout/navbar";
import Providers from "@/app/providers";


export const metadata = {
    title: "ÉTOI - Partager, apprendre, connecter",
    description:
        "Mise en relation entre établissements et professionnels bénévoles en Bretagne",
};

// @ts-ignore
export default function RootLayout({ children } ) {
    return (
        <html lang="fr">
            <body>
                <Providers>
                    <ConditionalNavbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}