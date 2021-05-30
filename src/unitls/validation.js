/**
 * //校验手机号码
 * @param {*} value 
 */
export function checkPhone(value) {
    let regPhong = /^1[3456789]\d{9}$/;
    return regPhong.test(value)
}
/**
 * //校验密码
 * @param {*} value 
 */

export function checkPassword(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value)
}
/**
 * //校验验证码
 * @param {*} value 
 */

export function checkCode(value) {
    let reg = /^\d{6}$/;
    return reg.test(value)
}