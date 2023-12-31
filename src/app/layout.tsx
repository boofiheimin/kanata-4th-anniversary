import classnames from "classnames";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Messages From Heimin!",
  description: "An Amane Kanata's 4th Anniversary Project",
};

const noto = Noto_Sans_JP({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClass = classnames(
    noto.className,
    "flex mx-auto w-full bg-blue-400"
  );
  return (
    <html lang="en">
      <body className={bodyClass}>
        <Providers>
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
