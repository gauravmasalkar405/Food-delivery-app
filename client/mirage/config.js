import { createServer } from "miragejs";
import { data } from "./restaurantsData";
import { users } from "./userData";

export function makeServer() {
  const server = createServer({
    routes() {
      // get locations from database
      this.get("/api/location", () => {
        let locations = [];

        for (let ele of data) {
          locations.push(ele.location);
        }

        return locations;
      });

      // Route to get products based on category
      this.post("/api/products", (schema, request) => {
        const { category, location } = JSON.parse(request.requestBody);

        const restaurantsAtCurrentLocation = data.filter(
          (ele) => ele.location == location
        )[0];

        const restaurantsAccordingToCurrentCategory =
          restaurantsAtCurrentLocation.restaurants.filter(
            (ele) => ele.category == category
          );

        return restaurantsAccordingToCurrentCategory;
      });

      // Route to get restauran details
      this.post("/api/productdetails", (schema, request) => {
        const { restaurantName, location } = JSON.parse(request.requestBody);

        const restaurantDetails = data
          .filter((ele) => ele.location == location)[0]
          .restaurants.filter((ele) => ele.name == restaurantName);

        return restaurantDetails;
      });

      // Route to validate user
      this.post("/api/signinuser", (schema, request) => {
        const { name, password } = JSON.parse(request.requestBody);

        const findUser = users.filter((user) => user.name == name);

        if (findUser.length == 0) {
          return {
            res: false,
            msg: "Incorrect username or password",
          };
        }

        const userDetails = findUser[0];

        if (userDetails.password == password) {
          return {
            res: true,
            name: userDetails.name,
            password: userDetails.password,
          };
        } else {
          return {
            res: false,
            msg: "Incorrect username or password",
          };
        }
      });

      // place order handler
      this.post("/api/placeorder", (schema, request) => {
        const { name, cartItems, totalAmount } = JSON.parse(
          request.requestBody
        );

        return {
          res: true,
          msg: "Order placed successfully",
        };
      });
    },
  });

  return server;
}
