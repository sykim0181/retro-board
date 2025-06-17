import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@/types/types";
import { getUser } from "@/utils/user";

type State = {
  user: TUser;
};

const initialState = (): State => {
  return {
    user: getUser(),
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<string>) => {
      const newUser: TUser = {
        ...state.user,
        name: action.payload,
      };
      state.user = newUser;
      localStorage.setItem("retro-user", JSON.stringify(newUser));
    },
  },
});

export const { updateUserName } = userSlice.actions;

export default userSlice;
