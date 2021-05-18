import service from "@/unitls/request.js";

/** 获取验证码 */
export function Send(data) {
  return service.request({
    url: "/getCode",
    method: "post",
    data
  });
}
