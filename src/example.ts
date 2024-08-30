import { Client, cacheExchange, fetchExchange, gql } from "urql";

const client = new Client({
    url: "http://localhost:42069/graphql",
    exchanges: [cacheExchange, fetchExchange],
});

const GET_POSTS_QUERY = gql`
    query ListPosts {
        posts {
            id
            title
        }
    }
`;

export async function getPosts() {
    const result = await client.query(GET_POSTS_QUERY, {});
    return result.data;
}
