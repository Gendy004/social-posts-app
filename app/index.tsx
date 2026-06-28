import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import PostCard from "../src/components/PostCard";
import { getComments, getPostById, getUserById } from "../src/services/api";
import { PostWithUser } from "../src/types";

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

 async function loadPosts() {
  try {
    setError("");

    const commentsData = await getComments();

    const postIds = Array.from(
      new Set(commentsData.map((comment) => comment.post_id))
    ).slice(0, 10);

    const postsData = await Promise.all(
      postIds.map((postId) => getPostById(postId.toString()))
    );

    const postsWithUsers = await Promise.all(
      postsData.map(async (post) => {
        try {
          const user = await getUserById(post.user_id);
          return { ...post, user };
        } catch {
          return post;
        }
      })
    );

    setPosts(postsWithUsers);
  } catch {
    setError("Could not load posts. Please try again.");
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}

  useEffect(() => {
    loadPosts();
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    loadPosts();
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.retry} onPress={loadPosts}>
          Try again
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>Latest Posts</Text>
            <Text style={styles.subheading}>
              Tap any post to read details and comments.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() =>
              router.push({
                pathname: "/post/[id]",
                params: { id: item.id.toString() },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5FA",
  },
  list: {
    padding: 18,
  },
  header: {
    marginBottom: 18,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },
  subheading: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },
  center: {
    flex: 1,
    backgroundColor: "#F4F5FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  error: {
    fontSize: 16,
    color: "#D33",
    textAlign: "center",
    marginBottom: 12,
  },
  retry: {
    fontSize: 16,
    color: "#6C63FF",
    fontWeight: "700",
  },
});