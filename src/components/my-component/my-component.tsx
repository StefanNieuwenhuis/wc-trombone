import { Component, Element, h, Host, Listen } from '@stencil/core';
import { Note } from '../../utils/note';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Element() el!: HTMLElement;

  _startingWidth: number = null;
  _audioCtx: AudioContext = null;
  _oscillatorNode: OscillatorNode = null;
  _gainNode: GainNode = null;
  _notes: Note[] = [];
  _lastNoteTime = 0;

  $outer: HTMLElement;
  $expander: HTMLElement;
  $scale: HTMLElement;

  componentDidLoad() {
    this.$outer = this.el.shadowRoot.querySelector('#outer');
    this.$expander = this.el.shadowRoot.querySelector('#expander');
    this.$scale = this.el.shadowRoot.querySelector('#scale');

    this.setMargins();
    this.audioSetup();

    this.moveNotes();
  }

  @Listen('click', { target: 'document' })
  onclick() {
    if (!this._audioCtx) { this.audioSetup(); }
    this._audioCtx.resume();
  }

  private setMargins() {
    let margin;

    this._startingWidth = Math.max(window.innerWidth, 400);
    margin = (this._startingWidth - 304) / 2;

    this.$outer.style.marginLeft = margin;
    this.$outer.style.marginRight = margin;
    this.$scale.style.left = margin;
  }

  private audioSetup() {
    this._audioCtx = new AudioContext();
    this._oscillatorNode = this._audioCtx.createOscillator();
    this._oscillatorNode.type = 'sawtooth';
    this._oscillatorNode.frequency.value = 440;
    this._oscillatorNode.detune.value = -1200;
    this._oscillatorNode.start(0);
    this._gainNode = this._audioCtx.createGain();
    this._gainNode.gain.value = 0;
    this._oscillatorNode.connect(this._gainNode);
    this._gainNode.connect(this._audioCtx.destination);
  }

  @Listen('resize', { target: 'window' })
  onResize(): any {
    const width = window.innerWidth;
    const t = performance.now();
    const x = (this.$expander.offsetWidth - 4) / 50;
    let alerted = false;
    let timeout;

    if (width < this._startingWidth) { this.setMargins(); }

    if (!this._audioCtx || this._audioCtx.state === 'suspended') {
      if (!alerted) {
        alerted = true;
        alert('Click trombone to activate sound');

        setTimeout(() => alerted = false, 1000);
      }
      return;
    }

    this._oscillatorNode.detune.value = (x * -100) - 1200;
    this._gainNode.gain.value = .5;
    this._gainNode.gain.linearRampToValueAtTime(.5, this._audioCtx.currentTime + .1);

    if (t - this._lastNoteTime > 200) {
      this._lastNoteTime = t;
      this.addNote();
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      this._gainNode.gain.linearRampToValueAtTime(0, this._audioCtx.currentTime + .1);
    }, 200);
  }

  private addNote() {
    const element = document.createElement('img');
    const note: Note = {
      x: 203,
      y: 22,
      xv: Math.random() * 5 + 5,
      yv: Math.random() * 4 - 2,
      element
    };

    element.src = './assets/note.gif';
    element.className = 'note';
    element.style.transform = 'rotate(' + (Math.random() * 30 - 15) + 'deg)';
    this.$outer.appendChild(element);
    this._notes.push(note);
  }

  private moveNotes() {
    let newNotes = [];
    this._notes.forEach((note: Note) => {
      note.yv -= .2;
      note.x += note.xv;
      note.y += note.yv;
      if (note.y > -100) newNotes.push(note);
      note.element.style.top = `${note.y}px`;
      note.element.style.left = `${note.x}px`;

      console.log(note);
    });
    this._notes = newNotes;
    setTimeout(this.moveNotes.bind(this), 50);
  }

  render() {
    return <Host>
      <div id="outer">
        <img id="top" src="./assets/top.png" />
        <img id="expander" src="./assets/expander.png" />
        <img id="slide" src="./assets/slide.png" />
      </div>
      <div id="scale">
        <span class="mark">A</span>
        <span class="mark">G#</span>
        <span class="mark">G</span>
        <span class="mark">F#</span>
        <span class="mark">F</span>
        <span class="mark">E</span>
        <span class="mark">D#</span>
        <span class="mark">D</span>
        <span class="mark">C#</span>
        <span class="mark">C</span>
        <span class="mark">B</span>
        <span class="mark">A#</span>
        <span class="mark">A</span>
        <span class="mark">G#</span>
        <span class="mark">G</span>
        <span class="mark">F#</span>
        <span class="mark">F</span>
        <span class="mark">E</span>
        <span class="mark">D#</span>
        <span class="mark">D</span>
        <span class="mark">C#</span>
        <span class="mark">C</span>
        <span class="mark">B</span>
        <span class="mark">A#</span>
      </div>
    </Host>;
  }
}
