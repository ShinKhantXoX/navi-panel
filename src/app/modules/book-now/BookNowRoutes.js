import BookNowDetail from "./view/BookNowDetail";
import { BookNowList } from "./view/BookNowList";

export const bookNowRoutes = [
    {
        path: "book-now",
        children: [
            {
                path: "",
                element: <BookNowList />
            },
            {
                path: "media/",
                element: <BookNowDetail />
            }
        ],
    }
];