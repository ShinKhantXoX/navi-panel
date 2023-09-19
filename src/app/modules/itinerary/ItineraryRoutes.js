import { CreateItinerary } from "./entry/CreateItinerary";
import { ItineraryDetail } from "./view/ItineraryDetail";
import { ItineraryList } from "./view/ItineraryList";


export const itineraryRoutes = [
    {
        path: "itinerary",
        children: [
            {
                path: "",
                element: <ItineraryList />
            },
            {
                path: "new",
                element: <CreateItinerary />
            },
            {
                path: ":id",
                element: <ItineraryDetail />
            }
        ],
    }
];