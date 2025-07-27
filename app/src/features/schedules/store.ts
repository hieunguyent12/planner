// https://react.dev/reference/react/useSyncExternalStore#reference
export abstract class Store {
  subscribers: Set<() => void> = new Set();

  abstract getSnapshot(): any;

  subscribe(subscriber: () => void) {
    this.subscribers.add(subscriber);

    return () => this.subscribers.delete(subscriber);
  }

  notifySubscribers() {
    this.subscribers.forEach((subscriber) => subscriber());
  }
}
