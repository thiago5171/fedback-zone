import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}
export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [comment, setComment] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    console.log(comment, screenshot);
    onFeedbackSent();
  }
  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className=" top-5 left-5 absolute text-zinc-400 hoves:text-zinc-100"
        >
          <ArrowLeft />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100  border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus-ring-1  focus:outline-none resize-none scrollbar-thumb-zinc-100 scrollbar-track-transparent scrollbar-thin"
          onChange={(event) => {
            setComment(event.target.value);
          }}
          placeholder="Conte com detalhes o que esta acontecendo..."
        />
        <footer className="flex gap-3 mt2]-2">
          <ScreenShotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length == 0}
            className="p-2  bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-nones focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500  "
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
