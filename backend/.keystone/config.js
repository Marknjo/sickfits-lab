"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);

// configs/dotenv.config.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config({
  path: "./.envs/.env"
});

// keystone.ts
var import_core8 = require("@keystone-6/core");

// schemas/User.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");

// schemas/fields.ts
var import_fields = require("@keystone-6/core/fields");
var permissionFields = {
  canManageProducts: (0, import_fields.checkbox)({
    defaultValue: false,
    label: "User can Update and delete any product"
  }),
  canSeeOtherUsers: (0, import_fields.checkbox)({
    defaultValue: false,
    label: "User can query other users"
  }),
  canManageUsers: (0, import_fields.checkbox)({
    defaultValue: false,
    label: "User can Edit other users"
  }),
  canManageRoles: (0, import_fields.checkbox)({
    defaultValue: false,
    label: "User can CRUD roles"
  }),
  canManageCart: (0, import_fields.checkbox)({
    defaultValue: false,
    label: "User can see and manage cart and cart items"
  }),
  canManageOrders: (0, import_fields.checkbox)({
    defaultValue: false,
    label: "User can see and manage orders"
  })
};
var permissionsList = Object.keys(
  permissionFields
);

// lib/access.ts
function isSignedIn({ session: session2 }) {
  return !!session2;
}
function noRestrictions(_args) {
  return true;
}
function isAdmin({ session: session2 }) {
  return session2?.data.role?.name === "Admin";
}
var generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function({ session: session2 }) {
      return !!session2?.data.role?.[permission];
    }
  ])
);
var permissions = {
  ...generatePermissions
};
var rules = {
  canManageProducts: ({ session: session2 }) => {
    if (permissions.canManageProducts({ session: session2 })) {
      return true;
    }
    return { user: { id: { equals: session2?.itemId } } };
  },
  canReadProducts({
    session: session2
  }) {
    if (permissions.canManageProducts({ session: session2 })) {
      return true;
    }
    return {
      status: { equals: "AVAILABLE" }
    };
  },
  canOrder: ({ session: session2 }) => {
    if (permissions.canManageProducts({ session: session2 })) {
      return true;
    }
    return { customer: { id: { equals: session2?.itemId } } };
  },
  canManageOrders: ({ session: session2 }) => {
    if (permissions.canManageProducts({ session: session2 })) {
      return true;
    }
    return { order: { customer: { id: { equals: session2?.itemId } } } };
  },
  canManageUsers({ session: session2 }) {
    if (permissions.canManageUsers({ session: session2 })) {
      return true;
    }
    return { id: { equals: session2?.itemId } };
  }
};

// schemas/User.ts
var User = (0, import_core.list)({
  access: {
    operation: {
      ...(0, import_access.allOperations)(isSignedIn),
      delete: permissions.canManageUsers
    },
    filter: {
      query: rules.canManageUsers
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args)
  },
  fields: {
    name: (0, import_fields3.text)(),
    email: (0, import_fields3.text)({ isIndexed: "unique", validation: { isRequired: true } }),
    password: (0, import_fields3.password)({ validation: { isRequired: true } }),
    cart: (0, import_fields3.relationship)({
      ref: "CartItem.customer",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    orders: (0, import_fields3.relationship)({ ref: "Order.customer", many: true }),
    role: (0, import_fields3.relationship)({
      ref: "Role.assignedTo",
      access: {
        update: permissions.canManageUsers,
        create: permissions.canManageUsers,
        read: isSignedIn
      }
    }),
    products: (0, import_fields3.relationship)({
      ref: "Product.user",
      many: true
    })
  }
});

// schemas/Product.ts
var import_core2 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var Product = (0, import_core2.list)({
  access: {
    operation: {
      create: isSignedIn,
      query: noRestrictions,
      update: isSignedIn,
      delete: isSignedIn
    },
    filter: {
      query: rules.canReadProducts,
      update: rules.canManageProducts,
      delete: rules.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
    isHidden: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    description: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    status: (0, import_fields4.select)({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" }
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" }
      }
    }),
    price: (0, import_fields4.integer)({ validation: { isRequired: true } }),
    photo: (0, import_fields4.relationship)({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
        linkToItem: true,
        inlineConnect: true
      }
    }),
    user: (0, import_fields4.relationship)({
      ref: "User.products",
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      },
      hooks: {
        resolveInput: ({ resolvedData, context, operation }) => {
          if (context.session?.data && operation === "create") {
            return { connect: { id: context.session.data.id } };
          }
          return resolvedData.user;
        }
      }
    })
  }
});

// schemas/ProductImage.ts
var import_core3 = require("@keystone-6/core");
var import_fields5 = require("@keystone-6/core/fields");
var ProductImage = (0, import_core3.list)({
  access: {
    operation: {
      query: () => true,
      create: isSignedIn,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts
    }
  },
  fields: {
    altText: (0, import_fields5.text)({ validation: { isRequired: true } }),
    image: (0, import_fields5.image)({ storage: "my_images", label: "Source" }),
    product: (0, import_fields5.relationship)({ ref: "Product.photo" })
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"],
      initialSort: {
        field: "altText",
        direction: "DESC"
      }
    }
  }
});

// schemas/CartItem.ts
var import_core4 = require("@keystone-6/core");
var import_fields6 = require("@keystone-6/core/fields");
var CartItem = (0, import_core4.list)({
  access: {
    operation: {
      create: isSignedIn,
      query: isSignedIn,
      update: isSignedIn,
      delete: isSignedIn
    },
    filter: {
      update: rules.canOrder,
      delete: rules.canOrder
    }
  },
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "customer"]
    }
  },
  fields: {
    quantity: (0, import_fields6.integer)({
      defaultValue: 1,
      validation: { isRequired: true, min: 1 }
    }),
    product: (0, import_fields6.relationship)({
      ref: "Product",
      ui: {
        hideCreate: true
      }
    }),
    customer: (0, import_fields6.relationship)({
      ref: "User.cart",
      ui: {
        hideCreate: true
      }
    })
  }
});

// schemas/Order.ts
var import_core5 = require("@keystone-6/core");
var import_fields7 = require("@keystone-6/core/fields");

// lib/formatMoney.ts
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
function formatMoney(cents) {
  const dollars = cents / 100;
  return formatter.format(dollars);
}

// schemas/Order.ts
var Order = (0, import_core5.list)({
  access: {
    operation: {
      create: isSignedIn,
      query: isSignedIn,
      update: isAdmin,
      delete: isAdmin
    }
  },
  ui: {
    listView: {
      initialColumns: ["label", "customer", "charge", "total"]
    },
    hideDelete: (args) => !isAdmin(args)
  },
  fields: {
    label: (0, import_fields7.virtual)({
      field: import_core5.graphql.field({
        type: import_core5.graphql.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        }
      })
    }),
    total: (0, import_fields7.integer)(),
    items: (0, import_fields7.relationship)({ ref: "OrderItem.order", many: true }),
    customer: (0, import_fields7.relationship)({ ref: "User.orders" }),
    charge: (0, import_fields7.text)()
  }
});

// schemas/OrderItem.ts
var import_core6 = require("@keystone-6/core");
var import_fields8 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core6.list)({
  access: {
    operation: {
      query: isSignedIn,
      create: isSignedIn,
      update: isSignedIn,
      delete: isAdmin
    },
    filter: {
      query: rules.canManageOrders
    }
  },
  ui: {
    listView: {
      initialColumns: ["name", "quantity", "price", "order", "description"]
    }
  },
  fields: {
    name: (0, import_fields8.text)({ validation: { isRequired: true } }),
    description: (0, import_fields8.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    photo: (0, import_fields8.relationship)({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        linkToItem: true,
        inlineConnect: true,
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] }
      }
    }),
    price: (0, import_fields8.integer)(),
    quantity: (0, import_fields8.integer)(),
    order: (0, import_fields8.relationship)({ ref: "Order.items" })
  }
});

// schemas/Role.ts
var import_core7 = require("@keystone-6/core");
var import_fields9 = require("@keystone-6/core/fields");
var Role = (0, import_core7.list)({
  access: {
    operation: {
      query: isSignedIn,
      create: permissions.canManageRoles,
      update: permissions.canManageRoles,
      delete: permissions.canManageRoles
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args)
  },
  fields: {
    name: (0, import_fields9.text)(),
    ...permissionFields,
    assignedTo: (0, import_fields9.relationship)({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" }
      }
    })
  }
});

// schemas/schema.ts
var lists = {
  User,
  Product,
  ProductImage,
  CartItem,
  OrderItem,
  Order,
  Role
};

// lib/buildDbUrl.ts
var dbUrl = () => {
  let DB_URL = process.env.DATABASE_URL;
  const DB_PASS = process.env.POSTGRES_PASSWORD;
  const DB_USER = process.env.POSTGRES_USER;
  const DB_PORT = process.env.POSTGRES_PORT;
  const DB_NAME = process.env.POSTGRES_DB;
  if (!DB_URL || !DB_PASS || !DB_USER || !DB_PORT || !DB_NAME) {
    throw new Error(
      "CONFIG ERROR: DB settings (DATABASE_URL || POSTGRES_PASSWORD || POSTGRES_USER || POSTGRES_PORT || POSTGRES_DB) not set in the ENV Vars \u{1F4A5}\u{1F4A5}\u{1F4A5}"
    );
  }
  DB_URL = DB_URL.replace(/{{POSTGRES_PASSWORD}}/g, DB_PASS);
  DB_URL = DB_URL.replace(/{{POSTGRES_USER}}/, DB_USER);
  DB_URL = DB_URL.replace(/{{POSTGRES_PORT}}/, DB_PORT);
  DB_URL = DB_URL.replace(/{{POSTGRES_DB}}/, DB_NAME);
  return DB_URL;
};

// configs/auth.ts
var import_crypto = require("crypto");
var import_session = require("@keystone-6/core/session");
var import_auth = require("@keystone-6/auth");

// lib/emailHandler.ts
var import_process = require("process");
var import_nodemailer = require("nodemailer");
var host = import_process.env.MAIL_HOST;
var from = import_process.env.MAIL_FROM;
var user = import_process.env.MAIL_USER;
var pass = import_process.env.MAIL_PASS;
var portNo = import_process.env.MAIL_PORT;
var defaultMail = import_process.env.MAIL_DEFAULT_EMAIL;
var frontEndUrl = import_process.env.FRONTEND_URL;
if (!host || !from || !user || !pass || !defaultMail || !portNo || !frontEndUrl) {
  throw new Error(
    "Email setup arguments incorrect, ensure you have set (MAIL_HOST | MAIL_FROM | MAIL_HOST | MAIL_PASS | MAIL_DEFAULT_EMAIL | MAIL_PORT | FRONTEND_URL) correctly"
  );
}
var transporter = (0, import_nodemailer.createTransport)({
  port: +portNo,
  host,
  auth: {
    user,
    pass
  }
});
function makeNiceEmail(text7, from2) {
  return `
    <div
      style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px
      "
    >
      <h4>Hello There!</h4>
      <p>Here is your password reset token. Hurry, it will expire in the next 10mins</p>
      <p>
        Your Reset Token. Click <a 
          style="
            background-color: red;
            color: white;
            padding: 8px 15px;
          "
          href="${frontEndUrl}/password-reset/${text7}" target="_blank"
        >Reset</a>
      </p>
      <p><small>PS: Ignore this message if you did not send the request.</small></p>
      <p>\u{1F618}, ${from2}</p>
    </div>
  `;
}
async function sendPasswordResetEmail(resetToken, to) {
  const message = {
    from: `${from} <${defaultMail}>`,
    to,
    subject: "Your Password Reset Token (Expires in 10min)",
    html: makeNiceEmail(resetToken, from)
  };
  const info = await transporter.sendMail(message);
  if (user?.includes("ethereal.email")) {
    console.log(`\u{1F48C} Message Sent! Preview it at ${(0, import_nodemailer.getTestMessageUrl)(info)}`);
  }
}

// configs/auth.ts
var sessionMaxDuration = process.env.SESSION_MAX_DURATION || 60 * 60 * 24 * 30;
var sessionSecret = process.env.SESSION_SECRET || (0, import_crypto.randomBytes)(22).toString("base64");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: `name id email role { name ${permissionsList.join(" ")} }`,
  initFirstItem: {
    fields: ["name", "email", "password"],
    skipKeystoneWelcome: true
  },
  passwordResetLink: {
    tokensValidForMins: 10,
    async sendToken({ identity, token }) {
      await sendPasswordResetEmail(token, identity);
    }
  }
});
var session = (0, import_session.statelessSessions)({
  secret: sessionSecret,
  maxAge: +sessionMaxDuration,
  sameSite: "strict"
});

// configs/storage.ts
var baseUrl = `http://localhost:3000`;
var MyImageStorage = {
  kind: "local",
  type: "image",
  generateUrl: (path) => `${baseUrl}/images${path}`,
  serverRoute: {
    path: "/images"
  },
  storagePath: "public/images"
};

// seed-data/data.ts
var products = [
  {
    name: "Yeti Hondo",
    description: "soo nice",
    status: "AVAILABLE",
    price: 3423
  },
  {
    name: "Airmax 270",
    description: "Great shoes!",
    status: "AVAILABLE",
    price: 5234
  },
  {
    name: "KITH Hoodie",
    description: "Love this hoodie",
    status: "AVAILABLE",
    price: 23562
  },
  {
    name: "Fanorak",
    description: "Super hip. Comes in a number of colours",
    status: "AVAILABLE",
    price: 252342
  },
  {
    name: "Nike Vapormax",
    description: "Kind of squeaky on some floors",
    status: "AVAILABLE",
    price: 83456
  },
  {
    name: "Yeti Cooler",
    description: "Who spends this much on a cooler?!",
    status: "AVAILABLE",
    price: 75654
  },
  {
    name: "Naked and Famous Denim",
    description: "Japanese Denim, made in Canada",
    status: "AVAILABLE",
    price: 10924
  },
  {
    name: "Rimowa Luggage",
    description: "S T E A L T H",
    status: "AVAILABLE",
    price: 47734
  },
  {
    name: "Black Hole ",
    description: "Outdoorsy ",
    status: "AVAILABLE",
    price: 4534
  },
  {
    name: "Nudie Belt",
    description: "Sick design",
    status: "AVAILABLE",
    price: 5234
  },
  {
    name: "Goose",
    description: "Keep warm.",
    status: "AVAILABLE",
    price: 74544
  },
  {
    name: "Ultraboost",
    description: "blacked out",
    status: "AVAILABLE",
    price: 6344
  }
];

// seed-data/index.ts
async function insertSeedData(ctx) {
  const { db } = ctx;
  console.log(`\u{1F331} Inserting Seed Data: ${products.length} Products`);
  await Promise.all([
    ...products.map((product) => {
      console.log(`  \u{1F6CD}\uFE0F Adding Product Image: ${product.description} 
`);
      return db.ProductImage.createOne({
        data: {
          altText: product.description
        }
      });
    }),
    ...products.map((product) => {
      console.log(`  \u{1F6CD}\uFE0F Adding Product: ${product.name}`);
      console.table(product);
      return db.Product.createOne({ data: product });
    })
  ]);
  console.log(`\u2705 Seed Data Inserted: ${products.length} Products`);
  console.log(
    `\u{1F44B} Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}

// lib/graphql/index.ts
var import_schema = require("@graphql-tools/schema");

// lib/graphql/mutations/addToCart.ts
async function addToCart(_root, { productId }, context) {
  const session2 = context.session;
  const itemId = session2.itemId;
  if (!session2.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  const allCartItems = await context.db.CartItem.findMany({
    where: {
      customer: { id: { equals: itemId } },
      product: { id: { equals: productId } }
    }
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1`
    );
    const id = existingCartItem.id;
    const quantity = existingCartItem.quantity;
    return await context.db.CartItem.updateOne({
      where: { id },
      data: { quantity: quantity + 1 }
    });
  }
  return await context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      customer: { connect: { id: session2.itemId } }
    }
  });
}

// lib/graphql/mutations/reduceCartItems.ts
async function reduceCartItems(_root, { productId }, context) {
  const session2 = context.session;
  const itemId = session2.itemId;
  if (!session2.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  const allCartItems = await context.db.CartItem.findMany({
    where: {
      customer: { id: { equals: itemId } },
      product: { id: { equals: productId } }
    }
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1`
    );
    const id = existingCartItem.id;
    const quantity = existingCartItem.quantity;
    return await context.db.CartItem.updateOne({
      where: { id },
      data: { quantity: quantity - 1 }
    });
  }
  return allCartItems;
}

// lib/stripe.ts
var import_process2 = require("process");
var import_stripe = __toESM(require("stripe"));
var stripeKey = import_process2.env.STRIPE_SECRET;
if (!stripeKey) {
  throw new Error("STRIPE_KEY env variable missing");
}
var stripeConfig = new import_stripe.default(stripeKey, {
  apiVersion: "2022-11-15"
});
var stripe_default = stripeConfig;

// lib/graphql/mutations/checkout.ts
async function checkout(_root, { token }, context) {
  const session2 = context.session;
  const userId = session2.data?.id;
  if (!session2.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  const user2 = await context.query.User.findOne({
    where: {
      id: userId
    },
    query: `#graphql
       id 
       name 
       email
       cart{
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            altText
            image {
              id
              url
            }
          }
        }
       }
    `
  });
  const cartItems = user2.cart.filter(
    (cartItem) => cartItem.product
  );
  const amount = cartItems.reduce(
    (tally, cartItem) => tally + cartItem.quantity * cartItem.product.price,
    0
  );
  const charge = await stripe_default.paymentIntents.create({
    amount,
    currency: "USD",
    confirm: true,
    payment_method: token
  }).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  const orderedItems = cartItems.map(
    (cartItem) => {
      const orderItem = {
        name: cartItem.product.name,
        description: cartItem.product.description,
        photo: { connect: { id: cartItem.product.photo.id } },
        price: cartItem.product.price,
        quantity: cartItem.quantity
      };
      return orderItem;
    }
  );
  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderedItems },
      customer: { connect: { id: userId } }
    }
  });
  const cartItemIds = cartItems.map((cartItem) => ({
    id: cartItem.id
  }));
  await context.db.CartItem.deleteMany({
    where: cartItemIds
  });
  return order;
}

// lib/graphql/index.ts
var extendGraphqlSchema = (schema) => (0, import_schema.mergeSchemas)({
  schemas: [schema],
  typeDefs: `#graphql

      type Mutation{
      """ Add To Cart Mutation """
        addToCart(productId: ID): CartItem

      """ Remove Items from the cart by reducing a specific product quantity """
        reduceCartItems(productId: ID): CartItem

      """ Checkout with Stripe """
        checkout(token: String!): Order
      }

  `,
  resolvers: {
    Mutation: {
      addToCart,
      reduceCartItems,
      checkout
    },
    Query: {}
  }
});

// keystone.ts
var frontEndUrl2 = process.env.FRONTEND_URL;
if (!frontEndUrl2) {
  throw new Error(
    "CONFIG ERROR: Must Provide a FRONTEND_URL environmental variable"
  );
}
var keystone_default = (0, import_core8.config)(
  withAuth({
    server: {
      cors: {
        origin: [frontEndUrl2],
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: dbUrl(),
      onConnect: async (context) => {
        console.log("Connecting to the database");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      }
    },
    storage: {
      my_images: MyImageStorage
    },
    lists,
    extendGraphqlSchema,
    session,
    ui: {
      isAccessAllowed: (context) => {
        return !!context.session?.data;
      }
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
