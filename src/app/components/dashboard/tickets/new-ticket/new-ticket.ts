import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { Button } from '../../../shared/button/button';
import { Control } from '../../shared/control/control';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [Button, Control, FormsModule],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css',
})
export class NewTicket implements OnInit, AfterViewInit {
  textInput = '';
  textAreaInput = '';
  // @ViewChild(HTMLParagraphElement) par?: ElementRef<HTMLFormElement>;
  // @ViewChild('form') formEl?: ElementRef<HTMLFormElement>;
  formEl = viewChild.required<ElementRef<HTMLFormElement>>('form');
  addTck = output<{ title: string; request: string }>();

  ngOnInit() {
    // viewChild method, not the decorator, is available in ngOnInit.
    // console.log('OnInit called!');
    // console.log(this.formEl?.nativeElement);
  }

  ngAfterViewInit() {
    // console.log('AfterViewInit called!');
    // console.log(this.formEl?.nativeElement);
  }

  // onSubmit(titleInput: HTMLInputElement, requestTextarea: HTMLTextAreaElement) {
  onSubmit(title: string, request: string) {
    // console.log('Form submitted!');
    // console.dir(titleInput);
    // console.dir(requestTextarea);

    this.addTck.emit({ title: title, request: request });
    this.formEl().nativeElement.reset();
  }
}
