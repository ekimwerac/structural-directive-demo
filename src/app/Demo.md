Here’s a detailed demo for creating a **custom structural directive** in Angular based on slides 15, 16, and 17. The instructions and code fragments are organized for easy understanding and can be copied directly for implementation.

---

## **Angular Demo: Custom Structural Directive**

This demo demonstrates how to create and use a custom structural directive (`appIsAuth`) that conditionally renders elements based on a boolean value.

---

### **Step 1: Set Up a New Angular Project**

1. Create a new Angular project with standalone components:
   ```bash
   npx -p @angular/cli ng new structural-directive-demo --standalone --skip-tests
   ```
   - **`structural-directive-demo`**: The name of your project.
   - **`--standalone`**: Ensures standalone components and directives are used.
   - **`--skip-tests`**: Skips test file generation for simplicity.

2. Navigate into the project directory:
   ```bash
   cd structural-directive-demo
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

---

### **Step 2: Generate the Custom Structural Directive**

Use the Angular CLI to generate a directive:
```bash
ng generate directive is-auth
```

This creates:
- `src/app/is-auth.directive.ts`: Directive logic.
- `src/app/is-auth.directive.spec.ts`: Test file (optional).

---

### **Step 3: Implement the Directive**

Open `is-auth.directive.ts` and modify it as follows:

#### **Code: `is-auth.directive.ts`**
```typescript
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
```

#### **How It Works:**
1. **`TemplateRef`**: Represents the content (HTML) the directive controls.
2. **`ViewContainerRef`**: Represents the container where the content will be inserted or removed.
3. **`@Input`**: Accepts a boolean (`condition`) that determines whether the content should be displayed.
4. **Conditional Rendering**:
   - `createEmbeddedView`: Adds the template to the DOM.
   - `clear`: Removes the template from the DOM.

---

### **Step 4: Use the Directive in a Component**

Update `app.component.ts` to use the directive.

#### **Code: `app.component.ts`**
```typescript
import { Component } from '@angular/core';
import { IsAuthDirective } from './is-auth.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IsAuthDirective], // Include the directive
  template: `
    <button (click)="toggleAuth()">Toggle Auth</button>
    <p *appIsAuth="isAuthenticated">You have access to privileged information.</p>
    <p *appIsAuth="!isAuthenticated">Access denied. Please log in.</p>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated = false;

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated;
  }
}
```

#### **How It Works:**
1. **Template**:
   - The directive conditionally renders `<p>` elements based on `isAuthenticated`.
   - Toggles between showing "privileged information" and "access denied."
2. **Button Interaction**:
   - Clicking the button toggles `isAuthenticated` between `true` and `false`.

---

### **Step 5: Verify the Output**

1. Run the Angular development server if not already running:
   ```bash
   ng serve
   ```

2. Open your browser and navigate to `http://localhost:4200`.

3. **Test the Application**:
   - Click the "Toggle Auth" button to switch between the two states:
     - **When `isAuthenticated = true`**:
       ```html
       <p>You have access to privileged information.</p>
       ```
     - **When `isAuthenticated = false`**:
       ```html
       <p>Access denied. Please log in.</p>
       ```

---

### **Code Summary**

#### **Directive: `is-auth.directive.ts`**
```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIsAuth]',
  standalone: true
})
export class IsAuthDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appIsAuth(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

#### **Component: `app.component.ts`**
```typescript
import { Component } from '@angular/core';
import { IsAuthDirective } from './is-auth.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IsAuthDirective],
  template: `
    <button (click)="toggleAuth()">Toggle Auth</button>
    <p *appIsAuth="isAuthenticated">You have access to privileged information.</p>
    <p *appIsAuth="!isAuthenticated">Access denied. Please log in.</p>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated = false;

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated;
  }
}
```

---

### **Optional Styling**

Add styles in `app.component.css` to improve presentation:
```css
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

p {
  font-size: 18px;
  margin: 10px 0;
}
```

---

### **Summary**
This demo showcases:
1. How to create a **custom structural directive** (`appIsAuth`) to conditionally render content.
2. The use of Angular DI (`TemplateRef` and `ViewContainerRef`) for DOM manipulation.
3. Dynamic interactions through a button that toggles the authentication state.

---

The use of the `set` keyword in the `@Input` property of the directive is a **TypeScript setter**. It allows the directive to execute custom logic whenever the value of the `@Input` property changes. Let’s break this down step by step.

---

### **What is `set` in TypeScript?**

- The `set` keyword in TypeScript defines a **setter** for a property.
- A setter is a special method that is called automatically whenever the property is assigned a new value.
- In the context of Angular directives, this is particularly useful for reacting to changes in input bindings.

---

### **How It Works in the `@Input` Setter**

In the `appIsAuth` directive:

```typescript
@Input() set appIsAuth(condition: boolean) {
  if (condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (!condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```

1. **`@Input()`**:
   - Marks the `appIsAuth` property as an input binding, meaning its value can be set from the parent component's template.

2. **`set appIsAuth(condition: boolean)`**:
   - This is a **setter function** for the `appIsAuth` input property.
   - Every time the value of `appIsAuth` changes in the parent component's template, the setter is invoked.

3. **Custom Logic**:
   - The setter evaluates the `condition` and decides whether to render the associated template or remove it.
   - This is done dynamically without explicitly requiring Angular's change detection to recheck.

---

### **Why Use a Setter for `@Input`?**

1. **React to Input Changes**:
   - A setter lets you immediately react to changes in the bound value (`condition`) and apply custom logic.

2. **Encapsulation**:
   - Encapsulates logic related to the input property within the directive.
   - Keeps the directive's behavior self-contained and reusable.

3. **Dynamic Rendering**:
   - In this directive, the setter dynamically creates or removes the template from the DOM based on the value of `condition`.

---

### **How Angular Uses It**

1. When the parent component’s template binds a value to the `appIsAuth` property:
   ```html
   <p *appIsAuth="isAuthenticated">You have access to privileged information.</p>
   ```
   - `isAuthenticated` is passed to the `appIsAuth` input.

2. Angular detects the change and invokes the setter method in the directive:
   ```typescript
   set appIsAuth(condition: boolean) {
     // Logic for rendering or clearing the template
   }
   ```

3. Based on the value of `condition`:
   - If `true`, the directive renders the template by calling:
     ```typescript
     this.viewContainer.createEmbeddedView(this.templateRef);
     ```
   - If `false`, the directive clears the template:
     ```typescript
     this.viewContainer.clear();
     ```

---

### **Setter vs Standard Property Binding**

#### Without a Setter:
If `appIsAuth` were a standard property, you’d need additional lifecycle hooks (like `ngOnChanges`) to respond to value changes:
```typescript
@Input() appIsAuth: boolean = false;

ngOnChanges() {
  if (this.appIsAuth) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainer.clear();
  }
}
```

#### With a Setter:
The logic is simpler and more streamlined:
```typescript
@Input() set appIsAuth(condition: boolean) {
  if (condition) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainer.clear();
  }
}
```

---

### **Advantages of Using `set` for `@Input`**

1. **Immediate Execution**:
   - The setter is invoked as soon as the bound value changes.
   - No need for lifecycle hooks like `ngOnChanges`.

2. **Cleaner Code**:
   - Keeps the logic for handling input changes localized to the setter.
   - Avoids cluttering the directive with additional lifecycle methods.

3. **Dynamic Behavior**:
   - Makes it easier to implement dynamic and conditional rendering or other behaviors.

---

### Example in Action

#### Template:
```html
<p *appIsAuth="isAuthenticated">You have access to privileged information.</p>
<p *appIsAuth="!isAuthenticated">Access denied. Please log in.</p>
```

#### Parent Component:
```typescript
export class AppComponent {
  isAuthenticated = false;

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated;
  }
}
```

1. **When `isAuthenticated = true`**:
   - The `appIsAuth` setter is called with `true`.
   - The template for the first `<p>` is rendered, and the second `<p>` is removed.

2. **When `isAuthenticated = false`**:
   - The `appIsAuth` setter is called with `false`.
   - The first `<p>` is removed, and the second `<p>` is rendered.

---

### **Conclusion**

Using `set` with `@Input` allows directives to:
- React immediately to changes in the bound property.
- Encapsulate behavior related to the input.
- Dynamically manage DOM rendering based on property values.

This makes `@Input` setters a powerful feature for creating flexible and reusable Angular directives.
