export type Result<T, E = string> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: E;
      message?: string;
    };
