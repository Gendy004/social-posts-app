import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Social Posts",
        }}
      />
      <Stack.Screen
        name="post/[id]"
        options={{
          title: "Post Details",
        }}
      />
    </Stack>
  );
}