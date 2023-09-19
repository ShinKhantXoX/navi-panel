import {
    IconCircle,
    IconUserShield,
    IconChecklist,
    IconCalendarTime,
    IconMessage2Share
} from "@tabler/icons-react"

export const adminList = [
    { icon: <IconUserShield />, label: "User", url: null,  children: [
        { icon: <IconCircle />, label: "List", url: '/user' }
    ]},
    { icon: <IconChecklist />, label: "Attendance", url: null,  children: [
        { icon: <IconCircle />, label: "List", url: '/daily' }
    ]},
    { icon: <IconCalendarTime />, label: "Monthly", url: null,  children: [
        { icon: <IconCircle />, label: "List", url: '/monthly' }
    ]},
    { icon: <IconMessage2Share />, label: "Request Leave", url: null,  children: [
        { icon: <IconCircle />, label: "List", url: '/request' }
    ]},
]