export as namespace KeyframeAnimationLib;

export = KeyframeAnimation;

declare class KeyframeAnimation {
  constructor();

  set(Config: KeyframeAnimation.Config): KeyframeAnimation;
  keyframes(frames: object): KeyframeAnimation;
  animate(callback: KeyframeAnimation.AnimateCallback, resetIteration?: boolean): KeyframeAnimation;
  stop(): void;
}

declare namespace KeyframeAnimation {
    export interface Config {
        fps: number,
        duration: number,
        animation: "linear" | "ease-out",
        iterationCount: number | "infinite",
    }

    export interface AnimateCallback {
        (
            data: object,
        ): void
    }
}