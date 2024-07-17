import { DateTime } from 'luxon';

export default class Logger {
  static log(...messages: any[]): void {
    this.sendLog('log', ...messages);
  }

  static debug(...messages: any[]): void {
    this.sendLog('log', ...messages);
  }

  static warn(...messages: any[]): void {
    this.sendLog('warn', ...messages);
  }

  static error(...messages: any[]): void {
    this.sendLog('error', ...messages);
  }

  static deprecate(...messages: any[]): void {
    this.warn('DEPRECATED --', ...messages);
  }

  static sendLog(handler: string, ...messages: any[]): void {
    const prependedMessage = `[App] - ${DateTime.local().toISO()} -`;

    // @ts-ignore
    // eslint-disable-next-line no-console
    console[handler](prependedMessage, ...messages);
  }
}
