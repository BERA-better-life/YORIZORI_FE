import axios from "axios";

export const baseUrl = axios.create({
  baseURL: 'http://ec2-13-125-110-3.ap-northeast-2.compute.amazonaws.com:8000',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});