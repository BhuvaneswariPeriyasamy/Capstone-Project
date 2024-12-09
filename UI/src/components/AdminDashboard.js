import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  // Categories and Products State
  /*const [categories, setCategories] = useState([
    { id: "C001", shortName: "Beds", longName: "Comfortable Sofas" },
    { id: "C002", shortName: "Chairs", longName: "Dining Chairs" },
    { id: "C003", shortName: "Shelves", longName: "Modern Shelves" },
    { id: "C004", shortName: "Tables", longName: "Dining Tables" },
    { id: "C005", shortName: "Bed", longName: "King Size Beds" },
  ]);*/

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', image: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
      try {
          const response = await axios.get('http://localhost:5000/admin/categories'); // Adjust path as needed
          setCategories(response.data);
      } catch (error) {
          console.error('Error fetching categories', error);
      }
    };

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", name: "", email: "", userType: "user" });

  // Handlers for Category Management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = async () => {
    const { name, image } = formData;
    if (!name || !image) {
        toast.error("All fields are required!");
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/admin/categories', { name, image }); 
        setCategories((prev) => [...prev, response.data.category]);
        setFormData({ name: '', image: '' });
        toast.success("Category added successfully!");
    } catch (error) {
        console.error('Error adding category', error);
        toast.error('Failed to add category');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/admin/categories/${id}`);
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        toast.info("Category deleted!");
    } catch (error) {
        console.error('Error deleting category', error);
        toast.error('Failed to delete category');
    }
};


  // Handlers for Product Management
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

    const [productFormData, setProductFormData] = useState({
        category: '',
        name: '',
        price: '',
        image: '',
        description: {
            features: '',
            dimensions: '',
            materials: '',
            careInstructions: '',
        },
    });

    const handleAddProduct = async () => {
      const { category, name, price, image, description } = productFormData;
  
      if (!category || !name || !price || !image || !description.features || !description.dimensions || !description.materials || !description.careInstructions) {
          toast.error("All fields are required!");
          return;
      }
  
      try {
          const response = await axios.post(`http://localhost:5000/admin/categories/${category}/products`, {
              name,
              price,
              image,
              description,
          });
          fetchCategories(); // Refresh the data
          setProductFormData({
              category: '',
              name: '',
              price: '',
              image: '',
              description: {
                  features: '',
                  dimensions: '',
                  materials: '',
                  careInstructions: '',
              },
          });
          toast.success("Product added successfully!");
      } catch (error) {
          console.error('Error adding product', error);
          toast.error('Failed to add product');
      }
  };

  const handleDeleteProduct = async (categoryName, productId) => {
    try {
        await axios.delete(`http://localhost:5000/admin/categories/${categoryName}/products/${productId}`);
        fetchCategories(); // Refresh the data
        toast.info("Product deleted!");
    } catch (error) {
        console.error('Error deleting product', error);
        toast.error('Failed to delete product');
    }
};
  // Handlers for Order Management
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ id: "", customer: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/orders");
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.info("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.");
    }
  };

  const handleOrderChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/admin/orders/${id}`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, orderStatus: status } : order))
      );
      toast.success("Order status updated!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  // Handlers for User Management
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/admin/users');
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };
  
  const handleAddUser = async () => {
    if (!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.password) {
      toast.error('All required fields must be filled!');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/admin/users', newUser);
      toast.success('User added successfully!');
      setNewUser({
        userId: '',
        firstname: '',
        lastname: '',
        userType: 'user',
        email: '',
        password: '',
        address: '',
        city: '',
        Province: '',
        postalcode: '',
      });
      fetchUsers(); // Refresh user list
    } catch (error) {
      toast.error('Error adding user');
    }
  };
  
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      toast.success('User deleted successfully!');
      fetchUsers(); // Refresh user list
    } catch (error) {
      toast.error('Error deleting user');
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="text-dark mb-4">Admin Dashboard</h1>
      <ToastContainer />

      {/* Category Management Section */}
      <div className="content-wrapper">
        <h2>Category Management</h2>
        <table className="table table-bordered table-condensed table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>{category.image}</td>
                <td>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteCategory(category._id)}
                    >
                    Delete
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
        </table>
        <div className="add-category-container shadow-box mt-4">
          <h3>Add New Category</h3>
          <input
            type="text"
            name="name"
            value={formData.shortName}
            onChange={handleInputChange}
            className="form-control mb-2"
            placeholder="Enter Name"
          />
          <input
            type="text"
            name="image"
            value={formData.longName}
            onChange={handleInputChange}
            className="form-control mb-2"
            placeholder="Enter Image"
          />
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add New Category
          </button>
        </div>
      </div>

      {/* Product Management Section */}
      <div className="content-wrapper mt-5">
        <h2>Product List</h2>
        <table className="table table-bordered table-condensed table-hover">
  <thead className="bg-dark text-white">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Image</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((category) =>
      category.products.map((product) => (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{category.name}</td>
          <td>{product.image}</td>
          <td>
            <ul>
              <li><strong>Features:</strong> {product.description.features}</li>
              <li><strong>Dimensions:</strong> {product.description.dimensions}</li>
              <li><strong>Materials:</strong> {product.description.materials}</li>
              <li><strong>Care:</strong> {product.description.careInstructions}</li>
            </ul>
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteProduct(category.name, product._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
        <div className="add-product-container shadow-box mt-4">
    <h3>Add New Product</h3>
    <select
        name="category"
        value={productFormData.category}
        onChange={(e) =>
            setProductFormData({ ...productFormData, category: e.target.value })
        }
        className="form-control mb-2"
    >
        <option value="">Select Category</option>
        {categories.map((category) => (
            <option key={category._id} value={category.name}>
                {category.name}
            </option>
        ))}
    </select>
    <input
        type="text"
        name="name"
        value={productFormData.name}
        onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
        className="form-control mb-2"
        placeholder="Enter Product Name"
    />
    <input
        type="text"
        name="price"
        value={productFormData.price}
        onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
        className="form-control mb-2"
        placeholder="Enter Product Price"
    />
    <input
        type="text"
        name="image"
        value={productFormData.image}
        onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
        className="form-control mb-2"
        placeholder="Enter Product Image URL"
    />
    <textarea
        name="features"
        value={productFormData.description.features}
        onChange={(e) =>
            setProductFormData({
                ...productFormData,
                description: { ...productFormData.description, features: e.target.value },
            })
        }
        className="form-control mb-2"
        placeholder="Enter Features"
    />
    <textarea
        name="dimensions"
        value={productFormData.description.dimensions}
        onChange={(e) =>
            setProductFormData({
                ...productFormData,
                description: { ...productFormData.description, dimensions: e.target.value },
            })
        }
        className="form-control mb-2"
        placeholder="Enter Dimensions"
    />
    <textarea
        name="materials"
        value={productFormData.description.materials}
        onChange={(e) =>
            setProductFormData({
                ...productFormData,
                description: { ...productFormData.description, materials: e.target.value },
            })
        }
        className="form-control mb-2"
        placeholder="Enter Materials"
    />
    <textarea
        name="careInstructions"
        value={productFormData.description.careInstructions}
        onChange={(e) =>
            setProductFormData({
                ...productFormData,
                description: { ...productFormData.description, careInstructions: e.target.value },
            })
        }
        className="form-control mb-2"
        placeholder="Enter Care Instructions"
    />
    <button className="btn btn-primary" onClick={handleAddProduct}>
        Add New Product
    </button>
</div>
      </div>

      {/* Order Management Section */}
      <div className="content-wrapper mt-5">
      <h2>Order Management</h2>
      <table className="table table-bordered table-condensed table-hover">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{order.orderStatus}</td>
              <td>
                <select
                  className="form-control"
                  value={order.orderStatus}
                  onChange={(e) => handleOrderChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* User Management Section */}
      <div className="content-wrapper mt-5">
        <h2>User Management</h2>
        <table className="table table-bordered table-condensed table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
             <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.userId)}>
                    Delete
                    </button>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
        <div className="add-user-container shadow-box mt-4">
  <h3>Add New User</h3>
  <input
    type="text"
    name="firstname"
    value={newUser.firstname}
    onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter First Name"
  />
  <input
    type="text"
    name="lastname"
    value={newUser.lastname}
    onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter Last Name"
  />
  <input
    type="email"
    name="email"
    value={newUser.email}
    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter Email"
  />
  <input
    type="password"
    name="password"
    value={newUser.password}
    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter Password"
  />
  <input
    type="text"
    name="address"
    value={newUser.address}
    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter Address"
  />
  <input
    type="text"
    name="city"
    value={newUser.city}
    onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter City"
  />
  <input
    type="text"
    name="Province"
    value={newUser.Province}
    onChange={(e) => setNewUser({ ...newUser, Province: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter Province"
  />
  <input
    type="text"
    name="postalcode"
    value={newUser.postalcode}
    onChange={(e) => setNewUser({ ...newUser, postalcode: e.target.value })}
    className="form-control mb-2"
    placeholder="Enter Postal Code"
  />
  <select
    className="form-control mb-2"
    value={newUser.userType}
    onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
  >
    <option value="user">user</option>
    <option value="admin">Admin</option>
  </select>
  <button className="btn btn-primary" onClick={handleAddUser}>
    Add New User
  </button>
</div>

      </div>

    </div>
  );
};

export default AdminDashboard;
