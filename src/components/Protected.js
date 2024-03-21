import { Navigate } from "react-router-dom";
const Protected = ({children }) => {
  if (!localStorage.getItem("user") || !localStorage.getItem("token")) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
export default Protected;