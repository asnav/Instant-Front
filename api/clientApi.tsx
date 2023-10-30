import { create } from "apisauce";
import { baseURL } from "../constants/constants";

const apiClient = create({
  baseURL: baseURL,
  headers: { Accept: "application/vnd.github.v3+json" },
  timeout: 3000,
});

export default apiClient;
