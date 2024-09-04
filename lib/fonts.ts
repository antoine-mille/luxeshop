import localFont from "next/font/local"

export const sfProDisplay = localFont({
  src: [
    {
      path: "../public/fonts/sf-pro-display-black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
})
