import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const features = [
    {
      title: 'Resource Library',
      description: 'Access textbooks, videos, and interactive content',
      icon: '📚',
      route: 'resources',
      color: '#3B82F6',
    },
    {
      title: 'Online Tutoring',
      description: 'Connect with expert tutors for personalized help',
      icon: '👨‍🏫',
      route: 'tutoring',
      color: '#10B981',
    },
    {
      title: 'Community',
      description: 'Join discussions and connect with peers',
      icon: '💬',
      route: 'community',
      color: '#F59E0B',
    },
    {
      title: 'Exam Preparation',
      description: 'Practice tests and study guides',
      icon: '📝',
      route: 'exam-prep',
      color: '#EF4444',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.name || 'Student'}! 👋
            </Text>
            <Text style={styles.subtitle}>
              Ready to learn something new today?
            </Text>
          </View>
          <View style={styles.userBadge}>
            <Text style={styles.userInitial}>
              {user?.name?.[0]?.toUpperCase() || 'S'}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>94%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity style={styles.continueCard}>
            <View style={styles.continueInfo}>
              <Text style={styles.continueSubject}>Mathematics</Text>
              <Text style={styles.continueLesson}>Algebra - Chapter 5</Text>
              <Text style={styles.continueProgress}>Progress: 65%</Text>
            </View>
            <View style={styles.continueIcon}>
              <Text style={styles.continueEmoji}>📐</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.featureCard, { borderLeftColor: feature.color }]}
                onPress={() => router.push(`/(tabs)/${feature.route}` as any)}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>✅</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Completed Science Quiz</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>📖</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Read English Literature Chapter</Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🎯</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Joined Math Tutoring Session</Text>
                <Text style={styles.activityTime}>2 days ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  userBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5D5CDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D5CDE',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  continueCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
  },
  continueInfo: {
    flex: 1,
  },
  continueSubject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  continueLesson: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  continueProgress: {
    fontSize: 12,
    color: '#5D5CDE',
    marginTop: 8,
  },
  continueIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  continueEmoji: {
    fontSize: 32,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  activityTime: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});