interface TwitterWidgets {
  createTweet(tweetId: string, element: HTMLElement, options?: object): Promise<void>;
}

interface Twitter {
  widgets: TwitterWidgets;
}

interface Window {
  twttr: Twitter;
}