import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

export async function getPosts() {
    const response = await fetch("https://api.example.com/posts/1");
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
            http.get("https://api.example.com/posts/1", () =>
                HttpResponse.json({ id: "1", title: "foo" })
            )
        );

        const result = await getPosts();

        expect(result).toEqual({ id: "1", title: "foo" });
    });
});
