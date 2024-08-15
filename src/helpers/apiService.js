import axiosInstance from "@/plugins/axios";

//Employees
export const getEmployees = (page = 1, perPage = 10, searchQuery = "") => {
  return axiosInstance.get(`/employees`, {
    params: {
      page,
      per_page: perPage,
      search: searchQuery,
    },
  });
};
export const createEmployee = (employeeData) => {
  return axiosInstance.post("/employees", employeeData);
};

export const updateEmployee = (id, updatedData) => {
  return axiosInstance.put(`/employees/${id}`, updatedData);
};

export const deleteEmployee = (id) => {
  return axiosInstance.delete(`/employees/${id}`);
};
export const fetchEmployeesData = async (page, perPage, searchQuery) => {
  try {
    const response = await getEmployees(page, perPage, searchQuery);
    const data = response.data.data;
    return {
      employees: data.data,
      pagination: {
        from: data.from,
        to: data.to,
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      },
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

//Categorie
export const getCategories = (page = 1, perPage = 10, searchQuery = "") => {
  return axiosInstance.get(`/categories`, {
    params: {
      page,
      per_page: perPage,
      search: searchQuery,
    },
  });
};
export const createCategorie = (categorieData) => {
  return axiosInstance.post("/categories", categorieData);
};

export const updateCategorie = (id, updatedData) => {
  return axiosInstance.put(`/categories/${id}`, updatedData);
};

export const deleteCategorie = (id) => {
  return axiosInstance.delete(`/categories/${id}`);
};
export const fetchCategoriesData = async (page, perPage, searchQuery) => {
  try {
    const response = await getCategories(page, perPage, searchQuery);
    const data = response.data.data;
    return {
      categories: data.data,
      pagination: {
        from: data.from,
        to: data.to,
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      },
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

//Products
export const getProducts = (page = 1, perPage = 10, searchQuery = "") => {
  return axiosInstance.get(`/products`, {
    params: {
      page,
      per_page: perPage,
      search: searchQuery,
    },
  });
};
export const createProduct = (formData) => {
  return axiosInstance.post("/products", formData);
};

export const updateProduct = (id, formData) => {
  return axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};
export const fetchProductsData = async (page, perPage, searchQuery) => {
  try {
    const response = await getProducts(page, perPage, searchQuery);
    const data = response.data.data;
    return {
      products: data.data,
      pagination: {
        from: data.from,
        to: data.to,
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      },
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

//Customers
export const getCustomers = (page = 1, perPage = 10, searchQuery = "") => {
  return axiosInstance.get(`/customers`, {
    params: {
      page,
      per_page: perPage,
      search: searchQuery,
    },
  });
};
export const fetchCustomersData = async (page, perPage, searchQuery) => {
  try {
    const response = await getCustomers(page, perPage, searchQuery);
    const data = response.data.data;
    return {
      customers: data.data,
      pagination: {
        from: data.from,
        to: data.to,
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      },
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

//Transactions
export const fetchTransactionsData = async (page, perPage, searchQuery) => {
  try {
    const response = await getTransactions(page, perPage, searchQuery);
    const data = response.data.data;
    return {
      transactions: data.data,
      pagination: {
        from: data.from,
        to: data.to,
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      },
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
export const getTransactions = (page = 1, perPage = 10, searchQuery = "") => {
  return axiosInstance.get(`/transactions`, {
    params: {
      page,
      per_page: perPage,
      search: searchQuery,
    },
  });
};
export const getTransactionsDetails = () => {
  return axiosInstance.get(`/transaction/details`);
};

export const createTransaction = (transactionData) => {
  return axiosInstance.post(`/transactions`, transactionData);
};

export const updateTransaction = (id, transactionData) => {
  return axiosInstance.put(`/transactions/${id}`, transactionData);
};

export const deleteTransaction = (id) => {
  return axiosInstance.delete(`/transactions/${id}`);
};

//Stats
export const getStats = () => {
  return axiosInstance.get(`/stats`);
};
//Login
export async function login(endpoint, email, password) {
  try {
    const response = await axiosInstance.post(endpoint, {
      email,
      password,
    });

    const token = response.data.token;
    console.log("Token diterima:", token);

    // Simpan token di localStorage
    localStorage.setItem("auth_token", token);

    // Set header Authorization default di Axios
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Log seluruh respons untuk memeriksa strukturnya
    console.log("Respons lengkap:", response);

    return response.data;
  } catch (error) {
    console.error("Login gagal:", error.response.data);
    throw error;
  }
}

export async function logout() {
  try {
    await axiosInstance.post("/logout");

    // Hapus token dari localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    return { success: true, message: "Successfully logged out" };
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Logout failed. Please try again." };
  }
}
export async function loginWithGoogle(token) {
  try {
    const response = await axiosInstance.post("/login/google", { token });

    const { token: authToken, user } = response.data;

    // Set default header Authorization di Axios
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authToken}`;

    return { token: authToken, user };
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
}

export const loginCustomer = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login/customer", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
export const getSnapToken = (order) => {
  return axiosInstance.post("/gettoken", order);
};
