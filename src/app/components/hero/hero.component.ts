import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  titles = ['Front End Developer', 'Angular Developer'];
  currentTitle = signal('');
  private titleIndex = signal(0);
  private charIndex = signal(0);
  private isDeleting = signal(false);

  constructor() {
    this.typeEffect();
  }

  typeEffect() {
    const current = this.titles[this.titleIndex()];

    if (this.isDeleting()) {
      this.currentTitle.set(current.substring(0, this.charIndex() - 1));
      this.charIndex.set(this.charIndex() - 1);
    } else {
      this.currentTitle.set(current.substring(0, this.charIndex() + 1));
      this.charIndex.set(this.charIndex() + 1);
    }

    if (!this.isDeleting() && this.charIndex() === current.length) {
      setTimeout(() => this.isDeleting.set(true), 1000);
    } else if (this.isDeleting() && this.charIndex() === 0) {
      this.isDeleting.set(false);
      this.titleIndex.set((this.titleIndex() + 1) % this.titles.length);
    }

    setTimeout(() => this.typeEffect(), this.isDeleting() ? 50 : 100);
  }
}
