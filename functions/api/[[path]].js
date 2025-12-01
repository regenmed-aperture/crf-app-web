export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = `https://demo-patient.incytesapp.co${url.pathname}${url.search}`;

  const request = new Request(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });

  return fetch(request);
}
