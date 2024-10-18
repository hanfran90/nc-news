const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("Any url that does not have a route to the api", () => {
  test("GET 404: responds with an error code and message when a wrong request is made", () => {
    return request(app)
      .get("/not-a-url")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Route not found");
      });
  });
});

describe("/api", () => {
  test("GET: 200 - responds with an object detailing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/topics", () => {
  test("GET 200: responds with an array of topic objects with properties slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET 200: responds with the correct article object when requested by an id number and a comment count", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.article_id).toBe(3);
        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("author", expect.any(String));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty("article_img_url", expect.any(String));
        expect(article).toHaveProperty("body", expect.any(String));
        expect(article).toHaveProperty("comment_count", expect.any(String));
      });
  });
  test("GET 404: responds with an error when article_id is given the right type (ie number) but is not present in the database", () => {
    return request(app)
      .get("/api/articles/8324")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not Found!");
      });
  });
  test("GET 400: responds with an error when article_id is an invalid datatype", () => {
    return request(app)
      .get("/api/articles/not-a-number")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request!");
      });
  });
  test("PATCH 200: responds with an updated article vote", () => {
    return request(app)
      .patch("/api/articles/3")
      .expect(200)
      .send({ inc_votes: 1 })
      .then(({ body: { updatedArticle } }) => {
        expect(updatedArticle.article_id).toBe(3);
        expect(updatedArticle.title).toBe(
          "Eight pug gifs that remind me of mitch"
        );
        expect(updatedArticle.topic).toBe("mitch");
        expect(updatedArticle.author).toBe("icellusedkars");
        expect(updatedArticle.body).toBe("some gifs");
        expect(updatedArticle.created_at).toBe("2020-11-03T09:12:00.000Z");
        expect(updatedArticle.votes).toBe(1);
        expect(updatedArticle.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("PATCH 400: responds with an error when votes value does not equal a valid id type", () => {
    return request(app)
      .patch("/api/articles/3")
      .expect(400)
      .send({ inc_votes: "hello" })
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request!");
      });
  });
  test("PATCH 400: responds with an error when sending a request that does not contain a key or a value", () => {
    return request(app)
      .patch("/api/articles/3")
      .expect(400)
      .send({})
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request!");
      });
  });
  test("GET 200: responds with a comment_count when the article has comments", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toHaveProperty("comment_count");
        expect(typeof article.comment_count).toBe("string");
      });
  });
});

describe("/api/articles", () => {
  test("GET 200: responds with the all the articles when requested without a body property present", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13);
        articles.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
          expect(article).not.toHaveProperty("body");
        });
      });
  });
  test("GET 200: responds with articles sorted by created_at as default and descending as default", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("GET 200: responds with articles sorted in ascending order when order=asc", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at&order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: false });
      });
  });
  test("GET 200: responds with articles sorted in descending order when order=desc", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at&order=desc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("GET 200: responds with articles sorted by a given collumn name and descending as default", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("author", { descending: true });
      });
  });
  test("GET 400: responds with an error when sort_by is given a column that doesn't exist", () => {
    return request(app)
      .get("/api/articles?sort_by=non_existent")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request: Invalid sort_by!");
      });
  });
  test("GET 400: responds with an error when an order is invalid", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at&order=invalid_order")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request: Invalid order!");
      });
  });
  test("GET 200: responds with articles which have been filtered based on topic query", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body: { articles } }) => {
        articles.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
      });
  });
  test("GET 200: responds with an empty array when no articles match the topic query", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toEqual([]);
      });
  });
  test("GET 404: responds with an error when a topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=does_not_exist")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic doesn't exist!");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET 200: responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeInstanceOf(Array);
        expect(comments.length).toBeGreaterThan(0);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });
  test("GET 200: responds with an empty array when no comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/10/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("GET 400: responds with an error when article_id is an invalid datatype", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request!");
      });
  });
  test("GET 404: responds with an error when article_id is given the right type (ie number) but is not present in the database", () => {
    return request(app)
      .get("/api/articles/5678/comments")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not Found!");
      });
  });
  test("POST 201: adds a comment to the correct article_id with a username and body key", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "butter_bridge", body: "This is a great article" })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          author: "butter_bridge",
          body: "This is a great article",
          article_id: 2,
          votes: 0,
          comment_id: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
  test("POST 400: responds with an error if the article id is not valid", () => {
    return request(app)
      .post("/api/articles/not-a-number/comments")
      .send({ username: "butter_bridge", body: "This is a great article" })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad Request!" });
      });
  });
  test("POST 400: responds with an error if username or body is missing", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ body: "This is a great article" })
      .expect(400)
      .then(({ body }) => {
        expect(body).toMatchObject({
          msg: "Bad Request - missing username and/or body!",
        });
      });
  });
  test("POST 404: responds with an error if the article id is valid but does not exist", () => {
    return request(app)
      .post("/api/articles/5678/comments")
      .send({ username: "butter_bridge", body: "The article doesn't exist!" })
      .expect(404)
      .then(({ body }) => {
        expect(body).toMatchObject({ msg: "Not found - Article not found!" });
      });
  });
  test("POST 400: responds with an error if 'body' is not a string", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "butter_bridge", body: 5678 })
      .expect(400)
      .then(({ body }) => {
        expect(body).toMatchObject({
          msg: "Bad Request - 'body' must be a string!",
        });
      });
  });
  test("POST 404: responds with an error if the username does not exist", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "non-existant-user", body: "This is a great article" })
      .expect(404)
      .then(({ body }) => {
        expect(body).toMatchObject({ msg: "Not found - Username not found!" });
      });
  });
});

describe("/api/comments/:comment_id", () => {
  test("DELETE 204: responds with no content when given a valid comment id", () => {
    return request(app)
      .delete("/api/comments/7")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("DELETE 400: responds with an error when given an invalid comment id", () => {
    return request(app)
      .delete("/api/comments/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid comment ID!" });
      });
  });
  test("DELETE 404: responds with an error when a comment is not found", () => {
    return request(app)
      .delete("/api/comments/5678")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Comment not found!" });
      });
  });
});

describe("/api/users", () => {
  test("GET 200: responds with an array of users with properties username, name and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
