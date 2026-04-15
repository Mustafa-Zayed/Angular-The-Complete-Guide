import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  // Using OnPush here to demonstrate that this component or its children will only re-render when its
  // inputs, signals or events are changed or emitted, not for every change detection cycle.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessageComponent {
  private messageService = inject(MessagesService);
  enteredText = signal('');

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    this.messageService.addMessage(this.enteredText());
    this.enteredText.set('');
  }
}
