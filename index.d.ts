export as namespace KeyframeAnimationLib;

export = KeyframeAnimation;

declare class KeyframeAnimation {
  constructor();

  set(Config: ChunkUpload.Config): KeyframeAnimation;
  keyframes(frames: object): KeyframeAnimation;
  animate(callback: ChunkUpload.AnimateCallback, resetIteration: boolean): KeyframeAnimation;
  stop(): void;
}

declare namespace ChunkUpload {
    export interface Config {
        fps: number,
        duration: number,
        animation: ['linear', 'ease-out'],
        iterationCount: number|['infinite'],
    }

    export interface AnimateCallback {
        (
            data: object,
        ): void
    }
}