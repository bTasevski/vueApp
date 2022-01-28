export function handleFetchErrors(response: Response): Response {
  if (!response.ok) {
    alert(Error(response.statusText));
  }
  return response;
}
