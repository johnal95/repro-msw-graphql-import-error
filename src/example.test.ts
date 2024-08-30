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
        server.use(
            graphql.query("GetPost", () =>
                HttpResponse.json({ data: { post: { id: "1", title: "foo" } } })
            )
        );

        const result = await getPosts();

        expect(result).toEqual({
            data: {
                post: { id: "1", title: "foo" },
            },
        });
    });
});
