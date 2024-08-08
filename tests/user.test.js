const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Zoro",
      email: "Power@example.com",
      password: "powerisMIne!",
    })
    .expect(201);

  // Assert that the database was changed correctly

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assert about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Zoro",
      email: "power@example.com",
    },
    token: user.tokens[0].token,
  });

  // Assert that the stored password is not the plain one
  expect(user.password).not.toBe("powerisMIne!");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Assert some challenge
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login with bad credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "naruto@example.com",
      password: "IhaveAcatFace",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert that user is deleted
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should not delete for authenticated user ", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload user with avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Luffy Kun",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Luffy Kun");
});

test("should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      petName: "nami san",
    })
    .expect(400);
});
