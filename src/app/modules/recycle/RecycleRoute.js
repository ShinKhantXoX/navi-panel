import RecycleList from "./view/RecycleBinList";
import RecycleMedia from "./view/RecycleBinMedia";
import RecycleQuery from "./view/RecycleBinQuery";




export const recycleRoute = [
    {
        path: "bin",
        children: [
            {
                path: "",
                element: <RecycleList />
            },
            {
                path : "media",
                element : <RecycleMedia />
            },
            {
                path : "query",
                element : <RecycleQuery />
            },
        ],
    }
];