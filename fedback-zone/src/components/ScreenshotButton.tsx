import html2canvas from "html2canvas";
import { backgroundSize } from "html2canvas/dist/types/css/property-descriptors/background-size";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./WidgetForm/Loading";
interface ScreenShotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}
export function ScreenShotButton({
  onScreenshotTook,
  screenshot,
}: ScreenShotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }
  if (screenshot) {
    return (
      <button
        type="button" // para que definir type button se a propria parada é um button
        className="p-1 h-10 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 transitions colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 100,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-nones focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
