# Dynamic Form — Deep Dive 🎓

> This document answers your four questions as a mentor walking you through the design decisions behind the Dynamic Form implementation. Each section ends with **🧠 Thought Questions** to keep you honest.

---

## 1. `QuestionBase<T>` — What is this class and why does the constructor look like that?

### What it is

`QuestionBase<T>` is a **data-model class**. It is not a component, service, or directive — it has zero Angular decorators. Its entire job is to **describe what a single form field looks like**: its key, label, type, validation rules, order, and the options it might have.

Think of it as a "blueprint contract" that says:
> *"Every question in this form must know its key, its label, whether it is required, etc."*

### Why the `<T>` generic?

The `<T>` makes it type-safe for the **value** the field holds. Right now every field is `string`, so you see `QuestionBase<string>` everywhere. But if you ever had a number input or a date picker, you could use `QuestionBase<number>` or `QuestionBase<Date>` and TypeScript would catch mismatches at compile time instead of at runtime.

### Why the constructor looks "weird"

```ts
constructor(
  options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string; value: string }[];
  } = {},   // ← default value so you can call new QuestionBase() with nothing
) {
  this.value    = options.value;
  this.key      = options.key || '';
  // ...
}
```

This is called the **Options Object Pattern** (sometimes called the "Bag of Options" pattern). Instead of:

```ts
// ❌ Bad — order matters, hard to read at call site
new TextBoxQuestion('firstName', 'First Name', 'Thomas', true, 1)
```

you write:

```ts
// ✅ Good — self-documenting, order doesn't matter, optional fields are optional
new TextBoxQuestion({ key: 'firstName', label: 'First Name', value: 'Thomas', required: true, order: 1 })
```

Benefits:
- **Readable call sites** — you know what each value means without looking at the signature.
- **Safe to omit** — every property is optional (`?`), so `new TextBoxQuestion({})` is valid.
- **Easy to extend** — adding a new field to the options object never breaks existing callers.

The `= {}` at the end is simply a default so that `new TextBoxQuestion()` (no args at all) doesn't crash.

> **Is this used "for typing the model"?** Partially yes. The class doubles as both a runtime object (you instantiate it with `new`) and a TypeScript type (TypeScript infers the type from the class shape). Angular developers often call this a **domain model class** — a plain class that carries business data without any framework dependency.

---

### 🧠 Thought Questions #1

1. What would break if you removed the `= {}` default from the constructor?
2. Why would `QuestionBase<Date>` be useful for a date picker field? What would TypeScript catch for you?
3. Can you think of a scenario where relying purely on TypeScript `interface` instead of a `class` here would be a problem?
   - *Hint: you call `new` on this — you can't `new` an interface.*

---

## 2. `TextBoxQuestion` & `DropdownQuestion` — Two types extending `QuestionBase`: what's the purpose?

### The Pattern: Specialisation via Inheritance

```
QuestionBase<T>          ← generic base (knows everything all questions share)
   ├── TextBoxQuestion   ← overrides controlType = 'textbox'
   └── DropdownQuestion  ← overrides controlType = 'dropdown'
```

Each subclass has exactly **one job**: stamp the `controlType` field with its own identity. That `controlType` is the key that the template uses to decide which HTML element to render (`<input>` vs `<select>`).

### Data Flow (end-to-end)

```
QuestionService.getQuestions()
  │  Creates an array of concrete instances:
  │  [ new TextBoxQuestion({...}), new DropdownQuestion({...}), ... ]
  │
  ▼
DynamicForm component (dynamic-form.ts)
  │  Receives questions[] as an @input
  │  Calls QuestionControl.toFormGroup(questions) → FormGroup
  │  Iterates over questions with @for
  │
  ▼
DynamicFormQuestion component (per question)
  │  Receives one QuestionBase + the FormGroup
  │  Uses @switch (question().controlType) to pick the right template:
  │    'textbox'  → <input [formControlName]="...">
  │    'dropdown' → <select> + @for options
  │
  ▼
Rendered HTML + two-way binding via ReactiveFormsModule
```

### Why not just put `controlType` as a string argument and skip inheritance?

You *could*, but then you'd have to trust every caller to pass the right string. With subclasses:
- TypeScript enforces the type: `TextBoxQuestion` is always a `QuestionBase<string>` — it can't be anything else.
- The `controlType` is **set once** in the class, never forgotten by a caller.
- Adding a new type means adding a new class, not searching for every `new QuestionBase({ controlType: '...' })` spread across the codebase.

---

### 🧠 Thought Questions #2

1. Right now `TextBoxQuestion` overrides `controlType` as a **class field** (`override controlType = controlTypeEnum.TEXT_BOX`). Could you override it in the **constructor** instead? What is the difference?
2. The `DynamicFormQuestion` template uses `@switch (question().controlType)`. What happens if you add a new subclass (say `DatePickerQuestion`) but forget to add a `@case` in the template?
3. Is the relationship between `QuestionBase` and its subclasses "inheritance" or "composition"? When would you prefer composition here?

---

## 3. `new` in `QuestionService.getQuestions()` — What is this, and what topic should you master?

### What `new` does here

```ts
new DropdownQuestion({
  key: 'favouriteAnimal',
  label: 'Favourite Animal',
  options: [...],
  required: true,
  order: 3,
})
```

`new` calls the **constructor** of `DropdownQuestion` (which inherits from `QuestionBase`) and returns an **instance** — a live JavaScript object in memory that has all the properties you passed in, plus the defaults for anything you left out.

So `questions` is simply an array of these plain JavaScript objects. There is no Angular magic here — just vanilla OOP.

### Topics to grasp

| Topic | Why it matters here |
|---|---|
| **JavaScript Classes & Prototypes** | Understanding what `new` does under the hood (allocates object, runs constructor, sets `__proto__`). |
| **TypeScript Generics** | Understanding `QuestionBase<T>` and why `QuestionBase<string>[]` is the array type. |
| **TypeScript Inheritance** | `extends` and `override` keywords; how the subclass can reuse and specialise the base. |
| **Options Object Pattern** | Already covered above — but recognise it when you see it in Angular's own APIs too (e.g. `HttpClient` options). |
| **Factory Pattern** (next level) | `getQuestions()` is essentially a **factory method** — a function whose job is to create and return objects. When you see logic that creates objects, think "could this be a factory?" |

A useful mental model: `new SomeClass(options)` is like filling out a **form** for an object — you provide the data, the constructor turns it into a fully initialised instance of that class.

---

### 🧠 Thought Questions #3

1. `getQuestions()` returns `of(questions.sort(...))`. What does `of` do here? What type does `getQuestions()` return, and why is wrapping it in an Observable useful even if the data is static right now?
2. What is the difference between calling `new TextBoxQuestion(...)` directly in the service vs. having it come from a JSON API response? How would you handle the second case?
3. Could you replace all the `new` calls with plain object literals `{ key: 'firstName', controlType: 'textbox', ... }`? What would you lose?

---

## 4. Scalability — Adding many field types in the future

### What the current approach buys you

The current design already has good bones for scalability:

1. **Centralised type identity** — `controlTypeEnum` is the single source of truth for all control type names.
2. **Open/Closed Principle** — adding a new type means adding a new class (`DatePickerQuestion`, `CheckboxQuestion`, …) and a new `@case` in the template. You don't touch existing classes.
3. **Single FormGroup factory** — `QuestionControl.toFormGroup()` loops over *any* `QuestionBase[]`, so it automatically handles new types without changes.

### The catches at scale

As the number of field types grows, a few pain points will emerge:

#### Pain Point 1: The `@switch` in the template grows without bound

Currently:
```html
@switch (question().controlType) {
  @case (controlTypeEnum.TEXT_BOX) { <input ...> }
  @case (controlTypeEnum.DROPDOWN) { <select ...> }
  <!-- in 2 years: 20 more @case blocks? -->
}
```

**Solution → Dynamic Component Loading**

Angular's `NgComponentOutlet` (or the lower-level `ViewContainerRef.createComponent()`) lets you map a `controlType` to a **component class** and instantiate it dynamically, completely eliminating the `@switch`.

```ts
// A registry: controlType → the component class to render
const QUESTION_COMPONENT_MAP: Record<controlTypeType, Type<any>> = {
  [controlTypeEnum.TEXT_BOX]: TextBoxQuestionComponent,
  [controlTypeEnum.DROPDOWN]: DropdownQuestionComponent,
  // Adding a new type = add one line here, zero template changes
};
```

#### Pain Point 2: `QuestionBase` has fields that not all types need

For example, `options: { key, value }[]` only makes sense for dropdowns. A text box doesn't need it, but it carries it around anyway.

**Solution → Leaner subclasses with their own extra fields**

Move type-specific fields out of `QuestionBase` and into the subclass:

```ts
export class DropdownQuestion extends QuestionBase<string> {
  override controlType = controlTypeEnum.DROPDOWN;
  options: { key: string; value: string }[] = []; // belongs here, not in base
}
```

#### Pain Point 3: Questions come from an API, not hardcoded `new` calls

A real app will receive a JSON config from the backend. You'll need a **factory/mapper function** that converts raw JSON into the right subclass instance:

```ts
function createQuestion(config: QuestionConfig): QuestionBase<string> {
  switch (config.controlType) {
    case controlTypeEnum.TEXT_BOX: return new TextBoxQuestion(config);
    case controlTypeEnum.DROPDOWN: return new DropdownQuestion(config);
    default: throw new Error(`Unknown controlType: ${config.controlType}`);
  }
}
```

#### Summary table

| Problem at scale | Solution |
|---|---|
| `@switch` grows forever | `NgComponentOutlet` + component registry map |
| `QuestionBase` bloats with type-specific fields | Move extra fields to subclasses |
| Questions come from API JSON | Factory/mapper function to hydrate class instances |
| Validation rules differ per type | Strategy pattern — pass a `validators` array in the options |

---

### 🧠 Thought Questions #4

1. If you implemented the **component registry** approach with `NgComponentOutlet`, how would the subcomponent (e.g. `TextBoxQuestionComponent`) receive its `QuestionBase` data and the parent `FormGroup`? Think about what Angular inputs it would need.
2. The `QuestionControl.toFormGroup()` builds a `FormGroup` by iterating all questions and checking `question.required`. If a future `DatePickerQuestion` needs a custom validator (e.g. "date must be in the future"), where is the best place to express that — in the model, in the service, or somewhere else?
3. Sketch (in pseudocode/TypeScript) what the `createQuestion(config)` factory function would look like if you also wanted to support a new `RadioQuestion` type, and `config` came from this JSON shape:
   ```json
   { "controlType": "radio", "key": "gender", "label": "Gender", "options": [...] }
   ```
