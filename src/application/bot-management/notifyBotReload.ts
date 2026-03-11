export async function notifyBotReload(): Promise<void> {
  const botApiUrl = process.env.BOT_API_URL;
  if (!botApiUrl) return;

  try {
    await fetch(`${botApiUrl}/reload-schedules`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.BOT_SECRET}` },
    });
  } catch (error) {
    console.warn("[notifyBotReload] Could not reach bot:", error);
  }
}
