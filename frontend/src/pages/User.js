import React, { useEffect, useState, useCallback } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { useAuthStore } from "../stores/authStore";
import { getById } from "../services/genericService";
import { updateById } from "../services/genericService";

const User = () => {
  const { token } = useAuthStore();
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);

  const getUser = useCallback(async () => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const user = await getById("user", payload.id, token);
    console.log(user);
    setUser(user);
  }, [token]);

  const [userDatas, setUserDatas] = useState({
    username: "",
    first_name: "",
    last_name: "",
    message: "",
  });

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (user) {
      setUserDatas({
        ...userDatas,
        ...Object.keys(userDatas).reduce((acc, key) => {
          if (user[key] !== undefined) {
            acc[key] = user[key];
          }
          return acc;
        }, {}),
      });
    }
  }, [user]);

  function replaceUnderscore(str) {
    return str.replace("_", " ");
  }

  const handleConfirmChanges = () => {
    const newDatas = { ...user, ...userDatas };
    updateById("user", user.id, newDatas, token);
    console.log(newDatas);
  };

  return (
    <div className="bg-mywhite flex min-h-screen items-center justify-center">
      <div className="bg-myviolet flex h-[700px] w-[400px] md:h-[720px] md:w-[500px] justify-center overflow-hidden rounded-3xl border-4 border-black">
        {user == null ? (
          "Loading . . ."
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-10 p-5">
            <h1 className="font-minerva text-8xl">Profil</h1>
            {Object.keys(userDatas || {}).map((key) => (
              <div className="relative flex w-full gap-6 text-xl md:text-2xl" key={key}>
                <strong className="bg-mygreen w-2/5 border-2 border-black p-1 text-center capitalize">
                  {replaceUnderscore(key)}
                </strong>
                <input
                  className={` ${editMode ? "bg-white" : "bg-inherit"} px-2`}
                  type="text"
                  value={userDatas[key] || ""}
                  placeholder={userDatas[key]}
                  onChange={(e) =>
                    setUserDatas({ ...userDatas, [key]: e.target.value })
                  }
                  disabled={editMode ? false : true}
                />
              </div>
            ))}
            <div className="flex justify-center gap-6">
              <div
                className="bg-myyellow small-neobrutalism small-neobrutalism-hover hover:bg-mywhite max-w-fit cursor-pointer px-3 py-2"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                Modifier
              </div>
              <div
                className={`${!editMode ? "hidden" : ""} bg-mygreen small-neobrutalism small-neobrutalism-hover max-w-fit cursor-pointer px-3 py-2`}
                onClick={() => {
                  handleConfirmChanges();
                }}
              >
                Confirmer
              </div>
              <div
                className={`${!editMode ? "hidden" : ""} bg-myred small-neobrutalism small-neobrutalism-hover max-w-fit cursor-pointer px-3 py-2`}
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                Annuler
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
