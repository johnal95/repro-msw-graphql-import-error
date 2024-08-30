import { setupServer } from "msw/node";
import { HttpResponse, graphql } from "msw";

const query = `
query GetPost {
    post {
        id
        title
    }
}
`;

export async function getPosts() {
    const response = await fetch("https://api.example.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    return response.json();
}

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
