<template>
  <div class="tableContainer">
    <p>Users</p>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            {{ user.address.street + user.address.suite + user.address.city }}
          </td>
          <td>{{ user.company.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { apiClients } from "../../api";
import { IUSer } from "../../api/types/User";

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const { userClient } = apiClients;
    const users = ref<IUSer[]>([]);

    onMounted(() => {
      getUsers();
    });

    const getUsers = async () => {
      try {
        const { data } = await userClient().getUsers();
        users.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      users,
    };
  },
});
</script>

<style lang="scss">
.tableContainer {
  @include flexColumn;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem 1.5rem;
  width: 100%;
  height: 100%;
  background-color: white;
  margin-top: 3rem;
  overflow: scroll;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
}
</style>
