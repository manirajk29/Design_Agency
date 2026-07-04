import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "PixelCraft Studio | Creative Design Agency",
    template: "%s | PixelCraft Studio",
  },
  description:
    "Transforming ideas into beautiful digital experiences through UI/UX design, web development, branding, and digital marketing.",
  keywords: ["Design Agency", "UI/UX Design", "Web Development", "Branding", "Digital Marketing", "Creative Strategy", "Chennai Design Agency"],
  authors: [{ name: "PixelCraft Studio" }],
  creator: "PixelCraft Studio",
  publisher: "PixelCraft Studio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "PixelCraft Studio | Creative Design Agency",
    description: "Transforming ideas into beautiful digital experiences through UI/UX design, web development, branding, and digital marketing.",
    siteName: "PixelCraft Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixelCraft Studio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelCraft Studio | Creative Design Agency",
    description: "Transforming ideas into beautiful digital experiences through UI/UX design, web development, branding, and digital marketing.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050508] text-slate-400 font-sans selection:bg-indigo-500/35 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
