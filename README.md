# `sw-class-sanitizer`

Allows to use decorator and non-decorator based sanitization in your Typescript classes.
Internally uses [validator.js][1] to make sanitization.

**Fork of [class-sanitizer](https://github.com/typestack/class-sanitizer)**

## Installation

`npm install sw-class-sanitizer --save`

`yarn add sw-class-sanitizer`

## Usage

Create your class and put some sanity decorators on its properties you want to sanitize:

```typescript
import { sanitize, Trim, Rtrim, Blacklist } from 'class-sanitizer';

export class Post {
  @Trim() title: string;

  @Rtrim(['.'])
  @Blacklist(/(1-9)/)
  text: string;
}

let post1 = new Post();
post1.title = ' Hello world ';
post1.text = '1. this is a great (2) post about hello 3 world.';

sanitize(post);
console.log(post);
// now post will look like this:
// Post {
// title: "Hello world",
// text: ". this is a great  post about hello  world"
// }
```

## Custom sanitization classes

If you have custom sanity logic you want to use as annotations you can do it this way:

1. First create a file, lets say `LetterReplacer.ts`, and create there a new class:

   ```typescript
   import { SanitizerInterface, SanitizerConstraint } from 'class-sanitizer';

   @SanitizerConstraint()
   export class LetterReplacer implements SanitizerInterface {
     sanitize(text: string): string {
       return text.replace(/o/g, 'w');
     }
   }
   ```

   Your class must implement `SanitizerInterface` interface and its `sanitize` method, which defines sanitization logic.

2. Then you can use your new sanitization constraint in your class:

   ```typescript
   import { Sanitize } from 'class-sanitizer';
   import { LetterReplacer } from './LetterReplacer';

   export class Post {
     @Sanitize(LetterReplacer) title: string;
   }
   ```

   Here we set our newly created `LetterReplacer` sanitization constraint for `Post.title`.

3. Now you can use sanitizer as usual:

   ```typescript
   import { sanitize } from 'class-sanitizer';

   sanitize(post);
   ```

## Using service container

Sanitizer supports service container in the case if want to inject dependencies into your custom sanity constraint
classes. Here is example how to integrate it with [typedi][2]:

```typescript
import { Container } from 'typedi';
import { Sanitizer } from 'class-sanitizer';

// do this somewhere in the global application level:
let sanitizer = Container.get(Sanitizer);
sanitizer.container = Container;

// now everywhere you can inject `Sanitizer` class which will go from the container
// also you can inject classes using constructor injection into your custom sanitizers.
```

## Manual sanitization

There are several methodw in the `Sanitizer` that allows to perform non-decorator based sanitization:

```typescript
import Sanitizer from 'class-sanitizer';

Sanitizer.blacklist(str, chars);
Sanitizer.escape(str);
Sanitizer.ltrim(str, chars);
Sanitizer.normalizeEmail(str, isLowercase);
Sanitizer.rtrim(str, chars);
Sanitizer.stripLow(str, keepNewLines);
Sanitizer.toBoolean(input, isStrict);
Sanitizer.toDate(input);
Sanitizer.toFloat(input);
Sanitizer.toInt(input, radix);
Sanitizer.toString(input);
Sanitizer.trim(str, chars);
Sanitizer.whitelist(str, chars);
Sanitizer.toUpperCase(str);
Sanitizer.toLowerCase(str);
```

## Sanitization decorators

| Decorator                        | Description                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@Blacklist(chars: RegExp)`      | Remove characters that appear in the blacklist.                                                                                                                          |
| `@Escape()`                      | Replace <, >, &, ', " and / with HTML entities.                                                                                                                          |
| `@Ltrim()`                       | Trim characters from the left-side of the input.                                                                                                                         |
| `@NormalizeEmail()`              | Canonicalize an email address.                                                                                                                                           |
| `@Rtrim()`                       | Trim characters from the right-side of the input.                                                                                                                        |
| `@StripLow()`                    | Remove characters with a numerical value < 32 and 127, mostly control characters.                                                                                        |
| `@ToBoolean(isStrict?: boolean)` | Convert the input to a boolean. Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.                                  |
| `@ToDate()`                      | Convert the input to a date, or null if the input is not a date.                                                                                                         |
| `@ToFloat()`                     | Convert the input to a float.                                                                                                                                            |
| `@ToInt()`                       | Convert the input to an integer, or NaN if the input is not an integer.                                                                                                  |
| `@ToString()`                    | Convert the input to a string.                                                                                                                                           |
| `@Trim(chars?: string[])`        | Trim characters (whitespace by default) from both sides of the input. You can specify chars that should be trimmed.                                                      |
| `@Whitelist(chars: RegExp)`      | Remove characters that do not appear in the whitelist.\* The characters are used in a RegExp and so you will need to escape some chars, e.g. whitelist(input, '\\[\\]'). |
| `@ToUpperCase()`                 | (self-explanatory)                                                                                                                                                       |
| `@ToLowerCase()`                 | (self-explanatory)                                                                                                                                                       |

## Examples

Take a look at [the tests](./__tests__) for more examples of usages.

[1]: https://github.com/chriso/validator.js
[2]: https://github.com/pleerock/typedi
