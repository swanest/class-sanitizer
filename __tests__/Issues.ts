import 'jest-extended';
import { SanitizerInterface } from '../src';

describe('Github Issues', () => {

    beforeEach(() => {
        // Because `class-sanitizer` stores metadata of all annotated classes in a
        // single, global object, we make sure to get a fresh copy of the
        // module for every test.
        jest.resetModules();
    });

    it('#13 ToInt keeps empty string instead of changing to NaN', async () => {
        const {sanitize, ToInt} = await import('../src/index');

        class Query {
            @ToInt()
            page: number;
        }

        const q = new Query() as any;
        q.page = '';
        sanitize(q);

        expect(q.page).toEqual(NaN);
    });

    it('#10 Sanitizing a property is not limited to class where it is applied', async () => {
        const {Sanitize, SanitizerConstraint} = await import('../src/index');

        let counter = 0;

        @SanitizerConstraint()
        class TransformAndCount implements SanitizerInterface {
            sanitize(text: string): string {
                counter++;
                return 'some-value';
            }
        }

        const {sanitize} = await import('../src/index');

        class Post {
            @Sanitize(TransformAndCount) title: string;
        }

        class Post2 {
            @Sanitize(TransformAndCount) title: string;
        }

        const post1 = new Post();
        post1.title = 'Hello world';

        const post2 = new Post2();
        post2.title = 'Hello world';

        sanitize(post1);
        expect(post1.title).toEqual('some-value');
        expect(counter).toEqual(1);

        counter = 0;

        sanitize(post2);
        expect(post2.title).toEqual('some-value');
        expect(counter).toEqual(1);
    });

});
