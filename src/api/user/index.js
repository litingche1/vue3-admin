import service from "@/unitls/request.js";

/** 获取注册验证码 */
export function Send(data) {
  return service.request({
    url: "/v1/send",
    method: "post",
    data
  });
}
/** 用户名检测 */
export function ChekcUsername(data) {
  return service.request({
    url: "/v1/account/check",
    method: "post",
    data
  });
}
/** 用户注册 */
export function Login(data) {
  return service.request({
    url: "/v1/account/register",
    method: "post",
    data
  });
}
