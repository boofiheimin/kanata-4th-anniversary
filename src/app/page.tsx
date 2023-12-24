import Grid from "@/components/Grid";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="p-5 flex justify-center items-center">
        <Image src="/message.png" alt="me" width="350" height="175"></Image>
      </div>
      <div className="p-5">
        <Grid></Grid>
      </div>
    </div>
  );
}
