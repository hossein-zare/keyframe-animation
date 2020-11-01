export as namespace KeyframeAnimationLib;

export = KeyframeAnimation;

declare class KeyframeAnimation {
  constructor();

  set(Config: ChunkUpload.Config): KeyframeAnimation;
  keyframes(frames: object): KeyframeAnimation;
  run(callback: ChunkUpload.RunCallback, resetIteration: boolean): KeyframeAnimation;
  stop(): void;
}

declare namespace ChunkUpload {
    export interface Config {
        fps: number,
        duration: number,
        animation: ['linear', 'ease-out'],
        iterationCount: number|['infinite'],
    }

    export interface RunCallback {
        (
            data: object,
        ): void
    }
}