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
var import_crypto = require("crypto");
var import_core = require("@keystone-6/core");

// lib/buildDbUrl.ts
var dbUrl = () => {
  let DB_URL = process.env.DATABASE_URL;
  const DB_PASS = process.env.POSTGRES_PASSWORD;
  const DB_USER = process.env.POSTGRES_USER;
  const DB_PORT = process.env.POSTGRES_PORT;
  if (!DB_URL || !DB_PASS || !DB_USER || !DB_PORT) {
    throw new Error("DB settings not set in the ENV Vars \u{1F4A5}\u{1F4A5}\u{1F4A5}");
  }
  DB_URL = DB_URL.replace(/{{POSTGRES_PASSWORD}}/g, DB_PASS);
  DB_URL = DB_URL.replace(/{{POSTGRES_USER}}/, DB_USER);
  DB_URL = DB_URL.replace(/{{POSTGRES_PORT}}/, DB_PORT);
  return DB_URL;
};

// keystone.ts
console.log((0, import_crypto.randomBytes)(32).toString("hex"));
console.log({ dbURL: dbUrl() });
var keystone_default = (0, import_core.config)({
  db: {
    provider: "postgresql",
    url: dbUrl()
  },
  lists: {}
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
