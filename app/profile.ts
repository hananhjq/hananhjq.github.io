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
  name: "HananQureshi",
  email: "hanan.qureshi.hjq@gmail.com",
  images: {
    avatar: "/assets/img/hanan-javid-profile-avatar.jpg.jpg",
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
