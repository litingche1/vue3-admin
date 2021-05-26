import service from "@/unitls/request.js";

/** 获取验证码 */
export function Send(data) {
  return service.request({
    url: "/getCode",
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
