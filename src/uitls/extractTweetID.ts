export default function extractTweetId(url: string): string {
  const regex = /\/status\/(\d+)/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  } else {
    return url;
  }
}
