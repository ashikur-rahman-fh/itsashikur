/** Fire-and-forget cache revalidation on the public site after publish-affecting changes. */
export async function triggerBlogRevalidation(): Promise<boolean> {
  try {
    const response = await fetch('/api/revalidate/blog', {
      method: 'POST',
      credentials: 'same-origin',
    });
    if (!response.ok) {
      return false;
    }
    const body = (await response.json()) as { revalidated?: boolean };
    return body.revalidated === true;
  } catch {
    return false;
  }
}
