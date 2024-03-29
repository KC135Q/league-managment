const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../../app");
const timesToTest = 10000;

const testData = Array(timesToTest)
  .fill(null)
  .map((_, index) => index + 1);

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Create New Member Tests", () => {
  test.each(testData)("POST test create new member", async (counter) => {
    const fakeData = {
      memberName: faker.person.fullName(),
      email: faker.internet.email(),
      notes: faker.lorem.text(),
      password: faker.internet.password(),
    };

    return request(app)
      .post("/api/v1/member")
      .send(fakeData)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
});
describe("Find Member by ID Tests", () => {
  const findMemberTest = async (counter) => {
    return request(app)
      .get(`/api/v1/member/${counter}`)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  };

  // Iterate through the tests from index 1 to 10000
  for (let i = 1; i <= timesToTest; i++) {
    test.each([i])("GET test find member by id - Index %d", findMemberTest);
  }
});
