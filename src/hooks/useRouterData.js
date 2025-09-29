import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import {
  faCartFlatbed,
  faClipboardCheck,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const useRouterData = () => {
  const List = [
    {
      name: "News",
      icon: faList,
      path: "/news",
    },
    {
      name: "Events",
      icon: faCartFlatbed,
      path: "/events",
    },
  ];

  const Committee = [
    {
      name: "Committee Year",
      icon: faClipboardCheck,
      path: "/committee-year",
    },
    {
      name: "Committee List",
      icon: faHandshake,
      path: "/committee",
    },
  ];

  return { List, Committee };
};

export default useRouterData;
