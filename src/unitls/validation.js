//校验手机号码
export function checkPhone(value) {
    let regPhong = /^1[3456789]\d{9}$/;
    return regPhong.test(value)
}