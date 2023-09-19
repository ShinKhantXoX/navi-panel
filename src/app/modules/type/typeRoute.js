import { CreateType } from "./entry/CreateType";
import { TypeDetail } from "./view/TypeDetail";
import { TypeList } from "./view/TypeList";


export const typeRoutes = [
    {
        path: "type",
        children: [
            {
                path: "",
                element: <TypeList />
            },
            {
                path: "new",
                element: <CreateType />
            },
            {
                path: ":id",
                element: <TypeDetail />
            }
        ],
    }
];