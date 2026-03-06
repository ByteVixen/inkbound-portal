import { useEffect } from "react";

type Props = {
  coverImage?: string;
  onComplete: () => void;
  durationMs?: number;
};

export default function NewspaperPressIntro({
  coverImage,
  onComplete,
  durationMs = 3200,
}: Props) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [durationMs, onComplete]);

  return (
    <div className="press-intro">
      <div className="press-intro__scene">
        <div className="press-intro__headline">THE INKBOUND TIMES</div>
        <div className="press-intro__subhead">Now printing...</div>

        <div className="press-machine">
          <div className="press-machine__top" />
          <div className="press-machine__rollers">
            <div className="press-machine__roller" />
            <div className="press-machine__roller" />
          </div>

          <div className="press-sheet-wrap">
            <div className="press-sheet">
              <div className="press-sheet__paper">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Newsletter cover"
                    className="press-sheet__cover"
                  />
                ) : (
                  <div className="press-sheet__placeholder">
                    <h2>THE INKBOUND TIMES</h2>
                    <p>Fresh from the press</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="press-intro__glow" />
      </div>
    </div>
  );
}