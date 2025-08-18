// import React from 'react';

// const PrivateRouter = ({children}) => {
// const { user,loading } = use(AuthContext);

//   const location = useLocation();

//   if (loading) {
//     return <Loading></Loading>;
//   }

//   if (user && user?.email) {
//     return children;
//   }
//   return <Navigate state={location.pathname}  to="/login"></Navigate>;
// };
// export default PrivateRouter;