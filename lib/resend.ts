export async function sendWithRetry(fn: () => Promise<{ error: unknown }>, attempts = 3): Promise<boolean> {
  for (let i = 0; i < attempts; i++) {
    const { error } = await fn();
    if (!error) return true;
    console.error(`Resend attempt ${i + 1} failed:`, error);
  }
  return false;
}
