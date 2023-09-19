import { CreateVisa } from "./entry/CreateVisa";
import { VisaDetail } from "./view/VisaDetail";
import { VisaList } from "./view/VisaList";


export const visaRoutes = [
    {
        path: "visa",
        children: [
            {
                path: "",
                element: <VisaList />
            },
            {
                path: "new",
                element: <CreateVisa />
            },
            {
                path: ":id",
                element: <VisaDetail />
            }
        ],
    }
];