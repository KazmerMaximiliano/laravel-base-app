export const isActiveRoute = ({ url, route }: { url: string, route: string }): boolean => {
  const urlWithoutQuery = url.split("?")[0];
  const urlWithoutSlash = urlWithoutQuery.split("/")[1];
  const routeWithoutSlash = route.split("/")[1];

  return urlWithoutSlash === routeWithoutSlash;
};
