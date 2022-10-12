import { ref } from "vue";

const globalState = ref(true);

export const useSidebarOpen = () => {
  const toggleSidebarOpen = () => {
    // Set the global state values
    globalState.value != globalState.value;
  };

  return {
    globalState,
    toggleSidebarOpen,
  };
};
