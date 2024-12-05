import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  // Categories and Products State
  const [categories, setCategories] = useState([
    { id: "C001", shortName: "Beds", longName: "Comfortable Sofas" },
    { id: "C002", shortName: "Chairs", longName: "Dining Chairs" },
    { id: "C003", shortName: "Shelves", longName: "Modern Shelves" },
    { id: "C004", shortName: "Tables", longName: "Dining Tables" },
    { id: "C005", shortName: "Bed", longName: "King Size Beds" },
  ]);

  const [products, setProducts] = useState([
    { id: "P001", name: "Sofa Bed", category: "Beds" },
    { id: "P002", name: "Recliner Chair", category: "Chairs" },
    { id: "P003", name: "Bookshelf", category: "Shelves" },
    { id: "P004", name: "Dining Table Set", category: "Tables" },
    { id: "P005", name: "Queen Bed", category: "Beds" },
    { id: "P006", name: "Office Chair", category: "Chairs" },
    { id: "P007", name: "Wall Shelf", category: "Shelves" },
    { id: "P008", name: "Coffee Table", category: "Tables" },
    { id: "P009", name: "King Bed", category: "Beds" },
    { id: "P010", name: "Armchair", category: "Chairs" },
  ]);

  const [formData, setFormData] = useState({ id: "", shortName: "", longName: "" });
  const [productFormData, setProductFormData] = useState({ id: "", name: "", category: "" });

  // Orders and Users State
  const [orders, setOrders] = useState([
    { id: "O001", customer: "John Doe", status: "Processing" },
    { id: "O002", customer: "Jane Smith", status: "Delivered" },
    { id: "O003", customer: "Michael Brown", status: "Shipped" },
    { id: "O004", customer: "Emily Johnson", status: "On the Way" },
    { id: "O005", customer: "Chris Wilson", status: "Returned" },
  ]);

  const [users, setUsers] = useState([
    { id: "U001", name: "John Doe", email: "john@example.com", userType: "Customer" },
    { id: "U002", name: "Jane Smith", email: "jane@example.com", userType: "Admin" },
  ]);

  const [newOrder, setNewOrder] = useState({ id: "", customer: "", status: "Processing" });
  const [newUser, setNewUser] = useState({ id: "", name: "", email: "", userType: "Customer" });

  // Handlers for Category Management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    const { id, shortName, longName } = formData;
    if (!id || !shortName || !longName) {
      toast.error("All fields are required!");
      return;
    }
    const newCategory = { id, shortName, longName };
    setCategories((prev) => [...prev, newCategory]);
    setFormData({ id: "", shortName: "", longName: "" });
    toast.success("Category added successfully!");
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    toast.info("Category deleted!");
  };

  // Handlers for Product Management
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const { id, name, category } = productFormData;
    if (!id || !name || !category) {
      toast.error("All fields are required!");
      return;
    }
    const newProduct = { id, name, category };
    setProducts((prev) => [...prev, newProduct]);
    setProductFormData({ id: "", name: "", category: "" });
    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
    toast.info("Product deleted!");
  };

  // Handlers for Order Management
  const handleOrderChange = (id, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    toast.success("Order status updated!");
  };

  const handleAddOrder = () => {
    if (!newOrder.id || !newOrder.customer) {
      toast.error("Order ID and Customer Name are required!");
      return;
    }
    setOrders((prev) => [...prev, newOrder]);
    setNewOrder({ id: "", customer: "", status: "Processing" });
    toast.success("New order added!");
  };

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    toast.info("Order deleted!");
  };

  // Handlers for User Management
  const handleAddUser = () => {
    if (!newUser.id || !newUser.name || !newUser.email) {
      toast.error("All fields are required for user creation!");
      return;
    }
    setUsers((prev) => [...prev, newUser]);
    setNewUser({ id: "", name: "", email: "", userType: "Customer" });
    toast.success("New user added!");
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.info("User deleted!");
  };

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
              <th>Short Name</th>
              <th>Long Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.shortName}</td>
                <td>{category.longName}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(category.id)}>
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
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="form-control mb-2"
            placeholder="Enter Category ID"
          />
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleInputChange}
            className="form-control mb-2"
            placeholder="Enter Short Name"
          />
          <input
            type="text"
            name="longName"
            value={formData.longName}
            onChange={handleInputChange}
            className="form-control mb-2"
            placeholder="Enter Long Name"
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-product-container shadow-box mt-4">
          <h3>Add New Product</h3>
          <input
            type="text"
            name="id"
            value={productFormData.id}
            onChange={handleProductInputChange}
            className="form-control mb-2"
            placeholder="Enter Product ID"
          />
          <input
            type="text"
            name="name"
            value={productFormData.name}
            onChange={handleProductInputChange}
            className="form-control mb-2"
            placeholder="Enter Product Name"
          />
          <input
            type="text"
            name="category"
            value={productFormData.category}
            onChange={handleProductInputChange}
            className="form-control mb-2"
            placeholder="Enter Product Category"
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
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    className="form-control"
                    value={order.status}
                    onChange={(e) => handleOrderChange(order.id, e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Returned">Returned</option>
                    <option value="On the Way">On the Way</option>
                  </select>
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-order-container shadow-box mt-4">
          <h3>Add New Order</h3>
          <input
            type="text"
            name="id"
            value={newOrder.id}
            onChange={(e) => setNewOrder({ ...newOrder, id: e.target.value })}
            className="form-control mb-2"
            placeholder="Enter Order ID"
          />
          <input
            type="text"
            name="customer"
            value={newOrder.customer}
            onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            className="form-control mb-2"
            placeholder="Enter Customer Name"
          />
          <button className="btn btn-primary" onClick={handleAddOrder}>
            Add New Order
          </button>
        </div>
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
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
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
            name="id"
            value={newUser.id}
            onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
            className="form-control mb-2"
            placeholder="Enter User ID"
          />
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="form-control mb-2"
            placeholder="Enter User Name"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="form-control mb-2"
            placeholder="Enter User Email"
          />
          <select
            className="form-control mb-2"
            value={newUser.userType}
            onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
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
