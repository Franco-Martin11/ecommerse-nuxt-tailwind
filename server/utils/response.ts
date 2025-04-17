interface AsyncResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
interface PromiseResponseUtil<T> {
  callback: () => Promise<AsyncResponse<T>>;
}

export async function handleAsyncRequest<T>(
  fn: PromiseResponseUtil<T>["callback"]
): Promise<AsyncResponse<T>> {
  try {
    const response = await fn();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
