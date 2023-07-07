import { MockMethod } from "vite-plugin-mock";
import user from "./user";

const mock = [...user];

export default mock as MockMethod[];
