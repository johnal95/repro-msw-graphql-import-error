import { setupServer } from "msw/node";
import { HttpResponse, graphql } from "msw";
import { getPosts } from "./example";

const server = setupServer();

describe("example", () => {
    beforeAll(() => {
        server.listen({ onUnhandledRequest: "error" });
    });

    afterAll(() => {
        server.close();
    });

    it("should", async () => {
        server.use(graphql.query("ListPosts", () => HttpResponse.json({ data: { posts: [] } })));

        const result = await getPosts();

        expect(result).toEqual({ posts: [] });
    });
});
