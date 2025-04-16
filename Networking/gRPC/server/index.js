const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./customers.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const customerProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers = [
  {
    id: "qwer",
    name: "Amartya",
    age: 27,
    address: "Bangalore",
  },
  {
    id: "fsgga",
    name: "Swati",
    age: 27,
    address: "Bangalore",
  },
];

server.addService(customerProto.CustomerService.service, {
  getAll: (call, callback) => {
    callback(null, { customers });
  },
  get: (call, callback) => {
    let customer = customers.find((n) => n.id == call.request.id);

    if (customer) {
      callback(null, customer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  insert: (call, callback) => {
    let customer = call.request;
    customer.id = Math.random(); //uuidv4
    customers.push(customer);
    callback(null, customer);
  },
  update: (call, callback) => {
    let existingCustomer = customers.find(n=>n.id == call.request.id);

    if(existingCustomer){
        existingCustomer.name = call.request.name;
        existingCustomer.age = call.request.age;
        existingCustomer.address = call.request.address;
        callback(null, existingCustomer);

    } else {
        callback({code: grpc.status.NOT_FOUND, details: "Not Found"});
    }
  },
  remove: (call, callback) => {
    let existingCustomerIndex = customers.findIndex(n => n.id === call.request.id);

    if(existingCustomerIndex != -1){
        customers.splice(existingCustomerIndex, 1);
        callback(null, {});

    } else {
        callback({code: grpc.status.NOT_FOUND, details: "Not Found"})
    }
  },
});

server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err, port)=>{
    if(err){
    console.log("Error starting grpc server");
    } else {
        server.start();
        console.log('grpc server is listening on ', port);
    }
});

