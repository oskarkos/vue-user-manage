<template>
  <div class="login">
    <img
      class="login__background"
      :src="getImageUrl('wavebackground.svg')"
      alt=""
      srcset=""
    />
    <div class="login__card">
      <div class="login__card-header">
        <h3>WELCOME BACK</h3>
        <p>Please, login to the platform to manage the users</p>
      </div>
      <h1>LOGIN</h1>
      <div class="login__input">
        <label for="user">User</label>
        <div
          class="login__input-container"
          :class="
            hasError
              ? 'login__input-containerError'
              : 'login__input-containerNormal'
          "
        >
          <input type="text" name="user" v-model="user" />
        </div>
      </div>
      <div class="login__input">
        <label for="pass">Password</label>
        <div
          class="login__input-container"
          :class="
            hasError
              ? 'login__input-containerError'
              : 'login__input-containerNormal'
          "
        >
          <input type="password" name="pass" v-model="pass" />
        </div>
      </div>
      <div class="login__button">
        <Button
          button-type="primary"
          icon="fa-solid fa-right-to-bracket"
          button-text="Login"
          @click-button="login"
        ></Button>
      </div>
      <p class="login__errorMessage" v-if="emptyData">Fields Required</p>
      <p class="login__errorMessage" v-if="incorrectData">
        User or Password incorrect
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button/ButtonIndex.vue";

export default defineComponent({
  name: "LoginView",
  components: { Button },
  setup() {
    const router = useRouter();
    const user = ref("");
    const pass = ref("");
    const incorrectData = ref(false);
    const emptyData = ref(false);
    const getImageUrl = (name: string) => {
      return new URL(`../../assets/${name}`, import.meta.url).href;
    };
    const hasError = computed(() => emptyData.value || incorrectData.value);

    const existLoginData = () => {
      if (user.value && pass.value) {
        emptyData.value = false;
        return true;
      } else {
        incorrectData.value = false;
        emptyData.value = true;
        return false;
      }
    };

    const login = () => {
      if (!existLoginData()) return;
      if (user.value === "Aplyca" && pass.value === "Aplyca") {
        incorrectData.value = false;
        localStorage.setItem("user", user.value);
        router.push("/");
      } else {
        incorrectData.value = true;
      }
    };

    return {
      user,
      pass,
      login,
      incorrectData,
      emptyData,
      hasError,
      getImageUrl,
    };
  },
});
</script>

<style lang="scss">
.login {
  @include flexRow;
  width: 100%;
  height: 100vh;
  position: relative;
  background: $background-primary;
  &__background {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
  }
  &__card {
    @include flexColumn;
    padding-bottom: 3rem;
    width: 40%;
    height: auto;
    border-radius: 1rem;
    position: relative;
    z-index: 1;
    margin-bottom: 3rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    & h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: $blue-secondary;
    }
    &-header {
      @include flexColumn;
      margin-bottom: 1rem;
      background-color: $blue-primary;
      color: white;
      width: 100%;
      padding: 2rem;
      border-radius: 1rem 1rem 4rem 4rem;
      & h3 {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0;
      }
    }
  }
  &__button {
    margin: 2rem 0;
    width: 70%;
  }
  &__errorMessage {
    text-align: start;
    width: 70%;
    color: $error-primary;
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 1rem;
  }
  &__input {
    width: 70%;
    @include flexColumn;
    align-items: flex-start;
    label {
      color: $blue-secondary;
      font-size: 1rem;
      letter-spacing: 2px;
      font-weight: bold;
    }
    &-containerError {
      border: 2px solid $error-primary;
    }
    &-containerNormal {
      border: 2px solid $blue-secondary;
    }
    &-container {
      @include flexRow;
      width: 100%;
      height: 2.4rem;
      background: none;
      border-radius: 0.8rem;
      margin-bottom: 1rem;
      padding: 0.3rem 0.5rem 0.3rem 0.5rem;
      input {
        color: $blue-secondary;
        width: 100%;
        outline: none;
        background: none;
        border: 0;
        font-size: medium;
      }
    }
  }
}
@media screen and (max-width: 1045px) {
  .login {
    &__card {
      width: 60%;
    }
    &__input {
      width: 60%;
    }
    &__button {
      width: 60%;
    }
  }
}

@media screen and (max-width: 648px) {
  .login {
    &__card {
      width: 100%;
      margin: 2rem;
    }
    &__input {
      width: 80%;
    }
    &__button {
      width: 80%;
    }
  }
}
</style>
