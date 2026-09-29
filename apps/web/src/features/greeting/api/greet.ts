export class GreetingRequestError extends Error {
  readonly code: string;

  constructor(code: string, options?: ErrorOptions) {
    super(code, options);
    this.name = "GreetingRequestError";
    this.code = code;
  }
}

export async function requestGreeting(
  name: string,
  baseUrl = "",
): Promise<{ name: string }> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/greetings`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    throw new GreetingRequestError("UNEXPECTED", { cause: error });
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    throw new GreetingRequestError("UNEXPECTED", { cause: error });
  }

  if (!response.ok) {
    throw new GreetingRequestError(readCode(body));
  }

  if (!isGreeting(body)) {
    throw new GreetingRequestError("UNEXPECTED");
  }

  return { name: body.name };
}

function readCode(body: unknown): string {
  if (
    typeof body === "object" &&
    body !== null &&
    "code" in body &&
    typeof body.code === "string"
  ) {
    return body.code;
  }
  return "UNEXPECTED";
}

function isGreeting(body: unknown): body is { name: string } {
  return (
    typeof body === "object" &&
    body !== null &&
    "name" in body &&
    typeof body.name === "string"
  );
}
