<template>
  <div id="login">
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
            v-model:value="formState.username"
            placeholder="请输入用户名"
            @change="() => {$refs.username.onFieldChange()}"
          />
        </a-form-item>
        <a-form-item class="password" name="password" ref="pass">
          <label for>密码</label>
          <a-input-password   autocomplete="off" v-model:value="formState.password" placeholder="请输入密码" @change="() => {$refs.pass.onFieldChange()}"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
         <router-link to="/forgot" class="color-white">忘记密码</router-link> |
        <router-link to="/registered" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import captcha from "@/components/captcha";
import { checkPhone, checkPassword} from "@/unitls/validation";
import { Login } from "@/api/user/index";
import { useRouter } from "vue-router";
import{setToken,setUsername} from '@/unitls/cookies'
import md5 from 'js-md5'
export default {
  name: "login",
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
      }  else {
        if (!checkPassword(value)) {
          return Promise.reject("请输入6-20位的数字+字母的密码");
        }
        return Promise.resolve();
      }
    };
    const rules = reactive({
      username: [{ validator: validatePhone, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
    });
    //登录
    const handleFinish = async values => {
      const params={
        username:values.username,
        password:values.password,
      }
      let res=await Login(params)
      if(res.content.token){
        setUsername({value:res.content.username})
        setToken({token:res.content.token})
        message.success('登录成功');
        push({
          name:'Login'
        })
      }
    };
    return {
      fromConfig,
      formState,
      handleFinish,
      rules,
    };
  }
};
</script>
<style lang="scss">
#login {
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
