import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  // Using OnPush here to demonstrate that this component or its children will only re-render when its
  // inputs, signals or events are changed or emitted, not for every change detection cycle.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messageService = inject(MessagesService);
  messages = this.messageService.allMessages;

  // messages$ = this.messageService.messages$;
  ////
  // We can use the async pipe in the template to subscribe to the messages$ observable, which handles
  // subscription and unsubscription automatically. This simplifies our component and eliminates the need
  // for manual subscription management and change detection triggering.
  ///// Alternative approach without async pipe:
  // private cdRef = inject(ChangeDetectorRef);
  // private desRef = inject(DestroyRef);
  // messages: string[] = [];
  // ngOnInit(): void {
  //   // Subscribe to the messages$ observable to get updates when new messages are added, so we make changes to the component's state (the "messages" property).
  //   // Then mark the component for check to trigger change detection.
  //   const subscription = this.messageService.messages$.subscribe((messages) => {
  //     this.messages = messages;
  //     this.cdRef.markForCheck();
  //   });
  //   this.desRef.onDestroy(() => subscription.unsubscribe());
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
