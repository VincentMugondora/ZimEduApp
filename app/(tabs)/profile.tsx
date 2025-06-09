import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    offlineDownloads: true,
    studyReminders: true,
    communityUpdates: false,
  });

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: 2,
      title: 'Study Streak',
      description: 'Study for 7 days in a row',
      icon: '🔥',
      unlocked: true,
    },
    {
      id: 3,
      title: 'Quiz Master',
      description: 'Complete 10 quizzes with 90%+ score',
      icon: '🏆',
      unlocked: false,
      progress: 7,
      total: 10,
    },
    {
      id: 4,
      title: 'Helper',
      description: 'Answer 5 community questions',
      icon: '🤝',
      unlocked: false,
      progress: 2,
      total: 5,
    },
    {
      id: 5,
      title: 'Knowledge Seeker',
      description: 'Complete 50 lessons',
      icon: '📚',
      unlocked: false,
      progress: 23,
      total: 50,
    },
    {
      id: 6,
      title: 'Social Learner',
      description: 'Join 3 study groups',
      icon: '👥',
      unlocked: true,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Completed Mathematics Quiz',
      score: '95%',
      time: '2 hours ago',
      icon: '✅',
    },
    {
      id: 2,
      action: 'Downloaded Physics Textbook',
      time: 'Yesterday',
      icon: '⬇️',
    },
    {
      id: 3,
      action: 'Joined Community Discussion',
      topic: 'Study Tips for O-Level',
      time: '2 days ago',
      icon: '💬',
    },
    {
      id: 4,
      action: 'Attended Tutoring Session',
      subject: 'Chemistry',
      time: '3 days ago',
      icon: '👨‍🏫',
    },
  ];

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => signOut()
        },
      ]
    );
  };

  const handleSaveProfile = () => {
    // Here you would normally save to your backend
    Alert.alert('Success', 'Profile updated successfully!');
    setShowEditModal(false);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const progressStats = {
    coursesCompleted: 8,
    totalCourses: 12,
    studyStreak: 5,
    totalStudyHours: 47,
    averageScore: 87,
    rank: 'Advanced Learner',
  };

  const completionPercentage = Math.round((progressStats.coursesCompleted / progressStats.totalCourses) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.[0]?.toUpperCase() || 'S'}
              </Text>
            </View>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{progressStats.rank}</Text>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name || 'Student'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userRole}>
              {user?.role === 'student' ? '🎓 Student' : 
               user?.role === 'parent' ? '👨‍👩‍👧‍👦 Parent' : '👨‍🏫 Teacher'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
              <Text style={styles.progressLabel}>Complete</Text>
            </View>
            <View style={styles.progressStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Courses Completed</Text>
                <Text style={styles.statValue}>
                  {progressStats.coursesCompleted}/{progressStats.totalCourses}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Study Streak</Text>
                <Text style={styles.statValue}>{progressStats.studyStreak} days 🔥</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Study Hours</Text>
                <Text style={styles.statValue}>{progressStats.totalStudyHours}h</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Average Score</Text>
                <Text style={styles.statValue}>{progressStats.averageScore}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <Text style={[
                  styles.achievementIcon,
                  !achievement.unlocked && styles.achievementIconLocked
                ]}>
                  {achievement.icon}
                </Text>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.achievementTextLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.achievementTextLocked
                ]}>
                  {achievement.description}
                </Text>
                {!achievement.unlocked && achievement.progress && (
                  <View style={styles.achievementProgress}>
                    <Text style={styles.achievementProgressText}>
                      {achievement.progress}/{achievement.total}
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressBarFill,
                          { width: `${(achievement.progress / achievement.total!) * 100}%` }
                        ]} 
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Text style={styles.activityIcon}>{activity.icon}</Text>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  {activity.score && (
                    <Text style={styles.activityDetail}>Score: {activity.score}</Text>
                  )}
                  {activity.topic && (
                    <Text style={styles.activityDetail}>Topic: {activity.topic}</Text>
                  )}
                  {activity.subject && (
                    <Text style={styles.activityDetail}>Subject: {activity.subject}</Text>
                  )}
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuList}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => setShowSettingsModal(true)}
            >
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuText}>Settings</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>📚</Text>
              <Text style={styles.menuText}>My Downloads</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>💳</Text>
              <Text style={styles.menuText}>Subscription</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>🎯</Text>
              <Text style={styles.menuText}>Study Goals</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>📊</Text>
              <Text style={styles.menuText}>Progress Report</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuText}>Help & Support</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>📄</Text>
              <Text style={styles.menuText}>Privacy Policy</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, styles.signOutItem]}
              onPress={handleSignOut}
            >
              <Text style={styles.menuIcon}>🚪</Text>
              <Text style={[styles.menuText, styles.signOutText]}>Sign Out</Text>
              <Text style={[styles.menuArrow, styles.signOutText]}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveProfile}>
              <Text style={styles.modalSave}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <View style={styles.editAvatarSection}>
              <View style={styles.editAvatar}>
                <Text style={styles.editAvatarText}>
                  {editedName?.[0]?.toUpperCase() || 'S'}
                </Text>
              </View>
              <TouchableOpacity style={styles.changePhotoButton}>
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Enter your full name"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={user?.email}
                editable={false}
              />
              <Text style={styles.inputHint}>Email cannot be changed</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Role</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={user?.role}
                editable={false}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettingsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
              <Text style={styles.modalCancel}>Done</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Settings</Text>
            <View style={{ width: 50 }} />
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.settingsSection}>
              <Text style={styles.settingsSectionTitle}>Notifications</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Receive app notifications</Text>
                </View>
                <Switch
                  value={settings.notifications}
                  onValueChange={(value) => handleSettingChange('notifications', value)}
                  trackColor={{ false: '#e2e8f0', true: '#5D5CDE' }}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Study Reminders</Text>
                  <Text style={styles.settingDescription}>Daily study reminders</Text>
                </View>
                <Switch
                  value={settings.studyReminders}
                  onValueChange={(value) => handleSettingChange('studyReminders', value)}
                  trackColor={{ false: '#e2e8f0', true: '#5D5CDE' }}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Community Updates</Text>
                  <Text style={styles.settingDescription}>New discussions and replies</Text>
                </View>
                <Switch
                  value={settings.communityUpdates}
                  onValueChange={(value) => handleSettingChange('communityUpdates', value)}
                  trackColor={{ false: '#e2e8f0', true: '#5D5CDE' }}
                />
              </View>
            </View>
            
            <View style={styles.settingsSection}>
              <Text style={styles.settingsSectionTitle}>App Preferences</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>Use dark theme</Text>
                </View>
                <Switch
                  value={settings.darkMode}
                  onValueChange={(value) => handleSettingChange('darkMode', value)}
                  trackColor={{ false: '#e2e8f0', true: '#5D5CDE' }}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Offline Downloads</Text>
                  <Text style={styles.settingDescription}>Allow downloading for offline use</Text>
                </View>
                <Switch
                  value={settings.offlineDownloads}
                  onValueChange={(value) => handleSettingChange('offlineDownloads', value)}
                  trackColor={{ false: '#e2e8f0', true: '#5D5CDE' }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5D5CDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  rankBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#10B981',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  rankText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#5D5CDE',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#5D5CDE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  progressContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5D5CDE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  progressPercentage: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  progressStats: {
    flex: 1,
    justifyContent: 'space-around',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementLocked: {
    backgroundColor: '#f8fafc',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementTextLocked: {
    color: '#94a3b8',
  },
  achievementProgress: {
    width: '100%',
    marginTop: 8,
  },
  achievementProgressText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5D5CDE',
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
    width: 30,
    textAlign: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  activityDetail: {
    fontSize: 14,
    color: '#5D5CDE',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  signOutItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 30,
    textAlign: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  menuArrow: {
    fontSize: 16,
    color: '#64748b',
  },
  signOutText: {
    color: '#EF4444',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalCancel: {
    fontSize: 16,
    color: '#64748b',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalSave: {
    fontSize: 16,
    color: '#5D5CDE',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  editAvatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  editAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5D5CDE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    color: '#5D5CDE',
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f8fafc',
    color: '#64748b',
  },
  inputHint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});