type LinkType = 'primary' | 'secondary';

export type LinkProps = {
  type?: LinkType;
  href?: string;
  label: string;
};
