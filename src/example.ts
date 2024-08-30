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
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    return response.json();
}
