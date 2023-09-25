import { 
  IconUser,
  IconAirBalloon,
  IconArticle,
  IconAppWindow,
  IconBleach,
  IconBrandVisa,
  IconPhotoPlus
 } from "@tabler/icons-react";

export const navList = [
      { icon: <IconUser />, label: "User", url: '/user',  children : []},
      { icon: <IconAirBalloon />, label: "Type", url: '/type',  children : []},
      { icon: <IconArticle />, label: "Package", url: '/package',  children : []},
      { icon: <IconAppWindow />, label: "Tour", url: '/tour',  children : []},
      { icon: <IconBleach />, label: "Itinerary", url: '/itinerary',  children : []},
      { icon: <IconBrandVisa />, label: "Visa", url: '/visa',  children : []},
      { icon: <IconPhotoPlus />, label: "Media", url: '/media',  children : []},
    // { icon: <IconBrandGooglePodcasts />, label: "Attendance", url: '/attendance',  children : [
    //   { icon: <IconUserCircle />, label: "Profile", url: '/attendance/profile',  children : []},
    //   { icon: <IconDeviceMobileMessage />, label: "Leave", url: '/attendance/leave',  children : []},
    // ]},
]