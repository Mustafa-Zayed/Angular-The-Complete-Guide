import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  private messageService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef);
  private desRef = inject(DestroyRef);

  messages: string[] = [];

  ngOnInit(): void {
    // Subscribe to the messages$ observable to get updates when new messages are added, so we make changes to the component's state (the "messages" property).
    // Then mark the component for check to trigger change detection.
    const subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });

    this.desRef.onDestroy(() => subscription.unsubscribe());
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
