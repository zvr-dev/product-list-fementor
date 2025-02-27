import { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: 'Product list with cart by zvr-dev',
  description: 'Submission for a Front End Mentor challenge',
}

const redHatText = Red_Hat_Text({});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatText.className}`}>
        {children}
      </body>
    </html>
  );
}
