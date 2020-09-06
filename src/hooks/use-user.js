/* eslint react-hooks/exhaustive-deps: 0 */
// Libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";

// Utilities
import { setUser, loginUser, logoutUser } from "components/app/actions";
import { firebase } from "../firebase";

export default (checkSignIn = false) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setUser, loginUser, logoutUser },
    dispatch
  );
  const user = useSelector((state) =>
    isEmpty(state.data.user) ? null : state.data.user
  );

  useEffect(() => {
    if (checkSignIn) {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          actions.setUser(authUser);
        }
      });
    }
  }, []);

  return { user, ...actions };
};
