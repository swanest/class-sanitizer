import 'jest-extended';
import { SanitizerInterface } from '../src';

describe('Sanitizer', () => {
    beforeEach(() => {
        // Because `class-sanitizer` stores metadata of all annotated classes in a
        // single, global object, we make sure to get a fresh copy of the
        // module for every test.
        jest.resetModules();
    });

    it('Basic sanitization', async () => {
        const {
            Rtrim,
            Ltrim,
            ToInt,
            ToBoolean,
            NormalizeEmail,
            ToLowerCase,
            ToUpperCase,
            sanitize,
        } = await import('../src/index');

        class A {
            @ToInt() age: any;
            @Ltrim() bio: string;
            @ToLowerCase() color1: string;
            @ToUpperCase() color2: string;
            @NormalizeEmail() email: string;
            @ToBoolean() isPremium: any;
            @Rtrim() text: string;
        }

        const a = new A();
        a.bio = ' abcdef';
        a.text = 'test ';
        a.email = 'EXAMPLE+work@gmail.com';
        a.age = '18';
        a.isPremium = '1';
        a.color1 = '#fFf';
        a.color2 = '#FfF';

        sanitize(a);

        expect(a.bio).not.toStartWith(' ');
        expect(a.text).not.toEndWith(' ');
        expect(a.email).toBe('example@gmail.com');
        expect(a.age).toBeNumber();
        expect(a.age).toBe(18);
        expect(a.isPremium).toBeBoolean();
        expect(a.isPremium).toBe(true);
        expect(a.color1).toMatch('#fff');
        expect(a.color2).toMatch('#FFF');
    });

    it('Nested objects', async () => {
        const {
            Trim,
            ToDate,
            SanitizeNested,
            sanitize,
        } = await import('../src/index');

        class Tag {
            @ToDate() createdOn: string | Date;
            @Trim() name: string;
        }

        class Post {
            @SanitizeNested() tags: Tag[];
            title: string;
        }

        const tag1 = new Tag();
        tag1.name = 'ja';

        const tag2 = new Tag();
        tag2.name = 'node.js ';
        tag2.createdOn = '2010-10-10';

        const post1 = new Post();
        post1.title = 'Hello world';
        post1.tags = [tag1, tag2];

        sanitize(post1);

        expect(post1.tags[1]).toBe(tag2);
        expect(tag2.name).not.toEndWith(' ');
        expect(tag2.createdOn).toBeInstanceOf(Date);
    });

    it('Custom sanitizer', async () => {
        const {Sanitize, SanitizerConstraint} = await import('../src/index');

        @SanitizerConstraint()
        class LetterReplacer implements SanitizerInterface {
            sanitize(text: string): string {
                return text.replace(/o/g, 'w');
            }
        }

        const {sanitize} = await import('../src/index');

        class Post {
            @Sanitize(LetterReplacer) title: string;
        }

        const post1 = new Post();
        post1.title = 'Hello world';

        sanitize(post1);

        expect(post1.title).toMatch('Hellw wwrld');
    });

    it('Inheritance', async () => {
        const {
            sanitize,
            ToInt,
            Trim,
            Blacklist,
            Rtrim,
        } = await import('../src/index');

        class BasePost {
            @ToInt() rating: any;
        }

        class Post extends BasePost {
            @Rtrim(['.'])
            @Blacklist(/(1-9)/)
            text: string;
            @Trim() title: string;
        }

        const post1 = new Post();
        post1.title = ' Hello world ';
        post1.text = '1. this is a great (2) post about hello 3 world.';
        post1.rating = '12.2';

        sanitize(post1);

        expect(post1.title).toMatch('Hello world');
        expect(post1.text).toStartWith(
            '. this is a great  post about hello  world',
        );
        expect(post1.text).not.toEndWith('.');
        expect(post1.rating).toBe(12);
    });

    /* Test for https://github.com/typestack/class-sanitizer/issues/8 */
    it(
        'Two classes that both have a property with the same name are ' +
        'not confused when performing sanitization',
        async () => {
            const {Trim, sanitize} = await import('../src/index');

            class A {
                text: string;
            }

            class B {
                @Trim() text: string;
            }

            const a = new A();
            const b = new B();

            a.text = 'space at the end ';
            b.text = 'space at the end ';

            sanitize(a);
            sanitize(b);

            expect(a.text).toEndWith(' ');
            expect(b.text).not.toEndWith(' ');
        },
    );
});
