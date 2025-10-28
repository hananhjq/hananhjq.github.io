export type ProfileLinks = {
  linkedin: string;
  github: string;
  x: string;
  instagram: string;
  blog?: string;
  docs?: string;
  calendar?: string;
  wikiProjectUrl?: string;
};

export type Profile = {
  name: string;
  email: string;
  images: {
    avatar: string;
  };
  links: ProfileLinks;
};

export const profile: Profile = {
  name: "Hanan Javid",
  email: "hanan.qureshi.hjq@gmail.com",
  images: {
    avatar: "https://drive.google.com/uc?id=1V5j6dMWAoamoy8527hVVWtDa-0IUyT5M",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/hananhjq",
    github: "#",
    x: "#",
    instagram: "#",
    blog: undefined,
    docs: undefined,
    calendar: undefined,
    wikiProjectUrl: undefined,
  },
};
