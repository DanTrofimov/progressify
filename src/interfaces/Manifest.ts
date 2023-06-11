export interface Manifest {
    background_color?: string;
    description?: string;
    dir?: "auto" | "ltr" | "rtl" | string;
    display?: "standalone" | "fullscreen" | "fullscreen-sticky";
    lang?: string | undefined;
    name?: string | undefined;
    orientation?:
      | "any"
      | "natural"
      | "landscape"
      | "portrait"
      | "portrait-primary"
      | "portrait-secondary"
      | "landscape-primary"
      | "landscape-secondary";
    prefer_related_applications?: boolean;
    scope?: string;
    short_name?: string;
    start_url?: string;
    theme_color?: string;
    generated?: boolean;
    shortcuts?: ShortcutItem[];
    categories?: string[];
    iarc_rating_id?: string;
    iconBlobUrls?: string[];
    icons?: Icon[];
  
    // for custom properties as well as using object notations: manifest[key]
    // @ts-ignore - accomodate custom entries... these can be a pain
    [key: string]: string | boolean | undefined | Array<any> | any;
}

export interface ShortcutItem {
    name: string;
    url: string;
    description?: string;
    short_name?: string;
    icons?: Icon[];
}

export interface Icon {
  src: string;
  generated?: boolean;
  type?: string;
  sizes?: string;
  purpose?: "any" | "maskable" | "monochrome";
  label?: string;
}