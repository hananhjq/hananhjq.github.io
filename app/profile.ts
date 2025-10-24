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
  // Defaults left as-is until Hanan's details are provided
  name: "Charan Ravi",
  email: "contact@charanravi.com",
  images: {
    avatar: "/charan.jpg",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/r-charan/",
    github: "https://github.com/charanravi-online",
    x: "https://x.com/charanjson",
    instagram: "https://instagram.com/charan.json",
    blog: "https://blog.charanravi.com",
    docs: "https://docs.charanravi.com",
    calendar: "https://cal.com/charanravi",
    wikiProjectUrl: "https://charanravi-online.github.io/wiki-project",
  },
};


