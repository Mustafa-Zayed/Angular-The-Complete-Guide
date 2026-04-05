import { Injectable } from '@angular/core';

/**
 * Services can be injected to other services only if they are provided in the Platform EnvironmentInjector
 * or Application root EnvironmentInjector, which means that if provided in Element Injector, they can't
 * be injected to other services.
 * They are not elements nor a part of the DOM, so they can't be provided in the Element Injector.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  log(message: string) {
    const timeStamp = new Date().toLocaleTimeString();
    console.log(`[${timeStamp}]: ${message}`);
  }
}
