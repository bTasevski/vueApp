export type FetchType = Partial<{
  isIdle: string;
  isLoading: string;
  isLoaded: string;
  isLoadFail: string;
}>;

export const FetchState: FetchType = {
  isIdle: "idle",
  isLoading: "loading",
  isLoaded: "loaded",
  isLoadFail: "load failed",
};
