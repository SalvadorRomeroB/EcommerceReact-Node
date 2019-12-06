export const createCategory = (userId, token, category) => {
  return fetch(`/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch();
};

export const createProduct = (userId, token, product) => {
  return fetch(`/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch();
};

export const getCategories = () => {
  return fetch("/api/categories", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch();
};

// PRODUCTS ADMIN

export const getProducts = () => {
  return fetch(`/api/products?limit=undefined`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch();
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch();
};

export const getProduct = productId => {
  return fetch(`/api/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch();
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch();
};
