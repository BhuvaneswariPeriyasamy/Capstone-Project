const mongoose = require('mongoose');
const Category = require('./models/category');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://dharmeshwayne:mB5ud4buFCiKElbu@cluster0.bqcmuyb.mongodb.net/UrbanFurniture?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mapping of product IDs to their descriptions
const descriptionsMap = {
    "6728efd4f12bedf3d2c79fd6": {
      features: "A luxurious King Size bed, perfect for spacious bedrooms. Offers supreme comfort with a stylish design.",
      dimensions: "Dimensions: 76 x 80 inches.",
      materials: "Crafted from high-quality solid wood with a plush headboard.",
      careInstructions: "Wipe with a damp cloth; avoid harsh chemicals."
    },
    "6728efe6f12bedf3d2c79fd7": {
      features: "A sleek Queen Size bed that combines elegance and comfort for a perfect night’s sleep.",
      dimensions: "Dimensions: 60 x 80 inches.",
      materials: "Made with durable fabric upholstery and a strong metal frame.",
      careInstructions: "Spot clean with mild soap and water; do not soak."
    },
    "6728effbf12bedf3d2c79fd8": {
      features: "Versatile Bunk Bed ideal for kids’ rooms or guest accommodations, featuring safety rails.",
      dimensions: "Dimensions: 42 x 78 inches.",
      materials: "Constructed from sturdy wood and metal for lasting durability.",
      careInstructions: "Regularly check for loose screws and tighten as necessary."
    },
    "6728f00bf12bedf3d2c79fd9": {
      features: "Compact Single Bed perfect for small spaces, without compromising on style and comfort.",
      dimensions: "Dimensions: 39 x 75 inches.",
      materials: "Crafted from strong metal, available in multiple colors.",
      careInstructions: "Clean with a soft cloth; avoid excessive moisture."
    },
    "6728f01af12bedf3d2c79fda": {
      features: "Space-saving Folding Bed that provides comfort while being easily stored away.",
      dimensions: "Dimensions: 75 x 31 inches when open.",
      materials: "Made from a lightweight frame with a cushioned mattress.",
      careInstructions: "Store in a dry place; wipe down after use."
    },
    "6728f07cf12bedf3d2c79fdb": {
      features: "Stylish Modern Office Chair designed for long hours of comfort and productivity.",
      dimensions: "Adjustable height; fits most desk sizes.",
      materials: "Upholstered in breathable mesh with a sturdy base.",
      careInstructions: "Vacuum regularly; spot clean with mild detergent."
    },
    "6728f08bf12bedf3d2c79fdc": {
      features: "Luxurious Leather Recliner Chair with adjustable reclining positions for maximum relaxation.",
      dimensions: "Dimensions: 34 x 36 x 40 inches.",
      materials: "Crafted with premium leather and a solid wood frame.",
      careInstructions: "Condition leather regularly; avoid direct sunlight."
    },
    "6728f09bf12bedf3d2c79fdd": {
      features: "Charming Vintage Wooden Chair adds character to any room with its timeless design.",
      dimensions: "Dimensions: 18 x 20 x 36 inches.",
      materials: "Made from solid reclaimed wood.",
      careInstructions: "Dust regularly and polish occasionally."
    },
    "6728f0abf12bedf3d2c79fde": {
      features: "Ergonomic Gaming Chair designed for long gaming sessions with full-body support.",
      dimensions: "Adjustable height and recline; fits most body types.",
      materials: "High-density foam with a durable fabric covering.",
      careInstructions: "Clean spills immediately; use upholstery cleaner."
    },
    "6728f0b9f12bedf3d2c79fdf": {
      features: "Portable Foldable Camping Chair for outdoor adventures; lightweight and easy to carry.",
      dimensions: "Dimensions: 28 x 28 x 36 inches.",
      materials: "Durable polyester fabric with a steel frame.",
      careInstructions: "Store in a cool, dry place; clean with a damp cloth."
    },
    "6728f0ddf12bedf3d2c79fe0": {
      features: "Stylish Floating Wall Shelf for a modern look, perfect for displaying decor items.",
      dimensions: "Dimensions: 24 x 8 x 2 inches.",
      materials: "Made from high-quality MDF with a smooth finish.",
      careInstructions: "Wipe clean with a soft cloth; avoid excess water."
    },
    "6728f0f2f12bedf3d2c79fe1": {
      features: "Elegant Wooden Bookshelf designed to hold your favorite books and decor.",
      dimensions: "Dimensions: 30 x 12 x 60 inches.",
      materials: "Crafted from solid wood with multiple finish options.",
      careInstructions: "Dust regularly and polish with furniture wax."
    },
    "6728f102f12bedf3d2c79fe2": {
      features: "Sturdy Metal Storage Shelf for efficient organization and storage solutions.",
      dimensions: "Dimensions: 36 x 18 x 72 inches.",
      materials: "Constructed with heavy-duty metal and a powder-coated finish.",
      careInstructions: "Wipe with a damp cloth; avoid harsh chemicals."
    },
    "6728f110f12bedf3d2c79fe3": {
      features: "Functional Corner Shelf Unit to maximize space in any room, stylish and practical.",
      dimensions: "Dimensions: 25 x 25 x 75 inches.",
      materials: "Made from engineered wood for durability.",
      careInstructions: "Regularly check stability; clean with a damp cloth."
    },
    "6728f11cf12bedf3d2c79fe4": {
      features: "Adjustable Shelf Rack suitable for various items; perfect for kitchens and garages.",
      dimensions: "Dimensions: 36 x 14 x 60 inches.",
      materials: "Constructed from sturdy steel with adjustable shelves.",
      careInstructions: "Wipe down with a damp cloth; avoid heavy weights on upper shelves."
    },
    "6728f138f12bedf3d2c79fe5": {
      features: "Modern Coffee Table designed for style and function, perfect for any living room.",
      dimensions: "Dimensions: 48 x 24 x 18 inches.",
      materials: "Crafted with tempered glass and a sturdy wooden frame.",
      careInstructions: "Clean with glass cleaner; avoid placing hot items directly on glass."
    },
    "6728f145f12bedf3d2c79fe6": {
      features: "Elegant Dining Table Set to accommodate family gatherings and dinner parties.",
      dimensions: "Table: 72 x 36 x 30 inches; includes 4 chairs.",
      materials: "Constructed from solid hardwood with upholstered seats.",
      careInstructions: "Wipe with a damp cloth; use coasters for drinks."
    },
    "6728f153f12bedf3d2c79fe7": {
      features: "Functional Wooden Study Desk perfect for home offices or student workspaces.",
      dimensions: "Dimensions: 48 x 24 x 30 inches.",
      materials: "Made from durable hardwood; easy to assemble.",
      careInstructions: "Dust regularly and avoid direct sunlight."
    },
    "6728f163f12bedf3d2c79fe8": {
      features: "Durable Outdoor Picnic Table ideal for family gatherings and barbecues.",
      dimensions: "Dimensions: 60 x 28 x 30 inches.",
      materials: "Crafted from weather-resistant wood; sturdy design.",
      careInstructions: "Store indoors during winter; treat with wood sealer annually."
    },
    "6728f179f12bedf3d2c79fe9": {
      features: "Stylish Glass Side Table that adds a modern touch to any room.",
      dimensions: "Dimensions: 20 x 20 x 22 inches.",
      materials: "Made from tempered glass and a metal base.",
      careInstructions: "Clean with glass cleaner; avoid heavy impacts."
    }
  };
  

async function updateProductDescriptions() {
  try {
    // Fetch all categories
    const categories = await Category.find();

    for (const category of categories) {
      for (const product of category.products) {
        // Check if the product ID exists in the descriptions map
        const description = descriptionsMap[product._id.toString()];

        if (description) {
          // Update the product's description if found
          product.description = description; // Set the unique description
        }
      }

      // Save the updated category
      await category.save();
      console.log(`Updated descriptions for category: ${category.name}`);
    }

    console.log('All products updated successfully!');
  } catch (error) {
    console.error('Error updating product descriptions:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the update function
updateProductDescriptions();
