type LinkType = 'primary' | 'secondary';

export type LinkProps = {
  label: string;
  type?: LinkType;
  href?: string;
};
