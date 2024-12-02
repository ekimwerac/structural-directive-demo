import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIsAuth]', // Matches elements with [appIsAuth] attribute
  standalone: true // Allows standalone usage
})
export class IsAuthDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>, // Template to render
    private viewContainer: ViewContainerRef // Where to render the template
  ) {}

  @Input() set appIsAuth(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Render template
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear(); // Remove template from view
      this.hasView = false;
    }
  }
}
