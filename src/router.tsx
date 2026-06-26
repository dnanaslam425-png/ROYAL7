import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Route =
  | { name: "home" }
  | { name: "products"; categoryId?: string }
  | { name: "agents"; governorateId?: string }
  | { name: "about" }
  | { name: "contact" }
  | { name: "admin-login" }
  | { name: "admin-dashboard" };

type Ctx = {
  route: Route;
  navigate: (r: Route) => void;
};

const RouterCtx = createContext<Ctx>({
  route: { name: "home" },
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash.startsWith("products")) {
      const parts = hash.split("/");
      return { name: "products", categoryId: parts[1] };
    }
    if (hash.startsWith("agents")) {
      const parts = hash.split("/");
      return { name: "agents", governorateId: parts[1] };
    }
    if (hash === "about") return { name: "about" };
    if (hash === "contact") return { name: "contact" };
    if (hash.startsWith("admin")) {
      return hash === "admin" ? { name: "admin-login" } : { name: "admin-dashboard" };
    }
    return { name: "home" };
  });

  const navigate = (r: Route) => {
    let hash = "";
    if (r.name === "home") hash = "";
    else if (r.name === "products")
      hash = r.categoryId ? `products/${r.categoryId}` : "products";
    else if (r.name === "agents")
      hash = r.governorateId ? `agents/${r.governorateId}` : "agents";
    else if (r.name === "about") hash = "about";
    else if (r.name === "contact") hash = "contact";
    else if (r.name === "admin-login") hash = "admin";
    else if (r.name === "admin-dashboard") hash = "admin/dashboard";
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash.startsWith("products")) {
        const parts = hash.split("/");
        setRoute({ name: "products", categoryId: parts[1] });
      } else if (hash.startsWith("agents")) {
        const parts = hash.split("/");
        setRoute({ name: "agents", governorateId: parts[1] });
      } else if (hash === "about") setRoute({ name: "about" });
      else if (hash === "contact") setRoute({ name: "contact" });
      else if (hash === "admin") setRoute({ name: "admin-login" });
      else if (hash === "admin/dashboard") setRoute({ name: "admin-dashboard" });
      else setRoute({ name: "home" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <RouterCtx.Provider value={{ route, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
}

export function useRouter() {
  return useContext(RouterCtx);
}

export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: Route;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { navigate } = useRouter();
  let hash = "";
  if (to.name === "home") hash = "";
  else if (to.name === "products")
    hash = to.categoryId ? `products/${to.categoryId}` : "products";
  else if (to.name === "agents")
    hash = to.governorateId ? `agents/${to.governorateId}` : "agents";
  else if (to.name === "about") hash = "about";
  else if (to.name === "contact") hash = "contact";
  else if (to.name === "admin-login") hash = "admin";
  else if (to.name === "admin-dashboard") hash = "admin/dashboard";

  return (
    <a
      href={"#" + hash}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}