import { EventEmitter } from 'events';

class AppEventEmitter extends EventEmitter {}

// Prevents multiple instances in Next.js hot reload development mode
const globalForEmitter = global as unknown as { eventEmitter: AppEventEmitter };
export const appEvents = globalForEmitter.eventEmitter || new AppEventEmitter();

if (process.env.NODE_ENV !== 'production') {
  globalForEmitter.eventEmitter = appEvents;
}
