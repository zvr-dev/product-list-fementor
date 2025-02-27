const fs = require("fs");

// Example JSON data (you might read this from a file)
const j = fs.readFileSync("./data.json");

const data = JSON.parse(j);

// Function to remove './assets' from image URLs
const cleanImageUrls = (data) => {
  return data.map((item) => {
    if (item.image) {
      Object.keys(item.image).forEach((key) => {
        // Replace './assets' with an empty string
        item.image[key] = item.image[key].replace("./assets", "");
      });
    }
    return item;
  });
};

// Clean the URLs in the data
const cleanedData = cleanImageUrls(data);

// Save the modified data back to a JSON file
fs.writeFileSync("data.json", JSON.stringify(cleanedData, null, 2), "utf-8");

console.log("Data cleaned and saved!");
