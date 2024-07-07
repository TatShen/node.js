const chai = require("chai");
const supertest = require("supertest");
const app = require("./app");

const expect = chai.expect;
const request = supertest(app);

describe("POST /register", () => {
  it("должен регистрировать нового пользователя и возвращать сообщение", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const response = await request.post("/register").send(userData);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal(
      "Пользователь успешно зарегистрирован!"
    );
  });

  it("должен возвращать ошибку при неполных данных", async () => {
    const userData = {
      email: "testuser@gmail.com",
    };

    const response = await request.post("/register").send(userData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Введите email и пароль");
  });
});

describe("POST /login", () => {
  it("должен входить пользователя и возвращать токен", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    await request.post("/register").send(userData);

    const response = await request.post("/login").send(userData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Login successful");
  });

  it("должен возвращать ошибку при неверных учетных данных", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const response = await request.post("/login").send(userData);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Неверный email или пароль");
  });
});

describe("GET /todos", () => {
  it("должен возвращать список тасок авторизованного пользователя", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const response = await request
      .get("/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body.title).to.equal(todoData.title);
    expect(response.body.description).to.equal(todoData.description);
  });

  it("должен возвращать ошибку если пользователь не авторизован", async () => {
    const response = await request.get("/todos").send(todoData);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Пользователь не авторизован");
  });
});

describe("POST /todos", () => {
  it("должен создавать новую задачу ", async () => {
    const todoData = {
      title: "Новая задача",
      isCompleted: "Статус задачи",
    };

    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const response = await request
      .post("/todos")
      .set(("Authorization", `Bearer ${token}`))
      .send(todoData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Задача добавлена!");
  });

  it("должен возвращать ошибку при неполных данных", async () => {
    const todoData = {
      title: "Новая задача",
    };

    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const response = await request
      .post("/todos")
      .set(("Authorization", `Bearer ${token}`))
      .send(todoData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Введите статус задачи");
  });

  it("должен возвращать ошибку если пользователь не авторизован", async () => {
    const response = await request.post("/todos").send(todoData);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Пользователь не авторизован");
  });
});

describe("PATCH /todos/:id", () => {
  it("должен обновлять задачу", async () => {
    const todoData = {
      title: "Новая задача",
      isCompleted: "Статус задачи",
    };

    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const createResponse = await request
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Старая задача", isCompleted: false });
    const createdTodo = createResponse.body;

    const response = await request
      .patch(`/todos/${createdTodo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(todoData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Задача обнавлена!");
  });

  it("должен возвращать ошибку при неполных данных", async () => {
    const todoData = {
      title: "Новая задача",
      isCompleted: "Статус задачи",
    };

    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const createResponse = await request
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Старая задача", isCompleted: false });
    const createdTodo = createResponse.body;

    const response = await request
      .patch(`/todos/${createdTodo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(todoData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Введите статус задачи");
  });

  it("должен возвращать ошибку если задача с id не найдена ", async () => {
    const todoData = {
      title: "Новая задача",
    };

    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const response = await request
      .patch("/todos/0")
      .set(("Authorization", `Bearer ${token}`))
      .send(todoData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Задача не найдена!");
  });
});

describe("PATCH /todos/:id/isCompleted", () => {
  it("должен обновлять статус задачи", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const createResponse = await request
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Старая задача", isCompleted: false });
    const createdTodo = createResponse.body;

    const response = await request
      .patch(`/todos/${createdTodo.id}/isCompleted`)
      .set("Authorization", `Bearer ${token}`)
      .send(todoData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Задача обнавлена!");
  });

  it("должен возвращать ошибку если задача с id не найдена ", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const response = await request
      .patch("/todos/0/isCompleted")
      .set(("Authorization", `Bearer ${token}`))
      .send(todoData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Задача не найдена!");
  });

  it("должен возвращать ошибку если пользователь не авторизован ", async () => {
    const createResponse = await request
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Старая задача", isCompleted: false });
    const createdTodo = createResponse.body;

    const response = await request
      .patch(`/todos/${createdTodo.id}/isCompleted`)
      .set("Authorization", `Bearer ${token}`)
      .send(todoData);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Пользователь не авторизован");
  });
});


describe("DELETE /todos/:id", () => {
  it("должен удалять задачу", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const createResponse = await request
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Старая задача", isCompleted: false });
    const createdTodo = createResponse.body;

    const response = await request
      .delete(`/todos/${createdTodo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(todoData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Задача удалена!");
  });

  it("должен возвращать ошибку если задача с id не найдена ", async () => {
    const userData = {
      email: "testuser@gmail.com",
      password: "testpassword",
    };

    const token = JSON.parse(
      await request.post("/login").send(userData)
    ).access_token;

    const response = await request
      .delete("/todos/0")
      .set(("Authorization", `Bearer ${token}`))
      .send(todoData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Задача не найдена!");
  });

  it("должен возвращать ошибку если пользователь не авторизован ", async () => {
    const createResponse = await request
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Старая задача", isCompleted: false });
    const createdTodo = createResponse.body;

    const response = await request
      .delete(`/todos/${createdTodo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(todoData);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Пользователь не авторизован");
  });
});