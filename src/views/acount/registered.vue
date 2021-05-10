<template>
  <div id="registered">
    <div class="form-wrap">
      <a-form name="custom-validation" ref="ruleForm" :model="formState" :rules="rules" @finish="handleFinish">
        <a-form-item name="username">
          <label for>用户名</label>
          <a-input type="text" autocomplete="off" v-model:value="formState.username"/>
        </a-form-item>
        <a-form-item class="password" name="password">
          <label for>密码</label>
          <a-input type="password" autocomplete="off" v-model:value="formState.password"/>
        </a-form-item>
           <a-form-item class="password" name="confirmPassword">
          <label for>确认密码</label>
          <a-input type="password" autocomplete="off" v-model:value="formState.verificationCode"/>
        </a-form-item>
             <a-form-item class="password" name="verificationCode">
          <label for>验证码</label>
           <a-row :gutter="8">
    <a-col :span="15"> <a-input type="password" autocomplete="off" v-model:value="formState.confirmPassword"/></a-col>
    <a-col :span="9"><a-button type="primary">获取验证码</a-button></a-col>
  </a-row>
         
        </a-form-item>
        <a-form-item class="yzm">
          <captcha/>
        </a-form-item>
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
import { reactive, onMounted,ref } from "vue";
import captcha from '@/components/captcha'
import {checkPhone} from '@/unitls/validation'
export default {
  name: "registered",
  components:{
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
      username: '',
      password: '',
      confirmPassword: '',
verificationCode:''
    });
    const validatePhone = async (rule, value) => {
      if (value === '') {
        return Promise.reject('请输入用户名');
      } else {
        if (!checkPhone(value)) {
          return Promise.reject('请输入正确的手机号码');
        }

        return Promise.resolve();
      }
    };
    const rules=reactive({
username:[
    { validator: validatePhone,
          trigger: 'change',}
]
    })
      const handleFinish = (values) => {
      console.log(values)
    };
    return {
      fromConfig,
      formState,
      handleFinish,
      rules
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
  }
}
</style>
