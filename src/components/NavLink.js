import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

function NavLink({ children, to, ...props }) {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      _hover={{ textDecoration: "none" }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
}

export default NavLink;
