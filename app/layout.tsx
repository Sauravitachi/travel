import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WILD MILES | Deep Jungle & High Wilderness Expeditions",
  description:
    "Handcrafted 4x4 overland safaris, deep jungle rainforest odysseys, and high-pass motorcycle expeditions. Guided by veteran trail navigators with field trauma safety and eco-sanctuary glamping.",
  keywords: [
    "jungle expedition",
    "rainforest overland trip",
    "4x4 wilderness safaris",
    "himalayan pass expeditions",
    "wild miles",
    "motorcycle odyssey",
  ],
  authors: [{ name: "Wild Miles Expedition Co." }],
  openGraph: {
    title: "WILD MILES | Journey Deep Into The Untamed",
    description:
      "Curated luxury off-grid wilderness expeditions through virgin rainforests, high alpine gorges, and untamed backcountries.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#030705",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#030705] text-[#e2f0e8] antialiased selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
        {children}
      </body>
    </html>
  );
}
