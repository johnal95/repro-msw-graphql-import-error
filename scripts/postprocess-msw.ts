import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve(
    process.cwd(),
    "node_modules/msw/lib/core/utils/internal",
    "parseGraphQLRequest.js"
);

const file = fs.readFileSync(filePath, "utf-8");

// INITIAL REFACTOR TO SIMPLIFY ACTUAL POST-PROCESS
const source1 = `async function parseQuery(query) {
  const { parse } = await import("graphql").catch((error) => {
    import_devUtils.devUtils.error(
      'Failed to parse a GraphQL query: cannot import the "graphql" module. Please make sure you install it if you wish to intercept GraphQL requests. See the original import error below.'
    );
    throw error;
  });
  try {
    const ast = parse(query);
    return parseDocumentNode(ast);
  } catch (error) {
    return error;
  }
}`;

const output1 = `async function parseQuery(query) {
  try {
    const { parse } = await import("graphql")

    try {
      const ast = parse(query)
      return parseDocumentNode(ast)
    } catch (error) {
      return error
    }
  } catch (importError) {
    import_devUtils.devUtils.error(
      'Failed to parse a GraphQL query: cannot import the "graphql" module. Please make sure you install it if you wish to intercept GraphQL requests. See the original import error below.'
    )
    throw importError
  }
}
`;

const refactoredFile = file.replace(source1, output1);

// ACTUAL POST-PROCESS
const source2 = "await import";
const output2 = "require";

const processedFile = refactoredFile.replace(source2, output2);

fs.writeFileSync(filePath, processedFile);
