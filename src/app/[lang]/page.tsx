import Grid from "@/components/Grid";
import Image from "next/image";

export default function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div>
      <div className="p-10 flex justify-center items-center">
        {lang === "ja" ? (
          <Image
            src="/message_jp.png"
            alt="me"
            width="350"
            height="175"
          ></Image>
        ) : (
          <Image src="/message.png" alt="me" width="350" height="175"></Image>
        )}
      </div>
      <div className="p-5">
        <Grid lang={lang}></Grid>
      </div>
    </div>
  );
}
