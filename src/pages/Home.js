<<<<<<< HEAD
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
=======
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
>>>>>>> 2ee11490ba05c9199d7296691319d7cc0b8ae237
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LeftHeader from "../components/Left Bar/LeftHeader";
import MessageInbox from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import NoChat from "../components/Right Bar/Chat/NoChat";
import RightHeader from "../components/Right Bar/RightHeader";
import Users from "../components/Left Bar/Users/Users";
import Login from "../components/Right Bar/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { authInfo, fetchUsersFromDB } from "../redux/userSlice";
import { authFBConfig, database } from "../config/config";
import Signup from "../components/Right Bar/Auth/Signup";
import { get, ref } from "firebase/database";
import UserInfo from "../components/Right Bar/Chat/UserInfo";
<<<<<<< HEAD
const Home = () => {
  const dispatch = useDispatch();
  const [toggleMessageUserBar, setToggleMessageUserBar] = useState(false);
  const loginMode = useSelector((state) => state.userStore.loginMode);
  const toggleLoginOrSignup = useSelector(
    (state) => state.userStore.toggleLoginOrSignup
  );
  const openChatMode = useSelector((state) => state.messageStore.chatMode);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false);
  const auth = authFBConfig;
  const authInfoPayload = {
    app: {
      name: auth.app.name,
    },
    currentUser: auth.currentUser,
  };
  useEffect(() => {
    dispatch(authInfo(authInfoPayload));
  }, []);
  const token = useSelector((state) => state.userStore.token);
  useEffect(() => {}, [token]);
  const users = useSelector((state) => state.userStore.users);
  const getUsers = async () => {
    const usersRef = ref(database, "users");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersArray = Object.values(usersData);
          dispatch(fetchUsersFromDB(usersArray));
        } else {
          console.log("Kullanıcı verileri bulunamadı.");
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  //console.log(loginMode);
  return _jsxs("div", {
    children: [
      _jsxs("header", {
        className: "grid grid-cols-12",
        children: [
          _jsx(LeftHeader, {
            setToggleMessageUserBar: setToggleMessageUserBar,
            // @ts-ignore
            setUserSettingsModalOpen: setUserSettingsModalOpen,
          }),
          openChatMode &&
            token &&
            _jsx(RightHeader, {
              setUserInfoModalOpen: setUserInfoModalOpen,
              users: users,
            }),
        ],
      }),
      _jsxs("section", {
        className: "grid grid-cols-12",
        children: [
          _jsxs("div", {
            className: "col-span-4",
            children: [
              token && _jsx(SearchInput, {}),
              toggleMessageUserBar && token
                ? _jsx(_Fragment, {
                    children: _jsx(MessageInbox, { users: users }),
                  })
                : token
                ? // @ts-ignore
                  _jsx(Users, { users: users })
                : _jsx("span", {}),
            ],
          }),
          _jsxs("div", {
            className: "col-span-8",
            children: [
              !loginMode && !token
                ? toggleLoginOrSignup
                  ? _jsx(Login, {})
                  : _jsx(Signup, {})
                : openChatMode && !loginMode
                ? _jsx(Chat, {})
                : _jsx(NoChat, {}),
              _jsx(UserInfo, {
                setUserInfoModalOpen: setUserInfoModalOpen,
                userInfoModalOpen: userInfoModalOpen,
                users: users,
              }),
              _jsx(UserSettings, {
                setUserSettingsModalOpen: setUserSettingsModalOpen,
                userSettingsModalOpen: userSettingsModalOpen,
                // @ts-ignore
                users: users,
              }),
            ],
          }),
        ],
      }),
    ],
  });
=======
import UserSettings from "../components/Left Bar/Users/UserSettings";
const Home = () => {
    const dispatch = useDispatch();
    const [toggleMessageUserBar, setToggleMessageUserBar] = useState(false);
    const loginMode = useSelector((state) => state.userStore.loginMode);
    const toggleLoginOrSignup = useSelector((state) => state.userStore.toggleLoginOrSignup);
    const openChatMode = useSelector((state) => state.messageStore.chatMode);
    const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
    const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false);
    const auth = authFBConfig;
    const authInfoPayload = {
        app: {
            name: auth.app.name,
        },
        currentUser: auth.currentUser,
    };
    useEffect(() => {
        dispatch(authInfo(authInfoPayload));
    }, []);
    const token = useSelector((state) => state.userStore.token);
    useEffect(() => { }, [token]);
    const users = useSelector((state) => state.userStore.users);
    const getUsers = async () => {
        const usersRef = ref(database, "users");
        get(usersRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const usersArray = Object.values(usersData);
                dispatch(fetchUsersFromDB(usersArray));
            }
            else {
                console.log("Kullanıcı verileri bulunamadı.");
            }
        })
            .catch((error) => {
            console.error("Veri çekme hatası:", error);
        });
    };
    useEffect(() => {
        getUsers();
    }, []);
    //console.log(loginMode);
    return (_jsxs("div", { children: [_jsxs("header", { className: "grid grid-cols-12", children: [_jsx(LeftHeader, { setToggleMessageUserBar: setToggleMessageUserBar, 
                        // @ts-ignore
                        setUserSettingsModalOpen: setUserSettingsModalOpen }), openChatMode && token && (_jsx(RightHeader, { setUserInfoModalOpen: setUserInfoModalOpen, users: users }))] }), _jsxs("section", { className: "grid grid-cols-12", children: [_jsxs("div", { className: "col-span-4", children: [token && _jsx(SearchInput, {}), toggleMessageUserBar && token ? (_jsx(_Fragment, { children: _jsx(MessageInbox, { users: users }) })) : token ? (
                            // @ts-ignore
                            _jsx(Users, { users: users })) : (_jsx("span", {}))] }), _jsxs("div", { className: "col-span-8", children: [!loginMode && !token ? (toggleLoginOrSignup ? (_jsx(Login, {})) : (_jsx(Signup, {}))) : openChatMode && !loginMode ? (_jsx(Chat, {})) : (_jsx(NoChat, {})), _jsx(UserInfo, { setUserInfoModalOpen: setUserInfoModalOpen, userInfoModalOpen: userInfoModalOpen, users: users }), _jsx(UserSettings, { setUserSettingsModalOpen: setUserSettingsModalOpen, userSettingsModalOpen: userSettingsModalOpen, 
                                // @ts-ignore
                                users: users })] })] })] }));
>>>>>>> 2ee11490ba05c9199d7296691319d7cc0b8ae237
};
export default Home;
