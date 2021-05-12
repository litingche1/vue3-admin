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
        <a-form-item name="username">
          <label for>用户名</label>
          <a-input type="text" autocomplete="off" v-model:value="formState.username" />
        </a-form-item>
        <a-form-item class="password" name="password">
          <label for>密码</label>
          <a-input type="password" autocomplete="off" v-model:value="formState.password" />
        </a-form-item>
        <!-- <a-form-item class="password" name="confirmPassword">
          <label for>确认密码</label>
          <a-input type="password" autocomplete="off" v-model:value="formState.confirmPassword" />
        </a-form-item> -->
        <a-form-item class="password" name="verificationCode">
          <label for>验证码</label>
          <a-row :gutter="8">
            <a-col :span="15">
              <a-input
                type="password"
                autocomplete="off"
                v-model:value="formState.verificationCode"
              />
            </a-col>
            <a-col :span="9">
              <a-button
                type="primary"
                :disabled="buttonInformation.disabled"
                :loading="buttonInformation.loading"
                @click="getCode"
              >{{ buttonInformation.name }}</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item class="yzm">
          <captcha />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>提交</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/" class="color-white">登录</router-link> |
        <router-link to="/registered" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import captcha from "@/components/captcha";
import { checkPhone, checkPassword, checkCode } from "@/unitls/validation";
export default {
  name: "registered",
  components: {
    captcha
  },
  setup(props) {
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
    //自定义手机号校验
    const validatePhone = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入用户名");
      } else {
        if (!checkPhone(value)) {
          return Promise.reject("请输入正确的手机号码");
        }
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
          return Promise.reject("请输入6位的数字+字母的验证码");
        }
        return Promise.resolve();
      }
    };
    const rules = reactive({
      username: [{ validator: validatePhone, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
      confirmPassword: [
        { validator: validateconfirmPassword, trigger: "change" }
      ],
      verificationCode: [{ validator: validatecode, trigger: "change" }]
    });
    const handleFinish = values => {
      console.log(values);
    };
    //按钮信息
    const buttonInformation = reactive({
      name: "获取验证码",
      disable: false,
      loading: false,
      countdown: 60,
      timer: ""
    });

    //获取验证码
    const getCode = () => {
      if (!formState.username) {
        message.error("用户名不能为空");
        return false;
      }
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
    return {
      fromConfig,
      formState,
      handleFinish,
      rules,
      buttonInformation,
      getCode
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
