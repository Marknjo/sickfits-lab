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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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
var import_core4 = require("@keystone-6/core");

// schemas/User.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)(),
    email: (0, import_fields.text)({ isIndexed: "unique", validation: { isRequired: true } }),
    password: (0, import_fields.password)({ validation: { isRequired: true } })
  }
});

// schemas/Product.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Product = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    description: (0, import_fields2.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    status: (0, import_fields2.select)({
      options: [
        { label: "Draft", value: "DRAFT " },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" }
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" }
      }
    }),
    price: (0, import_fields2.integer)({ validation: { isRequired: true } }),
    photo: (0, import_fields2.relationship)({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] }
      }
    })
  }
});

// schemas/ProductImage.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var ProductImage = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    altText: (0, import_fields3.text)({ validation: { isRequired: true } }),
    image: (0, import_fields3.image)({ storage: "my_images", label: "Source" }),
    product: (0, import_fields3.relationship)({ ref: "Product.photo" })
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

// schemas/schema.ts
var lists = {
  User,
  Product,
  ProductImage
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
var sessionMaxDuration = process.env.SESSION_MAX_DURATION || 60 * 60 * 24 * 30;
var sessionSecret = process.env.SESSION_SECRET || (0, import_crypto.randomBytes)(22).toString("base64");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "name id email",
  initFirstItem: {
    fields: ["name", "email", "password"],
    skipKeystoneWelcome: true
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

// keystone.ts
var frontEndUrl = process.env.FRONTEND_URL;
if (!frontEndUrl) {
  throw new Error(
    "CONFIG ERROR: Must Provide a FRONTEND_URL environmental variable"
  );
}
var keystone_default = (0, import_core4.config)(
  withAuth({
    server: {
      cors: {
        origin: [frontEndUrl],
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: dbUrl()
    },
    lists,
    session,
    storage: {
      my_images: MyImageStorage
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
