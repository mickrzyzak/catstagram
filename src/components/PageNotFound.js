import Alert from "./Alert";
import NavLink from "./NavLink";

function PageNotFound() {
  return (
    <Alert
      status="error"
      title="Page Not Found"
      description={<NavLink to="/">Click here to back to home page</NavLink>}
    />
  );
}

export default PageNotFound;
