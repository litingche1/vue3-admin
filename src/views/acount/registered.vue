<template>
  <div id="registered">
    <div class="form-wrap">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
      >
        <a-form-item name="username" ref="username">
          <label for>用户名</label>
          <a-input
            type="text"
            autocomplete="off"
            :disabled="usernameStatus"
            v-model:value="formState.username"
            placeholder="请输入用户名"
            @change="() => {$refs.username.onFieldChange()}"
          />
        </a-form-item>
        <a-form-item class="password" name="password" ref="pass">
          <label for>密码</label>
          <a-input-password   autocomplete="off" v-model:value="formState.password" placeholder="请输入密码" @change="() => {$refs.pass.onFieldChange()}"/>
        </a-form-item>
        <a-form-item class="password" name="confirmPassword" ref="password">
          <label for>确认密码</label>
          <a-input-password  autocomplete="off" v-model:value="formState.confirmPassword" placeholder="请输入确认密码" @change="() => {$refs.password.onFieldChange()}" />
        </a-form-item>
        <a-form-item class="password" name="verificationCode">
          <label for>验证码</label>
          <a-row :gutter="8">
            <a-col :span="15">
              <a-input
                type="text"
                autocomplete="off"
                v-model:value="formState.verificationCode"
              />
            </a-col>
            <a-col :span="9">
              <a-button
                type="primary"
                :disabled="buttonInformation.disable"
                :loading="buttonInformation.loading"
                @click="getCode"
              >{{ buttonInformation.name }}</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <!-- <a-form-item class="yzm">
          <captcha />
        </a-form-item>-->
        <a-form-item>
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/" class="color-white">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import captcha from "@/components/captcha";
import { checkPhone, checkPassword, checkCode } from "@/unitls/validation";
import { ChekcUsername,Send,Login } from "@/api/user/index";
import { useRouter } from "vue-router";
export default {
  name: "registered",
  components: {
    captcha
  },
  setup(props) {
    //获取路由的push()方法
    const{push}=useRouter()
    const formRef = ref();
    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    });
    const formState = reactive({
      username: "",
      password: "",
      confirmPassword: "",
      verificationCode: ""
    });
    //按钮信息
    const buttonInformation = reactive({
      name: "获取验证码",
      disable: true,
      loading: false,
      countdown: 60,
      timer: ""
    });
    const usernameStatus = ref(false);
    //自定义手机号校验
    const validatePhone = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入用户名");
      } else {
        if (!checkPhone(value)) {
          return Promise.reject("请输入正确的手机号码");
        }
        ChekcUsernameFn();
        return Promise.resolve();
      }
    };
    //自定义密码校验
    const validatePassword = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (
        formState.confirmPassword &&
        value &&
        formState.confirmPassword !== value
      ) {
        return Promise.reject("二次密码不一致");
      } else {
        if (!checkPassword(value)) {
          return Promise.reject("请输入6-20位的数字+字母的密码");
        }
        return Promise.resolve();
      }
    };
    //自定义确认密码校验
    const validateconfirmPassword = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入确认密码");
      } else if (formState.password && value && formState.password !== value) {
        return Promise.reject("二次密码不一致");
      } else {
        if (!checkPassword(value)) {
          return Promise.reject("请输入6-20位的数字+字母的密码");
        }

        return Promise.resolve();
      }
    };
    //自定义验证码校验
    const validatecode = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入验证码");
      } else {
        if (!checkCode(value)) {
          return Promise.reject("请输入6位的数字的验证码");
        }
        return Promise.resolve();
      }
    };
    //用户名检测是否已经注册
    const ChekcUsernameFn = () => {
      usernameStatus.value = true;
      ChekcUsername({ username: formState.username }).then(res => {
        if (!res.content.user) {
          usernameStatus.value = false;
          buttonInformation.disable = false;
        }else{
          message.error(res.msg);
          usernameStatus.value = false;
        }
      });
    };
    const rules = reactive({
      username: [{ validator: validatePhone, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
      confirmPassword: [
        { validator: validateconfirmPassword, trigger: "change" }
      ],
      verificationCode: [{ validator: validatecode, trigger: "change" }]
    });
    const handleFinish = async values => {
      const params={
        username:values.username,
        password:values.password,
        code:values.verificationCode
      }
      let res=await Login(params)
      if(!res.content.code){
        message.error("验证码错误");
       clearInterval(buttonInformation.timer);
          buttonInformation.name = "重新获取";
          buttonInformation.countdown = 60;
          buttonInformation.loading = false;
          buttonInformation.disable = false;
      }
      if(res.content.token){
        message.success('注册成功');
        push({
          name:'Login'
        })
      }
    };
    //倒计时
    const Countdown = () => {
      if (buttonInformation.timer) clearInterval(buttonInformation.timer);
      // buttonInformation.loading = true;
      buttonInformation.disable = true;
      buttonInformation.timer = setInterval(() => {
        let sec = buttonInformation.countdown--;
        buttonInformation.name = `${sec}秒`;
        if (sec === 0) {
          clearInterval(buttonInformation.timer);
          buttonInformation.name = "重新获取";
          buttonInformation.countdown = 60;
          buttonInformation.loading = false;
          buttonInformation.disable = false;
        }
      }, 1000);
    };
    //获取验证码
    const getCode = async() => {
      buttonInformation.name = "发送中";
      const params={
        username:formState.username,
        type:'Register',
      }
      let res=await Send(params)
      message.success(res.content);
      Countdown()
    };
    return {
      fromConfig,
      formState,
      handleFinish,
      rules,
      buttonInformation,
      getCode,
      usernameStatus
    };
  }
};
</script>
<style lang="scss">
#registered {
  width: 100%;
  /*height: 900px;*/
  height: 100%;
  background: #282828;

  .form-wrap {
    width: 285px;
    color: #fff;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*border: 1px solid red;*/

    label {
      display: block;
      color: #fff;
      font-size: 14px;
    }

    .ant-col {
      width: 100%;
    }

    .password {
      margin-top: -15px;
    }

    .yzm {
      margin-bottom: 25px;
      margin-top: 20px;
    }
    .ant-btn-primary {
      width: 100%;
    }
  }
}
</style>
