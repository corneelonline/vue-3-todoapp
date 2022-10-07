import { ref } from "vue";

export function useSidebarOpen() {
  const isSidebarOpen = ref(true);

  const toggleSidebarOpen = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  return {
    isSidebarOpen,
    toggleSidebarOpen,
  };
}
