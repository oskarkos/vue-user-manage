<template>
  <div class="homeContainer">
    <div class="homeContainer__button">
      <Button
        class="homeContainer__button-addUser"
        button-type="primary"
        icon="fa-solid fa-plus"
        button-text="Add new user"
        @click="toggleModal(true)"
      ></Button>
    </div>
    <Table title-table="Users">
      <template #tableHeader>
        <TableRow :header-columns="tableColumns">
          <TableItem
            v-for="(item, index) in tableDataHeader"
            :key="index"
            :cols-to-take="item.colsToTake"
            ><span class="colorTitle">{{ item.title }}</span></TableItem
          >
        </TableRow>
      </template>
      <template #tableContent>
        <TableRow
          v-for="user in users"
          :header-columns="tableColumns"
          :key="user.id"
        >
          <TableItem :cols-to-take="1">
            {{ user.id }}
          </TableItem>
          <TableItem :cols-to-take="3">
            {{ user.name }}
          </TableItem>
          <TableItem :cols-to-take="4">
            {{ user.email }}
          </TableItem>
          <TableItem :cols-to-take="4">
            {{
              user.address.street +
              " " +
              user.address.city +
              " " +
              user.address.suite
            }}
          </TableItem>
          <TableItem :cols-to-take="3">
            {{ user.company.name }}
          </TableItem>
          <TableItem :cols-to-take="2" class="options">
            <router-link class="options__link" :to="`/user/${user.id}/todos`">
              <fa-icon icon="fa-solid fa-list-check" />
            </router-link>
          </TableItem>
        </TableRow>
      </template>
    </Table>
    <Modal :show="showModal" @closeModal="toggleModal(false)">
      <div class="modalContent">
        <h2>Add new user</h2>
        <h5>Please, provide all information</h5>
        <div class="modalContent__input">
          <p>Personal information</p>
          <div class="modalContent__input-container">
            <Input id="name" placeholder="Name" v-model="newUser.name"></Input>
            <Input
              id="name"
              placeholder="Email"
              v-model="newUser.email"
            ></Input>
          </div>
        </div>
        <Divider />
        <div class="modalContent__input">
          <p>Address information</p>
          <div class="modalContent__input-container">
            <Input
              id="name"
              placeholder="Street"
              v-model="newUser.address.street"
            ></Input>
            <Input
              id="name"
              placeholder="City"
              v-model="newUser.address.city"
            ></Input>
          </div>
          <div class="modalContent__input-container">
            <Input
              id="name"
              placeholder="Suite"
              v-model="newUser.address.suite"
            ></Input>
          </div>
        </div>
        <Divider />
        <div class="modalContent__input">
          <p>Company information</p>
          <div class="modalContent__input-container">
            <Input
              id="name"
              placeholder="Company name"
              v-model="newUser.company.name"
            ></Input>
          </div>
        </div>
        <div class="modalContent__button">
          <Button
            class="modalContent__button-confirm"
            button-type="primary"
            icon="fa-solid fa-check"
            button-text="Confirm"
            @click="addUser"
          ></Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { IUSer } from "../../api/types/User";
import Button from "../../components/Button/ButtonIndex.vue";
import Modal from "../../components/Modal/ModalIndex.vue";
import Input from "../../components/Input/InputIndex.vue";
import Divider from "../../components/Divider/DividerIndex.vue";
import Table from "../../components/Table/TableIndex.vue";
import TableRow from "../../components/Table/components/TableRow.vue";
import TableItem from "../../components/Table/components/TableItem.vue";
import { tableDataHeader, tableColumns } from "./data/tableData";

export default defineComponent({
  name: "HomeView",
  components: {
    Button,
    Modal,
    Input,
    Divider,
    Table,
    TableRow,
    TableItem,
  },
  setup() {
    const store = useStore();
    const users = ref<IUSer[]>([]);
    const showModal = ref(false);
    const newUser = ref({
      name: "",
      email: "",
      address: {
        street: "",
        city: "",
        suite: "",
      },
      company: {
        name: "",
      },
    });

    onMounted(() => {
      getUsers();
    });

    const getUsers = async () => {
      try {
        await store.dispatch("fetchUsers");
        users.value = store.getters.getAllUsers;
      } catch (error) {
        console.log(error);
      }
    };

    const toggleModal = (open: boolean) => {
      showModal.value = open;
    };

    const addUser = async () => {
      try {
        const userToAdd: IUSer = {
          id: users.value.length + 1,
          name: newUser.value.name,
          username: "username",
          email: newUser.value.email,
          address: {
            street: newUser.value.address.street,
            city: newUser.value.address.city,
            suite: newUser.value.address.suite,
            zipcode: "12345",
            geo: {
              lat: "123",
              lng: "123",
            },
          },
          company: {
            name: newUser.value.company.name,
            catchPhrase: "catchPhrase",
            bs: "bs",
          },
          phone: "123456789",
          website: "www.google.com",
        };
        await store.dispatch("addNewUser", userToAdd);
        users.value = store.getters.getAllUsers;
        newUser.value = {} as IUSer;
        toggleModal(false);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      showModal,
      users,
      toggleModal,
      newUser,
      addUser,
      tableDataHeader,
      tableColumns,
    };
  },
});
</script>

<style lang="scss">
.homeContainer {
  @include flexColumn;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  row-gap: 2rem;
  &__button {
    width: 12.2rem;
    &-addUser {
      justify-content: flex-start;
      padding: 0 1.5rem;
    }
  }
}
.modalContent {
  @include flexColumn;
  width: 100%;
  height: 100%;
  row-gap: 1rem;
  color: $blue-primary;
  & h5 {
    margin: 0 0 1rem 0;
  }
  & h2 {
    margin: 0;
  }
  &__input {
    @include flexColumn;
    align-items: flex-start;
    width: 100%;
    row-gap: 1rem;
    & p {
      margin: 0;
    }
    &-container {
      @include flexRow;
      column-gap: 1rem;
      width: 100%;
    }
  }
  &__button {
    margin-top: 1rem;
    width: 100%;
  }
}

.colorTitle {
  color: $text-disabled;
}

.options {
  font-size: 1.2rem !important;
  cursor: pointer;
  &__link {
    text-decoration: none;
    color: $blue-primary;
  }
}
</style>
