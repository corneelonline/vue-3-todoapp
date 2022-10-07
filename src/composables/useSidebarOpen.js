import { ref } from "vue";

const globalState = ref(true);

export const useSidebarOpen = () => {
  const localState = ref(true);

  const toggleSidebarOpen = () => {
    // Set the global state values
    globalState.value != globalState.value;

    // Set the local state values
    localState.value = !localState.value;
  };

  return {
    globalState,
    localState,
    toggleSidebarOpen,
  };
};
