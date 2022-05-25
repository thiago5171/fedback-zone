import { CloseButton } from "../CloseButton";
import bugImageUrls from "../../assets/bug.svg";
import ideaImageUrls from "../../assets/idea.svg";
import thoughtImageUrls from "../../assets/thought.svg";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrls,
      alt: "imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrls,
      alt: "imagem de um lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrls,
      alt: "imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes; //Essa seguinte declaração  transforma a variavel que esta recebendo a atribuição em um conjuto das chaves  da varaivel que esta sendo passada
// nesse sentido se torna: FeedbackType = "BUG" | "IDEA" | "OTHER"
export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null); // TODO: tirar duvida sobre essa lina posteriormente
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer>
        Feito com ♥ por
        <a
          className="underline underline-offset-2 pl-1"
          href="https://github.com/thiago5171"
          title="Github do autor"
        >
          Thiago G.
        </a>
      </footer>
    </div>
  );
}
