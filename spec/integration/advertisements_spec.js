const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Post;

describe("routes : posts", () => {

  beforeEach((done) => {
    this.topic;
    this.post;

    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /topics/:topicId/posts/new", () => {
    it("should render a new post form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });
  });

  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
        form: {
          title: "Wildfire Advert",
          description: "Smokey the Bear is here to teach you about wildfires."
        }
      };

      it("should create a new advertisement and redirect", (done) => {
        request.post(options,
          (err, res, body) => {
            Advertisement.findOne({where: {title: "Wildfire Advert"}})
            .then((advertisement) => {
              console.log(JSON.stringify(advertisement));
              expect(res.statusCode).toBe(303);

              expect(advertisement.title).toBe("Wildfire Advert");
              expect(advertisement.description).toBe("Smokey the Bear is here to teach you about wildfires.");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

  describe("GET /advertisements/:id", () => {
     it("should render a view with the selected advertisement", (done) => {
       request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Test advertisements");
         done();
       });
     });
    });

    describe("POST /advertisements/:id/destroy", () => {
     it("should delete the advertisement with the associated ID", (done) => {
       Advertisement.all()
       .then((advertisements) => {
         const advertisementCountBeforeDelete = advertisements.length;
         expect(advertisementCountBeforeDelete).toBe(1);
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.all()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
             done();
           })
         });
       });
     });
    });

    describe("GET /advertisements/:id/edit", () => {
     it("should render a view with an edit advertisement form", (done) => {
       request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Advertisement");
         expect(body).toContain("Test advertisements");
         done();
       });
     });
    });

    describe("POST /advertisements/:id/update", () => {
     it("should update the advertisement with the given values", (done) => {
        const options = {
           url: `${base}${this.advertisement.id}/update`,
           form: {
             title: "Test Advert",
             description: "Test advertisements"
           }
         };

         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();

           Advertisement.findOne({
             where: { id: this.advertisement.id }
           })
           .then((advertisement) => {
             expect(advertisement.title).toBe("Test Advert");
             done();
           });
         });
     });
    });

});