export const usersCred = {
  admin: {
    id: 0,
    role: "Admin",
    username: "sohelislam993@gmail.com",
    password: "TECHSTAR",
  },
  users: [
    {
      id: 1,
      role: "User",
      username: "HReddy701@gmail.com",
      password: "HReddy701",
    },
    {
      id: 2,
      role: "User",
      username: "Venkat@gmail.com",
      password: "Venkat",
    },
    {
      id: 3,
      role: "User",
      username: "user1@gmail.com",
      password: "user1",
    },
    {
      id: 4,
      role: "User",
      username: "user2@gmail.com",
      password: "user2",
    },
  ],
};

function updateUser(usersCred, id, updateData) {
  const userIndex = usersCred.users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return "User doesn't exist";
  }

  usersCred.users[userIndex] = {
    ...usersCred.users[userIndex],
    username: updateData.username,
    role: updateData.role,
    password: updateData.password,
  };

  return usersCred;
}
