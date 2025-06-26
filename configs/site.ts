export const siteConfig = {
  name: "Incredible India",
  logo: "/inner_logo.png",
  url: "https://ui.shadcn.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
  navLinks: [
    {
      label: "Destinations",
      url: "/destinations",
      children: [
        {
          label: "North India",
          url: "/north-india",
          children: [
            {
              label: "Chandigarh",
              url: "/tours?state=chandigarh",
            },
            {
              label: "Delhi",
              url: "/tours?state=delhi",
            },
            {
              label: "Haryana",
              url: "/tours?state=haryana",
            },
          ],
        },
        {
          label: "North East India",
          url: "/northeast-india",
          children: [
            {
              label: "Arunachal Pradesh",
              url: "/tours?state=ap",
            },
            {
              label: "Assam",
              url: "/tours?state=assam",
            },
            {
              label: "Manipur",
              url: "/tours?state=manipur",
            },
          ],
        },
        {
          label: "East India",
          url: "/tours?state=east-india",
          children: [
            {
              label: "Andaman Nicobar Islands",
              url: "/tours?state=andaman",
            },
            {
              label: "Bihar",
              url: "/tours?state=bihar",
            },
            {
              label: "Jharkhand",
              url: "/tours?state=jharkhand",
            },
          ],
        },
        {
          label: "Central India",
          url: "/central-india",
          children: [
            {
              label: "Chattisgarh",
              url: "/tours?state=chattisgarh",
            },
            {
              label: "Madhya Pradesh",
              url: "/tours?state=mp",
            },
          ],
        },
        {
          label: "West India",
          url: "/west-india",
          children: [
            {
              label: "Dadra and Nagar Haveli",
              url: "/tours?state=dadra",
            },
            {
              label: "Goa",
              url: "/tours?state=goa",
            },
            {
              label: "Gujarat",
              url: "/tours?state=gujarat",
            },
            {
              label: "Maharashtra",
              url: "/tours?state=maharashtra",
            },
          ],
        },
        {
          label: "South India",
          url: "/south-india",
          children: [
            {
              label: "Andhra Pradesh",
              url: "/tours?state=andhra",
            },
            {
              label: "Karnataka",
              url: "/tours?state=karnataka",
            },
            {
              label: "Kerala",
              url: "/tours?state=kerala",
            },
            {
              label: "Lakshadweep",
              url: "/tours?state=lakshadweep",
            },
          ],
        },
      ],
    },
    {
      label: "Holiday Ideas",
      url: "/holiday-ideas",
    },
    {
      label: "Packages",
      url: "/packages",
    },
    {
      label: "Places to stay",
      url: "/places-to-stay",
    },
    {
      label: "Weekend Gateways",
      url: "/weekend-gateways",
    },
    {
      label: "Destination Weddings",
      url: "/weddings",
    },
  ],
  footerMenu: [
    {
      label: "Company",
      children: [
        { label: "About", href: "/about" },
        { label: "Career", href: "/career" },
        { label: "Reviews", href: "/reviews" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      label: "Property Type",
      children: [
        { label: "Hostels in India", href: "/hostels-india" },
        { label: "Beach Resorts", href: "/beach-resorts" },
        { label: "Wildlife", href: "/wildlife" },
        { label: "Heritage", href: "/heritage" },
        { label: "Luxury", href: "/luxury" },
      ],
    },
    {
      label: "Legal Policy",
      children: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Share Your Travel Experience", href: "/share" },
      ],
    },
    {
      label: "Other Services",
      children: [
        { label: "Destination Weddings", href: "/weddings" },
        { label: "MICE", href: "/mice" },
        { label: "Medical Tourism", href: "/medical" },
      ],
    },
  ],
};
export type SiteConfig = typeof siteConfig;
