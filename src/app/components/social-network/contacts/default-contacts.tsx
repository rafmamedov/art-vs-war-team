import { Facebook, Instagram, Whatsapp } from "@/app/icons/social-icons";

export const defaultContacts = {
  instagram: "https://www.instagram.com/",
  facebook: "https://facebook.com",
  whatsapp: "https://www.whatsapp.com/",
};

export const iconContacts = [
  {
    title: "Facebook",
    link: defaultContacts.facebook,
    icon: <Facebook />,
  },
  {
    title: "Instagram",
    link: defaultContacts.instagram,
    icon: <Instagram />,
  },
  {
    title: "Whatsapp",
    link: defaultContacts.whatsapp,
    icon: <Whatsapp />,
  },
];
