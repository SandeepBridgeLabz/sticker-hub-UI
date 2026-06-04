import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from "./components/About.jsx";
import Contact, { contactAction } from "./components/Contact.jsx";
import Cart from "./components/Cart.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { productsLoader } from "./components/Home.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import { redirect } from "react-router-dom";
import ProductDetail from "./components/ProductDetail.jsx";
import { CartContext } from "./components/store/cart-context.jsx";
import { CartProvider } from "./components/store/cart-context.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import { AuthProvider } from "./components/store/auth-context.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile, { profileAction } from "./components/Profile.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";
import Orders from "./components/Orders.jsx";
import Register, { registerAction } from "./components/Register.jsx";

const routeDefinations = createRoutesFromElements(
  //this is used in real projects
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/Contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={productsLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => {
          return !actionResult?.success;
        }}
      />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/messages" element={<Messages />} />
    </Route>
  </Route>,
);
const appRouter = createBrowserRouter(routeDefinations);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={appRouter} />
      </CartProvider>
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={6000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>,
);
