export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeAll(str: string): string {
  return str.split(' ').map(capitalize).join(' ');
}

export function removeDashes(str: string): string {
  return str.replace(/-/g, ' ');
}

export function removeHTMLTags(text: string) {
  const regex = /(<([^>]+)>)/ig;
  return text?.replace(regex, '') || '';
}


