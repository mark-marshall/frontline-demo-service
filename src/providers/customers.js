const axios = require('axios');

const findWorkerForCustomer = async (customerNumber) => {
  const customersToWorkersMapRes = await axios.get(
    'https://ukise-frontline-1182.twil.io/customers-workers-map.json'
  );
  const customersToWorkersMap = customersToWorkersMapRes.data;
  return customersToWorkersMap[customerNumber];
};

const findRandomWorker = async () => {
  const customersToWorkersMapRes = await axios.get(
    'https://ukise-frontline-1182.twil.io/customers-workers-map.json'
  );
  const customersToWorkersMap = customersToWorkersMapRes.data;
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  s;
  const workers = Object.values(customersToWorkersMap).filter(onlyUnique);
  const randomIndex = Math.floor(Math.random() * workers.length);

  return workers[randomIndex];
};

const getCustomersList = async (worker, pageSize, anchor) => {
  const customersRes = await axios.get(
    'https://ukise-frontline-1182.twil.io/customers.json'
  );
  const customers = customersRes.data;

  const workerCustomers = customers.filter(
    (customer) => customer.worker === worker
  );
  const list = workerCustomers.map((customer) => ({
    display_name: customer.display_name,
    customer_id: customer.customer_id,
    avatar: customer.avatar,
  }));

  if (!pageSize) {
    return list;
  }

  if (anchor) {
    const lastIndex = list.findIndex(
      (c) => String(c.customer_id) === String(anchor)
    );
    const nextIndex = lastIndex + 1;
    return list.slice(nextIndex, nextIndex + pageSize);
  } else {
    return list.slice(0, pageSize);
  }
};

const getCustomerByNumber = async (customerNumber) => {
  const customersRes = await axios.get(
    'https://ukise-frontline-1182.twil.io/customers.json'
  );
  const customers = customersRes.data;

  return customers.find((customer) =>
    customer.channels.find(
      (channel) => String(channel.value) === String(customerNumber)
    )
  );
};

const getCustomerById = async (customerId) => {
  const customersRes = await axios.get(
    'https://ukise-frontline-1182.twil.io/customers.json'
  );
  const customers = customersRes.data;

  return customers.find(
    (customer) => String(customer.customer_id) === String(customerId)
  );
};

module.exports = {
  findWorkerForCustomer,
  findRandomWorker,
  getCustomerById,
  getCustomersList,
  getCustomerByNumber,
};
