const { writeFileSync } = require("node:fs");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  console.error("API URL is missing");
  process.exit(1);
}

const openApiUrl = `${apiUrl}/api-json`;

const apiCredentials = {
  username: process.env.BASIC_SWAGGER_USER,
  password: process.env.BASIC_SWAGGER_PASSWORD,
};

const fetchBySource = `ENV: ${
  process.env.NEXT_PUBLIC_PROJECT_ENV ?? "development"
} - ${openApiUrl}`;
console.log("Fetching OpenAPI spec", fetchBySource);

void (async () => {
  const basicAuth = btoa(
    `${apiCredentials.username}:${apiCredentials.password}`,
  );

  const response = await fetch(openApiUrl, {
    headers: {
      // basic auth headers
      Authorization: `Basic ${basicAuth}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching OpenAPI spec", error);
      process.exit(1);
    });

  writeFileSync(
    `${process.cwd()}/swagger/api-spec.json`,
    JSON.stringify(response),
  );

  console.log("OpenAPI spec fetched successfully");
})();
