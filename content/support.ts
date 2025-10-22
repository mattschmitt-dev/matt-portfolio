import { SiBuymeacoffee } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import { SupportMe } from "@lib/types";

const supportOptions: SupportMe[] = [
  {
    name: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/",
    Icon: SiBuymeacoffee,
  },
  {
    name: "PayPal",
    url: "https://paypal.me/",
    Icon: BsPaypal,
  },
];

export default supportOptions;
