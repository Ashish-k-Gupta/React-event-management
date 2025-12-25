import {
    createRootRoute,
    createRoute,
    Outlet,
    Router,
    redirect
} from "@tanstack/react-router";
import EventList from "./features/events/pages/EventList";
import EventDetail from "./features/events/pages/EventDetail";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import Header from "./components/Header";
import App from "./App";
import { BookTicketDetail } from "./components/bookTicketDetail";
import { ShowSlotDetails } from "./components/showSlotDetails";
// import { TicketCard } from "./cards/TicketCard";

// Define the auth context type
export interface AuthContext {
    isAuthenticated: boolean;
}

// Declare the module augmentation before using it
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootRoute = createRootRoute({
    component: () => <Outlet />,
})

const appLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "app-layout",
    component: () => (
        <div className="h-full flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-hidden">
            <Outlet />
            </main>
            {/* <RandomImageGallery /> */}
        </div>
    )
})

const authLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "auth-layout",
    component: () => (
        <div>
            <Outlet />
        </div>
    )
})

const protectedRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    id: "protected",
    component: () => <Outlet />,
    beforeLoad: async () => {
        // Handle SSR case
        if (typeof window === 'undefined') {
            throw redirect({ to: "/login" });
        }

        const isAuthenticated = !!localStorage.getItem("token");
        if (!isAuthenticated) {
            throw redirect({ to: "/login" });
        }
    },
});

const homeRoute = createRoute({
    getParentRoute: () => appLayoutRoute,
    path: "/",
    component: () => (
        <div>
            <App />
        </div>
    )
})

const signupRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: "/signup",
    component: Signup
})

const loginRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: "/login",
    component: Login
})

const eventsRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: "/events",
    component: EventList,
})

export const eventDetailRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: "/events/$eventId",
    component: EventDetail
})

export const bookTicketRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: '/events/$eventId/buy-page',
    component: BookTicketDetail
})

export const showSlotDetailsRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: '/events/$eventId/buy-page/$slotId',
    component: ShowSlotDetails
})

const routeTree = rootRoute.addChildren([
    appLayoutRoute.addChildren([
        homeRoute,
        protectedRoute.addChildren([eventsRoute, eventDetailRoute, bookTicketRoute, showSlotDetailsRoute])
    ]),
    authLayoutRoute.addChildren([loginRoute, signupRoute]),
])

export const router = new Router({
    routeTree,
});