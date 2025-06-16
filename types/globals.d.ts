// types/globals.d.ts
declare global {
  var ErrorUtils:
    | {
        setGlobalHandler: (
          handler: ((error: any, isFatal?: boolean) => void) | null
        ) => void;
      }
    | undefined;
}

export {};
